const express = require('express');
const cors = require('cors');  // Import the cors package

const app = express();

// Enable CORS for all routes (you can customize the configuration if needed)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from your frontend (React app)
  methods: ['GET', 'POST'],  // You can specify allowed methods
  allowedHeaders: ['Content-Type'],  // You can specify allowed headers
}));

// Middleware to parse JSON requests
app.use(express.json());

// Example route for handling bot responses
app.post('/ask', (req, res) => {
  const userQuestion = req.body.question;  // Access the user's question

  // Example bot logic (you can replace this with your real bot logic)
  const botAnswer = `You asked about: "${userQuestion}". Here is the answer!`;

  // Send back a response
  res.json({ question: userQuestion, answer: botAnswer });
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
