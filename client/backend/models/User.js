const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v); // Basic email regex
      },
      message: 'Please provide a valid email address',
    },
  },
  password: { type: String, required: true },
});

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware if hashing fails
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
