const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt       : { type: Date },
  updatedAt       : { type: Date },
  password        : { type: String, select: false },
  username        : { type: String, required: true }
});

// Define the callback with a regular function to avoid problems with this
UserSchema.pre('save', function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
