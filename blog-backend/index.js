const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

// Example Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Blog Routes (e.g., '/api/posts', '/api/posts/:geoLocation')
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/posts', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
