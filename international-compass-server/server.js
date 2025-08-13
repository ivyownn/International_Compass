import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----- Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ----- Google Maps API key (sent to client to load Maps)
app.get("/google-maps-key", (_req, res) => {
  // Match your README: GOOGLE_MAPS_KEY
  res.json({ key: process.env.GOOGLE_MAPS_KEY || "" });
});

// ----- Unsplash image proxy (random, landscape)
app.get("/unsplash-image", async (req, res) => {
  const query = req.query.query || "international students campus";
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!unsplashAccessKey) {
    return res.status(500).json({ error: "Unsplash API key missing" });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        query
      )}&client_id=${unsplashAccessKey}&orientation=landscape`
    );

    if (!response.ok) {
      const txt = await response.text().catch(() => "");
      console.error("Unsplash error:", response.status, txt);
      return res.status(502).json({ error: "Error fetching from Unsplash" });
    }

    const data = await response.json();
    res.json({
      url: data?.urls?.regular || null,
      altDescription: data?.alt_description || "Image",
      attribution: data?.user?.name || undefined,
    });
  } catch (error) {
    console.error("Unsplash fetch error:", error);
    res.status(500).json({ error: "Unable to fetch image" });
  }
});

// ----- Contact form email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or configure SMTP host/port/secure
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use App Password or OAuth2 in production
      },
    });

    await transporter.sendMail({
      from: `"International Compass" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // fallback
      replyTo: email,
      subject: `Message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// ----- Catch-all (optional). If you prefer 404s for unknown routes, remove this.
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ----- Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
