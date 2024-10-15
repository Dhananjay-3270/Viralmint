// Import mongoose for creating the User schema
const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // Username field: must be unique, required, and trimmed of extra spaces
  username: {
    type: String,
    required: true,     // Username is required
    unique: true,       // Each username must be unique
    trim: true,         // Trim leading/trailing spaces
  },
  // Email field: must be unique, lowercase, required, and trimmed
  email: {
    type: String,
    required: true,     // Email is required
    unique: true,       // Each email must be unique
    lowercase: true,    // Convert email to lowercase automatically
    trim: true,         // Trim leading/trailing spaces
  },
  // Password field: required and must have at least 6 characters
  password: {
    type: String,
    required: true,     // Password is required
    minlength: 6,       // Minimum length of password is 6 characters
  },
  // Location field: optional, includes city and country
  location: {
    city: {
      type: String,
      required: false,   // Optional: you can make this required if needed
      trim: true,        // Trim leading/trailing spaces
    },
    country: {
      type: String,
      required: false,   // Optional: you can make this required if needed
      trim: true,        // Trim leading/trailing spaces
    },
  },
  // Blogs field: an array that stores references to the user's blog posts
  blogs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BlogPost',     // References the BlogPost model
  }],
  // Timestamps for when the user was created and last updated
  createdAt: {
    type: Date,
    default: Date.now,    // Set to the current date when the user is created
  },
  updatedAt: {
    type: Date,
    default: Date.now,    // Set to the current date when the user is updated
  },
});

// Middleware to automatically update the `updatedAt` field before saving a user document
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();   // Update the timestamp to the current time
  next();                        // Continue to the next middleware or save function
});

// Middleware to hash the user's password before saving the document
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing

userSchema.pre('save', async function(next) {
  // If the password hasn't been modified, skip hashing
  if (!this.isModified('password')) return next();

  // Generate a salt for hashing the password
  const salt = await bcrypt.genSalt(10);
  
  // Hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
  
  // Update the `updatedAt` timestamp
  this.updatedAt = Date.now();
  
  // Proceed to the next middleware or save function
  next();
});

// Static method to find a user by email and validate their password
userSchema.statics.findByCredentials = async (email, password) => {
  // Find the user by their email
  const user = await User.findOne({ email });
  
  // If no user is found, throw an error
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  
  // If the passwords don't match, throw an error
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  // If credentials are valid, return the user
  return user;
};

// Create the User model from the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
