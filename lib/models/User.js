import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      maxlength: 120
    },
    passwordHash: {
      type: String,
      required() {
        return !this.password;
      },
      select: false
    },
    password: {
      type: String,
      select: false
    },
    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient"
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
