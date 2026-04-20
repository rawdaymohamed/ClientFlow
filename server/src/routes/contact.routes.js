import express from "express";
import {
  createContact,
  getContactById,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createContactSchema } from "../validators/contact.validator.js";

const router = express.Router();

router.post("/", protect, validate(createContactSchema), createContact);
router.get("/", protect, getContacts);
router.put("/:id", protect, validate(createContactSchema), updateContact);
router.get("/:id", protect, getContactById);
router.delete("/:id", protect, deleteContact);
export default router;
