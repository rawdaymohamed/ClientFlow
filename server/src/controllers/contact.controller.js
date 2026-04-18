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
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const [contacts, totalContacts] = await Promise.all([
      Contact.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Contact.countDocuments({ user: req.user.id }),
    ]);

    return res.status(200).json({
      message: "Contacts retrieved successfully",
      contacts,
      pagination: {
        page,
        limit,
        totalContacts,
        totalPages: Math.ceil(totalContacts / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while retrieving contacts",
    });
  }
};
