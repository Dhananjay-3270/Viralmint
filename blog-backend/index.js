// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const insertData = require('./helper/inserdata'); // Helper function to insert initial data
const postroutes = require('./routes/postroutes'); // Routes for post functionality
const apiroutes = require('./routes/apiroutes'); // General API routes
const webhookroutes = require('./routes/webhookroutes')
// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON data and enable CORS
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS) for frontend-backend communication

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,     // Use new URL parser to avoid deprecation warnings
  useUnifiedTopology: true,  // Use new server discovery and monitoring engine
})
  .then(async () => {
    console.log("Connected to MongoDB");

    // Insert initial data into the database when the server starts
    await insertData();

  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Base route to verify the server is running
app.get("/", (req, res) => {
  res.send("Backend is running"); // Simple message for health check
});

// Define routes for handling posts
app.use("/posts", postroutes);

// Define general API routes
app.use("/api", apiroutes);

app.use('/createcheckoutsession', webhookroutes);

// Define the port the server will run on (default to 5000 if not set in environment)
const PORT = process.env.PORT || 10000; // If no PORT variable is set, default to port 10000

// Start the server and listen for incoming requests on all network interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
