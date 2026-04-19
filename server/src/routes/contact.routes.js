import express from "express";
import {
  createContact,
  getContacts,
  updateContact,
} from "../controllers/contact.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createContactSchema } from "../validators/contact.validator.js";

const router = express.Router();

router.post("/", protect, validate(createContactSchema), createContact);
router.get("/", protect, getContacts);
router.put("/:id", protect, validate(createContactSchema), updateContact);
export default router;
