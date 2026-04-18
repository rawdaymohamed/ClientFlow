// controllers/contact.controller.js
import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company } = req.body;

    const normalizedEmail = email?.trim()
      ? email.trim().toLowerCase()
      : undefined;

    const contact = await Contact.create({
      user: req.user.id,
      firstName,
      lastName,
      email: normalizedEmail,
      phone,
      company,
    });

    return res.status(201).json({
      message: "Contact created successfully",
      contact,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A contact with this email already exists",
      });
    }

    return res.status(500).json({
      message: "Something went wrong while creating contact",
    });
  }
};
export const getContacts = async (req, res) => {
  res.status(200).json({ message: "Get all contacts - To be implemented" });
};
