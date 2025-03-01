// src/api.js

const API_URL = 'http://localhost:8000/ask/';
const PDF_UPLOAD_URL = 'http://localhost:8000/upload-pdf/';

export const getBotResponse = async (userQuestion) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: userQuestion }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch response');
        }
    } catch (error) {
        console.error('Error fetching bot response:', error);
        throw error;
    }
};

export const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append('pdf_file', file);
    formData.append('session_name', 'session_name_value'); // Optional: Add the session_name or other parameters if needed

    const response = await fetch('http://localhost:8000/upload-pdf', {
        method: 'POST',
        body: formData, // Send the form data with the file
    });

    if (response.ok) {
        return response.json(); // Return the JSON response
    } else {
        throw new Error('Failed to upload PDF');
    }
};

// Function to get the survey questions by questionId using fetch
export const getSurveyQuestions = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:8080/question/${1}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();  // Parse JSON from the response
      return data;  // Return the data from the response
    } catch (error) {
      console.error('Error fetching survey questions:', error);
      throw error;  // Throw error to be caught in the component
    }
  };
  
