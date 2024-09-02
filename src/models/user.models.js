import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //   role: {
    //     type: String,
    //     enum: ["admin", "user"],
    //     default: "user",
    //   },
    cart: {
      type: Array,
      default: [],
    },
    isAdmin: Boolean,
    orders: {
      type: Array,
      default: [],
    },
    contact: {
      type: Number,
      default: 0,
    },
    picture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
