// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Low, JSONFile } from "lowdb";
import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/sessions.js";
import adminRoutes from "./routes/admin.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Setup LowDB
const adapter = new JSONFile("db.json");
const db = new Low(adapter);
await db.read();
db.data ||= { users: [], sessions: [], feedbacks: [] };
app.db = db;

// ✅ Attach db to all requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 5001; // Make sure frontend also uses 5000
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
