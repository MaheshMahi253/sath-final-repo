"use client";

import { useState, useEffect } from "react";
import useProtectedRoute from "../../utils/protectRoute";
import api from "../../utils/api";

export default function AdminDashboard() {
  useProtectedRoute("admin");

  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedNri, setSelectedNri] = useState(null);
  const [selectedRural, setSelectedRural] = useState(null);

  useEffect(() => {
    setMounted(true);

    async function fetchData() {
      try {
        const uRes = await api.get("/admin/users");
        setUsers(uRes.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      }

      try {
        const sRes = await api.get("/admin/sessions");
        setSessions(sRes.data || []);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setSessions([]);
      }

      try {
        const fRes = await api.get("/admin/feedbacks");
        setFeedbacks(fRes.data || []);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setFeedbacks([]);
      }
    }

    fetchData();
  }, []);

  const handlePairUsers = async () => {
    if (!selectedNri || !selectedRural) {
      alert("Please select one NRI and one Rural user.");
      return;
    }

    try {
      const res = await api.post("/admin/pair", {
        nriId: selectedNri,
        ruralId: selectedRural,
        sessionType: "General",
      });

      const newSession = {
        id: res.data.id,
        nriId: res.data.nriId,
        ruralId: res.data.ruralId,
        sessionType: res.data.sessionType || "General",
        date: res.data.date || new Date().toISOString().split("T")[0],
        time: res.data.time || "00:00",
        status: "Approved",
      };

      setSessions((prev) => [...prev, newSession]);
      setSelectedNri(null);
      setSelectedRural(null);

      alert("Users paired successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to pair users: " + (err.response?.data?.error || err.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const nriUsers = users.filter((u) => u.role === "nri");
  const ruralUsers = users.filter((u) => u.role === "rural");

  const renderTable = (userList, role) => {
    const tableRows = [];

    userList.forEach((u) => {
      const userSessions = sessions.filter(
        (s) => s.userId === u.id || (role === "nri" ? s.nriId === u.id : s.ruralId === u.id)
      );

      if (userSessions.length > 0) {
        userSessions.forEach((s) => {
          tableRows.push({
            userId: u.id,
            name: u.name,
            email: u.email,
            sessionType: s.sessionType || "-",
            sessionDateTime: s.date && s.time ? `${s.date} ${s.time}` : "-",
            sessionStatus: s.status || "-",
          });
        });
      } else {
        tableRows.push({
          userId: u.id,
          name: u.name,
          email: u.email,
          sessionType: "-",
          sessionDateTime: "-",
          sessionStatus: "-",
        });
      }
    });

    return (
      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Session Type</th>
              <th>Session Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, idx) => (
              <tr key={`${row.userId}-${idx}`}>
                <td>
                  <input
                    type="radio"
                    name={role}
                    checked={role === "nri" ? selectedNri === row.userId : selectedRural === row.userId}
                    onChange={() =>
                      role === "nri" ? setSelectedNri(row.userId) : setSelectedRural(row.userId)
                    }
                  />
                </td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.sessionType}</td>
                <td>{row.sessionDateTime}</td>
                <td className={row.sessionStatus === "Approved" ? "approved" : ""}>{row.sessionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFeedbackTable = () => {
    if (!feedbacks.length) return <p>No feedbacks submitted yet.</p>;

    return (
      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f, idx) => (
              <tr key={f.id || idx}>
                <td>{idx + 1}</td>
                <td>{f.userName}</td>
                <td>{users.find((u) => u.id === f.userId?.toString())?.email || "-"}</td>
                <td>{f.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="title">Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="pair-btn-container">
        <button onClick={handlePairUsers} className="pair-btn">
          Pair Selected Users
        </button>
      </div>

      <div className="tables-container">
        <section>
          <h2>NRI Users ({nriUsers.length})</h2>
          {renderTable(nriUsers, "nri")}
        </section>

        <section>
          <h2>Rural Users ({ruralUsers.length})</h2>
          {renderTable(ruralUsers, "rural")}
        </section>

        <section>
          <h2>User Feedbacks ({feedbacks.length})</h2>
          {renderFeedbackTable()}
        </section>
      </div>

      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f7f9;
        }

        .dashboard-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .dashboard-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #4a90e2;
          color: white;
          padding: 12px 20px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.15);
          flex-wrap: wrap;
        }

        .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .logout-btn { padding: 6px 12px; font-size: 14px; cursor: pointer; background-color: #e74c3c; color: white; border: none; border-radius: 4px; transition: background 0.3s; }
        .logout-btn:hover { background-color: #c0392b; }

        .pair-btn-container { text-align: center; margin: 25px 0; }
        .pair-btn { padding: 10px 20px; font-size: 16px; background-color: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: background 0.3s; }
        .pair-btn:hover { background-color: #1e8449; }

        .tables-container { display: flex; flex-direction: column; gap: 40px; align-items: center; }
        h2 { margin-bottom: 15px; font-size: 22px; text-align: center; color: #333; }

        .table-wrapper { width: 100%; }

        .dashboard-table { width: 90%; border-collapse: collapse; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 3px 8px rgba(0,0,0,0.1); overflow: hidden; }
        .dashboard-table th, .dashboard-table td { border-bottom: 1px solid #e0e0e0; padding: 10px 12px; text-align: center; }
        .dashboard-table th { background-color: #f0f4f7; color: #333; font-weight: 600; }
        .dashboard-table tr:nth-child(even) { background-color: #f9f9f9; }
        .dashboard-table tr:hover { background-color: #e8f0fe; }
        .approved { color: #27ae60; font-weight: bold; }
        input[type="radio"] { transform: scale(1.3); cursor: pointer; }

        /* Mobile only vertical scroll */
        @media (max-width: 480px) {
          .table-wrapper {
            max-height: 400px; /* adjust as needed */
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}
