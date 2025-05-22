const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', todoRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Todo Summary Assistant API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});