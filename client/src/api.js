// src/api.js

const API_URL = 'http://localhost:8000/ask/'; 

export const getBotResponse = async (userQuestion) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userQuestion }),
    });

    // Check if response is OK
    if (response.ok) {
      const data = await response.json();
      return data;  // Return data from the server
    } else {
      throw new Error('Failed to fetch response');
    }
  } catch (error) {
    // Log the error to the console and propagate it
    console.error('Error fetching bot response:', error);
    throw new Error('There was an error with the API request');
  }
};
