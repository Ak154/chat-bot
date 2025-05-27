require('dotenv').config();
const express = require('express');
require('./config/db');
const cors = require('cors');

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json())

// Define Routes
app.use('/api/chatbot', require('./routes/chatbot'));

// Knowledge Base Admin Routes
app.use('/api/knowledge', require('./routes/knowledge'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));