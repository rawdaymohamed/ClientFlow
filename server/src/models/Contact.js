// models/contact.model.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name must be at most 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name must be at most 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [20, "Phone number must be at most 20 characters"],
    },
    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Company name must be at most 100 characters"],
    },
  },
  {
    timestamps: true,
  },
);

contactSchema.index({ user: 1, email: 1 }, { unique: true, sparse: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
