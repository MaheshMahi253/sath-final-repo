import { useEffect, useState } from "react";
import useProtectedRoute from "../../../utils/protectRoute";
import RuralLayout from "../../../components/RuralLayout";

export default function RuralHome() {
  useProtectedRoute("rural");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserName(user.name);
    }
  }, []);

  const steps = [
    { step: "Step 1", title: "Go to Schedule", desc: "Select the 'Schedule Session' page from the menu to view available session slots.", icon: "📅" },
    { step: "Step 2", title: "Select Session", desc: "Choose the session type, preferred date, and time that suits you.", icon: "🕒" },
    { step: "Step 3", title: "Wait for Approval", desc: "Your booking will be reviewed and approved by the admin for pairing.", icon: "✅" },
    { step: "Step 4", title: "Join Session", desc: "Once approved, you can join the session via the 'Confirmed Sessions' page.", icon: "🎥" },
  ];

  return (
    <RuralLayout>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <h1>Welcome to BridgeConnect{userName ? `, ${userName}` : ""}</h1>
          <p>Connect with NRI kids through guided virtual sessions to enhance your confidence and cultural awareness.</p>
        </section>

        {/* Steps Section */}
        <section className="steps">
          <h2>How to Book a Session</h2>
          <div className="steps-grid">
            {steps.map((s, idx) => (
              <div key={idx} className="step-card">
                <div className="icon">{s.icon}</div>
                <div>
                  <h3>{s.step}: {s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta">
          <p>Start connecting today and explore opportunities to learn and grow together!</p>
          <a href="/dashboard/rural/schedule" className="cta-button" role="button">Book a Session</a>
        </section>
      </div>

      <style jsx>{`
        .home-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .hero {
          background-color: #e0f2fe;
          text-align: center;
          padding: 40px 20px;
          border-radius: 10px;
          margin-bottom: 40px;
        }

        .hero h1 {
          font-size: 2.5rem;
          color: #1e40af;
          margin-bottom: 15px;
        }

        .hero p {
          font-size: 1.1rem;
          color: #334155;
          line-height: 1.5;
        }

        .steps {
          margin-bottom: 40px;
        }

        .steps h2 {
          font-size: 2rem;
          color: #1e3a8a;
          text-align: center;
          margin-bottom: 30px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media(min-width: 600px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media(min-width: 900px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
        }

        .step-card {
          display: flex;
          align-items: flex-start;
          background-color: #ffffff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .step-card .icon {
          font-size: 2rem;
          margin-right: 15px;
        }

        .step-card h3 {
          margin: 0 0 8px 0;
          color: #1e40af;
          font-size: 1.1rem;
        }

        .step-card p {
          margin: 0;
          color: #475569;
          font-size: 0.95rem;
        }

        .cta {
          text-align: center;
          margin-bottom: 40px;
        }

        .cta p {
          font-size: 1.1rem;
          margin-bottom: 20px;
          color: #334155;
        }

        .cta-button {
          background-color: #1e40af;
          color: white;
          padding: 12px 25px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: background-color 0.3s, transform 0.2s;
        }

        .cta-button:hover,
        .cta-button:focus {
          background-color: #1e3a8a;
          transform: translateY(-2px);
          outline: none;
        }
      `}</style>
    </RuralLayout>
  );
}
