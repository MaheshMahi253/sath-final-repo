import { useState } from "react";
import useProtectedRoute from "../../../utils/protectRoute";
import api from "../../../utils/api";
import NRILayout from "../../../components/nrilayout";

export default function Feedback() {
  useProtectedRoute("nri");

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return alert("Please write your feedback before submitting.");
    setLoading(true);
    try {
      const res = await api.post("/sessions/feedbacks", { comment });
      alert("✅ Feedback submitted successfully!");
      setComment("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert(err.response?.data?.message || "Error submitting feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NRILayout>
      <div className="feedback-page">
        <div className="feedback-card">
          <h2 className="feedback-title">Share Your Feedback</h2>
          <div className="feedback-input">
            <textarea
              className="feedback-textarea"
              placeholder="Write your feedback..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              disabled={loading}
            />
            <button
              className="feedback-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .feedback-page {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 80vh;
          padding: 20px;
          background-color: #f3f4f6;
        }

        .feedback-card {
          background: #ffffff;
          padding: 25px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 600px;
        }

        .feedback-title {
          font-size: 1.6rem;
          color: #1e40af;
          font-weight: 600;
          margin-bottom: 15px;
          text-align: center;
        }

        .feedback-input {
          display: flex;
          flex-direction: column;
        }

        .feedback-textarea {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          min-height: 120px;
          resize: vertical;
          font-size: 0.95rem;
          margin-bottom: 12px;
          transition: border-color 0.3s;
        }

        .feedback-textarea:focus {
          outline: none;
          border-color: #1e40af;
          box-shadow: 0 0 0 2px rgba(30,64,175,0.2);
        }

        .feedback-btn {
          background-color: #1e40af;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s, transform 0.2s;
        }

        .feedback-btn:hover {
          background-color: #1e3a8a;
          transform: translateY(-1px);
        }

        .feedback-btn:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .feedback-card {
            padding: 18px 16px;
          }

          .feedback-title {
            font-size: 1.3rem;
          }

          .feedback-textarea {
            font-size: 0.9rem;
          }

          .feedback-btn {
            font-size: 0.95rem;
            padding: 8px 12px;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .feedback-card {
            padding: 22px 20px;
          }

          .feedback-title {
            font-size: 1.45rem;
          }

          .feedback-textarea {
            font-size: 0.93rem;
          }

          .feedback-btn {
            font-size: 0.97rem;
            padding: 9px 14px;
          }
        }
      `}</style>
    </NRILayout>
  );
}
