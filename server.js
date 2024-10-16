require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const familyRoutes = require('./routes/familyRoutes'); // Adjust path if necessary

const app = express();
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI; 

// Use proper connection options for Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB with Mongoose'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/family', familyRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const familyRoutes = require('./routes/familyRoutes'); // Adjust path if necessary

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Replace URI with your credentials and correct database name
// const uri = process.env.MONGODB_URI; 

// // Mongoose connection with appropriate options
// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(uri, {
//       serverSelectionTimeoutMS: 5000, // Set timeout to avoid hanging
//       dbName: "family_tree", // Optional: Ensure it targets the right database
//     });
//     console.log("Connected to MongoDB!");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1); // Exit the process if connection fails
//   }
// }

// // Call the function to connect
// connectToMongoDB();

// app.use(express.json()); // Middleware to parse JSON bodies

// // Routes
// app.use('/api/family', familyRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
