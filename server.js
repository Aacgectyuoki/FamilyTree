require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const familyRoutes = require('./routes/familyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'family_tree',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectToMongoDB();
app.use('/api/family', familyRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// require('dotenv').config(); // Load environment variables from .env
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Allow cross-origin requests

// const familyRoutes = require('./routes/familyRoutes'); // Adjust path if needed

// const app = express();
// const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
// const uri = process.env.MONGODB_URI; // MongoDB connection string

// // Apply CORS middleware
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json()); 

// // Connect to MongoDB
// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Timeout to avoid hanging
//       dbName: "family_tree", // Optional: Ensure you use the correct database
//     });
//     console.log("Connected to MongoDB with Mongoose");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1); // Exit process if unable to connect
//   }
// }

// // Call function to connect to MongoDB
// connectToMongoDB();

// // Routes
// app.use('/api/family', familyRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



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
