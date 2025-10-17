import { useState, useEffect } from "react";
import useProtectedRoute from "../../../utils/protectRoute";
import api from "../../../utils/api";
import RuralLayout from "../../../components/RuralLayout";

export default function Feedback() {
  useProtectedRoute("rural");

  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await api.get("/sessions/feedbacks");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    }
    fetchFeedbacks();
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) return alert("Write something");
    try {
      const res = await api.post("/sessions/feedbacks", { comment });
      setFeedbacks(prev => [...prev, res.data]);
      setComment("");
      alert("Feedback submitted!");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <RuralLayout>
      <div className="feedback-page">
        <div className="feedback-card">
          <h2 className="feedback-title">Share Your Feedback</h2>
          <div className="feedback-input">
            <textarea
              className="feedback-textarea"
              placeholder="Write your feedback..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button className="feedback-btn" onClick={handleSubmit}>Submit Feedback</button>
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
          margin-bottom: 20px;
        }

        .feedback-textarea {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          min-height: 100px;
          resize: vertical;
          font-size: 0.95rem;
          margin-bottom: 10px;
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
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: background-color 0.3s, transform 0.2s;
        }

        .feedback-btn:hover {
          background-color: #1e3a8a;
          transform: translateY(-1px);
        }

        .previous-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 10px;
        }

        .no-feedback {
          font-style: italic;
          color: #64748b;
        }

        .feedback-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 250px;
          overflow-y: auto;
        }

        .feedback-item {
          background: #f1f5f9;
          padding: 10px 12px;
          border-radius: 6px;
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: #1f2937;
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
            font-size: 0.9rem;
            padding: 6px 12px;
          }
          .previous-title {
            font-size: 1.05rem;
          }
          .feedback-item {
            font-size: 0.9rem;
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
            font-size: 0.93rem;
            padding: 8px 14px;
          }
          .previous-title {
            font-size: 1.1rem;
          }
          .feedback-item {
            font-size: 0.93rem;
          }
        }
      `}</style>
    </RuralLayout>
  );
}
