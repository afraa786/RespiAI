const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Define where to store the files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create unique file name
    },
});

const upload = multer({ storage: storage });

// Route to handle PDF file upload
app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    // Here you can process the PDF (e.g., extract information, analyze, etc.)
    res.json({ message: 'PDF uploaded successfully!' });
});

// Example of a chatbot question route
app.post('/ask', (req, res) => {
    res.json({ answer: "Here's the response from the bot." });
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
