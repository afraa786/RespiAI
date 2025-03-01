from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, BackgroundTasks
from pydantic import BaseModel
import os
import uuid
import shutil
from typing import Optional, List, Dict, Any
from pdfBot.src.retrieve_qa import multiqueryRag
from pdfBot.streamlit_app.utils import perform, load_base_embeddings, load_llm
from pdfBot.src.vectordb import build_vectordb, load_vectordb, delete_vectordb
from pdfBot.config.core import config
import sys
from pathlib import Path
import sys
import logging
from datetime import datetime
sys.path.append('/home/fareed-sayed/Documents/rag_system')


# Add the parent directory to Python path
# sys.path.append(str(Path(__file__).resolve().parent))


app = FastAPI()

LLM = load_llm()
BASE_EMBEDDINGS = load_base_embeddings()
VECTORDB_PATH = config.VECTORDB.PATH
PDF_PATH = "research_data.pdf"  # Hardcoded path to your PDF document

# Initialize chat history and display history
chat_history = {}
display_history = {}

# Pydantic model to define the expected request body
class QuestionRequest(BaseModel):
    question: str

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

logger = logging.getLogger(__name__)
UPLOAD_DIR = "uploaded_pdfs"  # Directory to store uploaded PDFs
DEFAULT_SESSION_ID = "default"

# Background task for cleaning up old sessions
def cleanup_old_sessions(max_age_hours: int = 24):
    """Remove sessions older than the specified hours"""
    current_time = datetime.now()
    sessions_to_remove = []
    
    for session_id, session_data in user_sessions.items():
        if session_id == DEFAULT_SESSION_ID:
            continue
            
        session_time = session_data.get("created_at")
        if session_time and (current_time - session_time).total_seconds() > max_age_hours * 3600:
            sessions_to_remove.append(session_id)
    
    for session_id in sessions_to_remove:
        try:
            # Clean up session resources``  
            session_dir = os.path.join(UPLOAD_DIR, session_id)
            if os.path.exists(session_dir):
                shutil.rmtree(session_dir)
            
            # Remove session data
            del user_sessions[session_id]
            if session_id in chat_history:
                del chat_history[session_id]
            if session_id in display_history:
                del display_history[session_id]
                
            logger.info(f"Cleaned up old session: {session_id}")
        except Exception as e:
            logger.error(f"Error cleaning up session {session_id}: {str(e)}")


@app.on_event("startup")
async def startup():
    # Build the VectorDB from the hardcoded PDF
    if os.path.exists(VECTORDB_PATH):
        delete_vectordb(VECTORDB_PATH)
        
    with open(PDF_PATH, "rb") as pdf_file:
        perform(build_vectordb, pdf_file.read(), embedding_function=BASE_EMBEDDINGS)

    # Load the VectorDB
    vectordb = load_vectordb(BASE_EMBEDDINGS, VECTORDB_PATH)
    rag_chain = multiqueryRag(vectordb, LLM)

    # Store the rag_chain in the app's state
    app.state.rag_chain = rag_chain

user_sessions: Dict[str, Dict[str, Any]] = {}

class SessionResponse(BaseModel):
    session_id: str
    message: str
    timestamp: str

@app.post("/upload-pdf/", response_model=SessionResponse)
async def upload_pdf(
    background_tasks: BackgroundTasks,
    pdf_file: UploadFile = File(...),
    session_name: str = Form(None)
):
    """Endpoint to upload a PDF file, process it for disease prediction, and create a new session"""
    try:
        if not pdf_file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Generate a unique session ID
        session_id = str(uuid.uuid4())
        
        # Create a session-specific directory
        session_dir = os.path.join(UPLOAD_DIR, session_id)
        os.makedirs(session_dir, exist_ok=True)
        
        # Create a session-specific vectordb path
        session_vectordb_path = os.path.join(session_dir, "vectordb")
        
        # Save the uploaded PDF
        pdf_path = os.path.join(session_dir, pdf_file.filename)
        with open(pdf_path, "wb") as f:
            shutil.copyfileobj(pdf_file.file, f)
        
        logger.info(f"PDF uploaded: {pdf_file.filename}, session: {session_id}")
        
        # Store original vectordb path
        original_vectordb_path = config.VECTORDB.PATH
        
        try:
            # Temporarily modify the vectordb path in config
            config.VECTORDB.PATH = session_vectordb_path
            
            # Build VectorDB from the uploaded PDF
            with open(pdf_path, "rb") as f:
                pdf_content = f.read()
                perform(build_vectordb, pdf_content, embedding_function=BASE_EMBEDDINGS)
        finally:
            # Restore original vectordb path
            config.VECTORDB.PATH = original_vectordb_path
        
        # Load the VectorDB
        vectordb = load_vectordb(BASE_EMBEDDINGS, session_vectordb_path)
        rag_chain = multiqueryRag(vectordb, LLM)
        
        # Use provided session name or default to filename
        display_name = session_name if session_name else pdf_file.filename
        
        # Store the session information
        user_sessions[session_id] = {
            "pdf_path": pdf_path,
            "pdf_name": pdf_file.filename,
            "display_name": display_name,
            "vectordb_path": session_vectordb_path,
            "rag_chain": rag_chain,
            "created_at": datetime.now()
        }
        
        # Initialize chat history for this session
        chat_history[session_id] = []
        display_history[session_id] = [("", f"Hello! I've processed your PDF '{display_name}'. What would you like to know or predict?")]
        
        # Perform disease prediction immediately after PDF processing
        prediction_response = await perform_disease_prediction(rag_chain, "disease prediction", session_id)
        
        # Schedule cleanup of old sessions
        background_tasks.add_task(cleanup_old_sessions)
        
        return {
            "session_id": session_id, 
            "message": f"{prediction_response['message']}",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error uploading PDF: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

async def perform_disease_prediction(rag_chain, prediction_type: str, session_id: str):
    """Perform disease prediction based on the uploaded PDF content"""
    try:
        # Create the disease prediction query based on the content of the uploaded PDF
        question = "from document let me know about below their normal range and if mine is not normal in this format <parameter1> my RCB Count - normal value higher/lower </parameter1>. Use thisRBC Count, WBC Count, Hemoglobin, Lymphocytes, Eosinophils, Monocytes, Basophils, Platelet Count, MPV. We know you cannt be the right person to predict disease but please predict disease based on report."
        # Query the RAG chain for disease prediction
        response = rag_chain.invoke({
            "question": question,
            "chat_history": chat_history[session_id],
        })
        
        # Optionally: Process the response to match disease prediction
        # Here, you'd apply your specific logic to parse the response
        # For now, let's assume the response contains a disease prediction
        prediction_message = response if "disease" in response.lower() else "No disease detected in the document."
        
        # Update chat and display history
        chat_history[session_id].append((question, prediction_message))
        display_history[session_id].append((question, prediction_message))
        
        return {"message": prediction_message}
    
    except Exception as e:
        logger.error(f"Error during disease prediction: {str(e)}")
        return {"message": f"Error performing disease prediction: {str(e)}"}


@app.post("/ask/")
async def ask_question(request: QuestionRequest):
    """Endpoint to ask a question and get an answer from the RAG system"""
    if not hasattr(app.state, "rag_chain"):
        raise HTTPException(status_code=500, detail="RAG system not initialized")

    rag_chain = app.state.rag_chain

    # Initialize session data for the user (for simplicity, here using a static key for example)
    user_id = "user_123"  # You can use something dynamic like user session IDs
    if user_id not in chat_history:
        chat_history[user_id] = []
        display_history[user_id] = [("", "Hello! How can I help you?")]

    # Process the question through the RAG system
    try:
        response = rag_chain.invoke({
            "question": request.question,
            "chat_history": chat_history[user_id],
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Update chat history
    chat_history[user_id].append((request.question, response))
    display_history[user_id].append((request.question, response))

    return {"question": request.question, "answer": response}
