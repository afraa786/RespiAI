import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { uploadPdf,getBotResponse } from '../api';  // Function to handle file upload to backend
import { FiPaperclip } from 'react-icons/fi'; // File icon
import { BsFilePdf } from 'react-icons/bs'; // PDF file icon

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content:
        "Hello! I'm your Respiratory Health Assistant. I can help you understand various respiratory conditions and how to manage them in high pollution environments. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [file, setFile] = useState(null); // Track the uploaded file
  const [sessionId, setSessionId] = useState(null); // Store session_id for reference

  // Handle file change event
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return; // Ensure either text or file is provided
  
    // Add user message
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: input || 'PDF file uploaded.' }, // If a file is uploaded, mention that
    ]);
  
    setIsLoading(true); // Start loading
  
    try {
      let data;
  
      if (file) {
        // If a file is uploaded, send it
        data = await uploadPdf(file);
        setMessages((prev) => [
          ...prev,
          { type: 'bot', content: data.message || 'PDF uploaded successfully.' }, // PDF confirmation
        ]);
      } else {
        // Otherwise, send the text input to get a bot response
        data = await getBotResponse(input);
  
        // Check if data has an answer field
        const answer = data.answer || "I didn’t understand that. Can you clarify?"; // Default message if no answer
  
        setMessages((prev) => [
          ...prev,
          { type: 'bot', content: answer }, // Display the actual answer from the API
        ]);
      }
  
      // Update the session ID if available
      if (data.session_id) {
        setSessionId(data.session_id);
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Sorry, there was an error connecting to the server.' },
      ]);
    }
  
    setIsLoading(false); // Stop loading
    setInput('');
    setFile(null); // Reset the file after submission
  };
  
  


  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-purple-600 p-4 text-white">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-2xl" />
              <h2 className="text-xl font-semibold">Respiratory Health AI Assistant</h2>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                  >
                    {message.type === 'user' ? (
                      <FaUser className="text-white text-sm" />
                    ) : (
                      <FaRobot className="text-gray-600 text-sm" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {message.content}
                    {/* Display PDF icon if file is a PDF */}
                    {file && file.type === 'application/pdf' || message.content.includes('File uploaded:') && (
                      <div className="flex items-center space-x-2 mt-2">
                        <BsFilePdf className="text-red-600 w-6 h-6" />
                        <span className="text-sm">PDF File</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex items-center space-x-2"> {/* This will keep everything in one line */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question about respiratory health..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-500"
                disabled={isLoading} // Disable input while loading
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? 'Sending...' : <FaPaperPlane />}
              </button>
              {/* Custom file input button */}
              <div
                className="flex items-center justify-center w-10 h-8 bg-purple-600 rounded-lg cursor-pointer"
                onClick={() => document.getElementById('file-input').click()} // Trigger the hidden file input
              >
                <FiPaperclip className="w-6 h-6 text-white" />
              </div>
              {/* Hidden file input */}
              <input
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden" // Hide the actual file input
                disabled={isLoading} // Disable file input while loading
              />
            </div>
            {/* Display the selected file name */}
            {file && (
              <div className="mt-2 text-sm text-gray-600">
                Selected file: <span className="font-semibold">{file.name}</span>
              </div>
            )}
          </form>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>This AI assistant is for informational purposes only.</p>
          <p>For medical emergencies, please contact your healthcare provider immediately.</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
