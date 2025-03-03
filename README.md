# RespirAI 
## AI-Driven Respiratory Disease Detection & Insight Provider

# Overview
###### RespirAI is an intelligent system designed to:
1. **Disease Detection** – Identify respiratory conditions through a simple survey, supported by authentic medical data.
2. **In-Depth Information** – Access detailed insights on diseases like Asthma, Tuberculosis, Pneumonia, Whooping Cough, Pulmonary Hypertension, Rhinitis, and GBS (Guillain-Barré Syndrome).
3. **AI-Powered Assistance** – Get real-time answers to your queries about symptoms, causes, and treatments.
4. **Breath Test & Health Survey** – Measure your respiratory health with a breath test timer and personalized surveys for tailored insights.
 
 # Technologies used
 - **tailwind css, React.js** (Frontend)  
- **java, SpringBoot** (Backend)  
- **NeonDB** (For Database )  
- **Docker** (Containerization)  
- **EMBEDDING_MODEL: sentence-transformers/all-mpnet-base-v2**
-  **model_name: mixtral-8x7b-32768** (For AI-powered insights)

  #  **Setup & Installation** 
#### 1. **Frontend (Client) Setup**

1. Navigate to the `Client` directory:
   ```bash
   cd Client
   ```

2. Install the necessary Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```

#### 2. **Model (ML) Setup with Docker**

1. Navigate to the `Models` directory:
   ```bash
   cd Models
   ```

2. Build the Docker image for the model:
   ```bash
   docker build -t conversational-pdf-rag .
   ```

3. Run the Docker container and expose the necessary ports:
   ```bash
   docker run -p 8000:8000 -p 8501:8501 conversational-pdf-rag
   ```
#### 3. Server (Spring Boot) Setup
1. Navigate to the Spring Boot project directory:

```bash
cd Backend
```

2. Build the project using Maven:

```bash
mvn clean install
```

3. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

4. Verify the server is running:
Open your browser or use a tool like Postman and visit:
```bash
GET http://localhost:8080/api/hello
```

5. Configure the database (DATABASE USED IN THIS PROJECT IS NEON):
Update the application.properties or application.yml file with your database credentials:
properties
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/your-database
spring.datasource.username=root
spring.datasource.password=your-password
```

6. (Optional) Change the server port:
If you want to run the server on a different port, update the application.properties file:
properties
```bash
server.port=9090
```

---

##  **Respiratory Diseases Covered**  
🔹 **Tuberculosis (TB)** – Causes, symptoms, and treatment  
🔹 **Pneumonia** – Causes, risk factors, and prevention  
🔹 **Asthma** – Common triggers & management  
🔹 **Pulmonary Hypertension** – Symptoms & complications  
🔹 **Whooping Cough (Pertussis)** – How it spreads & prevention  
🔹 **Gulliean Barre Syndrome** – Respiratory impact & care 

##  **Future Enhancements**  
1. **Machine learning-powered disease prediction**  
2. **Connecting patients with the necessary medical professionals according to the survey data**  
3. **GPS-enabled search for nearby hospitals and clinics based on patient needs.**
