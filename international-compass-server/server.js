import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// === Contact Form Email Route ===
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic field validation
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${name}`,
      text: message,
    });

    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// === Unsplash Proxy Route ===
app.get("/unsplash-image", async (req, res) => {
  const { query, orientation = "landscape" } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        query
      )}&orientation=${orientation}&client_id=${
        process.env.UNSPLASH_ACCESS_KEY
      }`
    );

    if (!response.ok) {
      console.error("Unsplash API Error:", await response.text());
      return res.status(500).json({ error: "Unsplash API error" });
    }

    const data = await response.json();
    if (!data.urls?.regular) {
      return res.status(404).json({ error: "No image found." });
    }

    res.json({ url: data.urls.regular });
  } catch (error) {
    console.error("Unsplash Error:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

// === Google Maps API Key Route ===
app.get("/google-maps-key", (req, res) => {
  const key = process.env.GOOGLE_MAPS_KEY;
  if (!key) {
    return res
      .status(500)
      .json({ error: "Google Maps API key not configured." });
  }
  res.json({ key });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
