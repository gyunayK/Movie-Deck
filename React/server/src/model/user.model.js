const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 20 },
    lastName: { type: String, required: true, min: 3, max: 20 },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    favorites: { type: Array, default: [] },
  },
  { collection: "users" } // Change this to 'users'
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
