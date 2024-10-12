const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const insertData = require("./helper/inserdata");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("Connected to MongoDB");

  // Insert data when the server starts
  await insertData();

}).catch((err) => {
  console.log(err);
});

// Example Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Blog Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/posts', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
