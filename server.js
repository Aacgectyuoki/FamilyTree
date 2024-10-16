const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const familyRoutes = require('./routes/familyRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/family', familyRoutes);
app.use('/api/auth', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
