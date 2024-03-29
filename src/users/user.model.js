import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is obligatory"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is obligatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is obligatory"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE"],
    default: "ADMIN_ROLE",
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default mongoose.model("User", UserSchema);
