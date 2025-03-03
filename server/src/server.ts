import OpenAI from "openai";
import { Request, Response } from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post(
  "/api/identify-cloud",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageUrl = "http://localhost:5000/uploads/${req.file.filename}`";

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What types of clouds are visible in this image?",
              },
            ],
          },
        ],
        max_tokens: 300,
      });

      if (!response.choices || response.choices.length === 0) {
        return res.status(500).json({ error: "No response from OpenAI API" });
      }

      res.json({
        cloudData: response.choices[0].message.content,
      });
    } catch (error: any) {
      console.error("Error processing file:", error);
      if (error.response) {
        console.error("Error response from OpenAI API:", error.response.data);
      }
      res.status(500).json({ error: "Error processing file" });
    }
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
