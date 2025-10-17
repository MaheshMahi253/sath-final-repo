import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/feedbacks", authMiddleware, async (req, res) => {
  const db = req.db;
  res.json(db.data.feedbacks || []);
});

// Admin-only routes
router.use(authMiddleware);

// Get all users
router.get("/users", (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  res.json(req.db.data.users);
});

// Get all sessions
router.get("/sessions", (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  res.json(req.db.data.sessions);
});

// Pair a session
router.post("/pair", async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const { sessionId, pairWithId } = req.body;
  const db = req.db;
  const session = db.data.sessions.find(s => s.id === sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  session.status = "Approved";
  session.pairedWith = pairWithId;
  await db.write();

  res.json({ message: "Session paired successfully" });
});

export default router;
