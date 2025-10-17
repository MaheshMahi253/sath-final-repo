import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("nri");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") router.push("/dashboard/admin");
      else if (user.role === "nri") router.push("/dashboard/nri/home");
      else if (user.role === "rural") router.push("/dashboard/rural/home");
      else router.push("/");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password, role });
      alert("Sign Up Successful! Please login.");
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
      setRole("nri");
    } catch (err) {
      alert("Sign Up failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="main-content">
        <section className="auth-section">
          <div className="form-container">
            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className={`form login-form ${isLogin ? "show" : "hide-left"}`}
            >
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
              <p className="switch-text">
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            </form>

            {/* Sign Up Form */}
            <form
              onSubmit={handleSignUp}
              className={`form signup-form ${isLogin ? "hide-right" : "show"}`}
            >
              <h2>Sign Up</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-select"
              >
                <option value="nri">nri</option>
                <option value="rural">rural</option>
                <option value="admin">admin</option>
              </select>
              <button type="submit">Sign Up</button>
              <p className="switch-text">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f9fafb;
        }

        .main-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
        }

        .auth-section {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .form-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          min-height: 420px;
        }

        .form {
          position: absolute;
          width: 100%;
          padding: 32px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .form h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #1e3a8a;
        }

        .form input,
        .role-select {
          width: 100%;
          padding: 10px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 0.95rem;
        }

        .form button {
          width: 100%;
          padding: 12px;
          background-color: #1e40af;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .form button:hover {
          background-color: #2563eb;
        }

        .switch-text {
          text-align: center;
          margin-top: 12px;
          color: #374151;
        }

        .switch-text span {
          color: #1e40af;
          cursor: pointer;
        }

        .show {
          transform: translateX(0);
          opacity: 1;
          z-index: 2;
        }

        .hide-left {
          transform: translateX(-100%);
          opacity: 0;
          z-index: 1;
        }

        .hide-right {
          transform: translateX(100%);
          opacity: 0;
          z-index: 1;
        }

        /* Mobile: max-width 480px */
        @media (max-width: 480px) {
          .main-content {
            padding: 30px 12px;
            align-items: flex-start;
          }
          .form-container {
            max-width: 100%;
            min-height: auto;
            height: auto;
          }
          .form {
            position: relative;
            transform: translateX(0) !important;
            opacity: 1 !important;
            z-index: 2 !important;
            margin-bottom: 20px;
          }
          .hide-left,
          .hide-right {
            transform: translateX(0) !important;
            opacity: 1 !important;
            z-index: 2 !important;
          }
          .form input,
          .role-select,
          .form button {
            font-size: 0.9rem;
            padding: 8px;
          }
          .switch-text {
            font-size: 0.85rem;
          }
        }

        /* Tablet & small laptop: 481px - 1024px */
        @media (min-width: 481px) and (max-width: 1024px) {
          .form-container {
            max-width: 350px;
          }
          .form {
            padding: 28px;
          }
          .form input,
          .role-select,
          .form button {
            font-size: 0.92rem;
            padding: 10px;
          }
        }

        /* Large Laptop/Desktop: 1025px+ */
        @media (min-width: 1025px) {
          .form-container {
            max-width: 400px;
          }
          .form {
            padding: 32px;
          }
          .form input,
          .role-select,
          .form button {
            font-size: 0.95rem;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}
