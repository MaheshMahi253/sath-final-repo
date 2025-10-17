import { useState, useEffect } from "react";
import useProtectedRoute from "../../../utils/protectRoute";
import api from "../../../utils/api";
import NRILayout from "../../../components/nrilayout"; // updated

export default function ConfirmedSessions() {
  useProtectedRoute("nri"); // update role if this is for NRI users

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchConfirmed() {
      try {
        const res = await api.get("/sessions/mine"); // assuming status = 'Approved'
        const confirmed = res.data.filter(s => s.status === "Approved");
        setSessions(confirmed);
      } catch (err) {
        console.error("Error fetching confirmed sessions:", err);
      }
    }
    fetchConfirmed();
  }, []);

  return (
    <NRILayout>
      <div className="confirmed-page">
        <div className="confirmed-card">
          <h2 className="confirmed-title">Your Confirmed Sessions</h2>

          {sessions.length === 0 ? (
            <p className="no-sessions">No confirmed sessions yet</p>
          ) : (
            <table className="confirmed-table">
              <thead>
                <tr className="table-header">
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id}>
                    <td>{s.sessionType}</td>
                    <td>{s.date}</td>
                    <td>{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style jsx>{`
        .confirmed-page {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 80vh;
          padding: 20px;
          background-color: #f3f4f6;
        }

        .confirmed-card {
          background: #ffffff;
          padding: 25px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 600px;
        }

        .confirmed-title {
          font-size: 1.6rem;
          color: #1e40af;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .no-sessions {
          font-style: italic;
          color: #64748b;
        }

        .confirmed-table {
          width: 100%;
          border-collapse: collapse;
        }

        .confirmed-table th,
        .confirmed-table td {
          border: 1px solid #cbd5e1;
          padding: 10px;
          text-align: left;
          font-size: 0.95rem;
        }

        .table-header {
          background-color: #f1f5f9;
          font-weight: 600;
        }

        .confirmed-table tr:nth-child(even) {
          background-color: #f9fafb;
        }
      `}</style>
    </NRILayout>
  );
}
