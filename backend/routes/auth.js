// routes/auth.js
import express from "express";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

const router = express.Router();

// ✅ Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const db = req.db;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields required" });
  }

  const userExists = db.data.users.find((u) => u.email === email);
  if (userExists) return res.status(400).json({ error: "User already exists" });

  const newUser = { id: nanoid(), name, email, password, role };
  db.data.users.push(newUser);
  await db.write();

  res.json({ message: "Registered successfully!" });
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = req.db;

  const user = db.data.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // Create JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, role: user.role },
  });
});

export default router;
