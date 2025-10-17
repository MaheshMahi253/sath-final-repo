import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Book a session
router.post("/book", authMiddleware, async (req, res) => {
  const db = req.db;
  const { sessionType, date, time } = req.body;
  const user = req.user;

  if (!sessionType || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newSession = {
    id: Date.now().toString(),
    userId: user.id,
    name: user.name,
    sessionType,
    date,
    time,
    status: "pending",
  };

  db.data.sessions.push(newSession);
  await db.write();

  res.status(201).json({
    message: "Session booked successfully",
    session: newSession,
  });
});

// ✅ Fetch sessions of logged-in user
router.get("/mine", authMiddleware, async (req, res) => {
  const db = req.db;
  const user = req.user;

  const userSessions = db.data.sessions.filter((s) => s.userId === user.id);
  res.json(userSessions);
});

// ✅ Submit feedback (protected)
router.post("/feedbacks", authMiddleware, async (req, res) => {
  const db = req.db;
  const user = req.user;
  const { comment } = req.body;

  if (!comment || !comment.trim()) {
    return res.status(400).json({ message: "Feedback cannot be empty" });
  }

  try {
    await db.read();
    db.data.feedbacks ||= [];

    const newFeedback = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      role: user.role,
      comment: comment.trim(),
      date: new Date().toISOString(),
    };

    db.data.feedbacks.push(newFeedback);
    await db.write();

    res.status(201).json({
      message: "Feedback saved successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Server error while saving feedback" });
  }
});

// ✅ Fetch all feedbacks (optional, protected for admin)
router.get("/feedbacks", authMiddleware, async (req, res) => {
  const db = req.db;
  await db.read();

  db.data.feedbacks ||= [];
  res.json(db.data.feedbacks);
});

export default router;
