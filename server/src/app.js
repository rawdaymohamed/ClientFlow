import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
const app = express();

// Middleware
app.use(express.json()); // JSON parser
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
  });
});

export default app;
