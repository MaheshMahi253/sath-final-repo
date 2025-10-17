import { useState, useEffect } from "react";
import useProtectedRoute from "../../../utils/protectRoute";
import api from "../../../utils/api";
import RuralLayout from "../../../components/RuralLayout";

export default function RuralSchedule() {
  useProtectedRoute("rural");

  const [sessionType, setSessionType] = useState("General");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await api.get("/sessions/mine");
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    }
    fetchSessions();
  }, []);

  const handleBook = async () => {
    if (!date || !time) return alert("Select date and time");
    try {
      const res = await api.post("/sessions/book", { sessionType, date, time });
      alert(res.data.message);
      setSessions(prev => [...prev, res.data.session]);
      setDate("");
      setTime("");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <RuralLayout>
      <div className="schedule-container">
        <h2 className="page-title">Schedule Session</h2>

        <div className="form-container">
          <select
            value={sessionType}
            onChange={e => setSessionType(e.target.value)}
            className="input-field"
          >
            <option value="General">General</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="Cultural">Cultural</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="input-field"
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="input-field"
          />
          <button onClick={handleBook} className="book-button">Book</button>
        </div>

        <h3 className="sessions-title">Your Sessions:</h3>
        {sessions.length === 0 ? (
          <p className="no-sessions">No sessions booked yet</p>
        ) : (
          <div className="table-wrapper">
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id}>
                    <td>{s.sessionType}</td>
                    <td>{s.date}</td>
                    <td>{s.time}</td>
                    <td className={s.status === "pending" ? "pending" : "confirmed"}>{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .schedule-container {
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          max-width: 650px;
          margin: 20px auto;
        }

        .page-title {
          font-size: 1.6rem;
          color: #1e40af;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .form-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .input-field {
          padding: 8px 10px;
          border-radius: 5px;
          border: 1px solid #cbd5e1;
          font-size: 0.95rem;
          flex: 1;
          min-width: 120px;
          transition: border-color 0.3s;
        }

        .input-field:focus {
          outline: none;
          border-color: #1e40af;
          box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.2);
        }

        .book-button {
          background-color: #1e40af;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .book-button:hover {
          background-color: #1e3a8a;
          transform: translateY(-1px);
        }

        .sessions-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #1e3a8a;
        }

        .no-sessions {
          font-style: italic;
          color: #64748b;
        }

        /* Table wrapper for horizontal scroll on small screens */
        .table-wrapper {
          overflow-x: auto;
        }

        .sessions-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
        }

        .sessions-table th,
        .sessions-table td {
          padding: 8px 12px;
          border-bottom: 1px solid #e2e8f0;
        }

        .sessions-table th {
          background-color: #f1f5f9;
          color: #1e3a8a;
          font-weight: 600;
        }

        .sessions-table tr:hover {
          background-color: #f1f5f9;
        }

        .pending {
          color: #f59e0b;
          font-weight: 600;
        }

        .confirmed {
          color: #10b981;
          font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .form-container {
            flex-direction: column;
          }
          .input-field, .book-button {
            width: 100%;
          }
        }
      `}</style>
    </RuralLayout>
  );
}
