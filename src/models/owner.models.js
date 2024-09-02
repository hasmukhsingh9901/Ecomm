import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
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

    picture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    gstin: String,
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
