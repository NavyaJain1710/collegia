const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./studentController/studentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/collegia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/students', studentRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
