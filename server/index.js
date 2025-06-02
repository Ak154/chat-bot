require('dotenv').config();
const express = require('express');
require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

app.use('/api/chatbot', require('./routes/chatbot'));

app.use('/api/knowledge', require('./routes/knowledge'));

app.use("/api/users", require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));