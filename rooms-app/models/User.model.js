const mongoose = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);



