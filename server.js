// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const familyRoutes = require('./routes/familyRoutes'); // Import routes

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware setup
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1); // Exit if the connection fails
//   }
// }

// connectToMongoDB();

// // Use family routes with a base path
// app.use('/api/family', familyRoutes);

// // Start server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const familyRoutes = require('./routes/familyRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/family', familyRoutes);

console.log("MongoDB URI:", process.env.MONGODB_URI);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
