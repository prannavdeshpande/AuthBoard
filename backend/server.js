require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));