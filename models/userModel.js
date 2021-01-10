import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
