import Link from "next/link";
import { useRouter } from "next/router";

export default function RuralLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/"); // go back to home
  };

  const links = [
    { href: "/dashboard/nri/home", label: "Home" },
    { href: "/dashboard/nri/schedule", label: "Schedule" },
    { href: "/dashboard/nri/feedback", label: "Feedback" },
    { href: "/dashboard/nri/confirmed", label: "Confirmed Sessions" },
  ];

  return (
    <div className="rural-container">
      <header className="rural-header">
        <h1 className="rural-title">BridgeConnect - Nri</h1>
        <nav className="rural-nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rural-link">
              <span
                className={`${
                  router.pathname === link.href ? "active" : ""
                } white-link`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <button className="rural-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="rural-main">{children}</main>

      <style jsx>{`
        .rural-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }

        .rural-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #1e40af;
          color: white;
          padding: 16px 32px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .rural-title {
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 1px;
          margin: 0;
        }

        .rural-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .rural-link {
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 4px;
          transition: background-color 0.3s, color 0.3s;
          text-decoration: none;
        }

        .white-link {
          color: white;
          text-decoration: none;
        }

        .rural-link span {
          cursor: pointer;
        }

        /* Active link highlight */
        .rural-link span.active {
          background-color: #facc15; /* yellow highlight */
          padding: 6px 12px;
          border-radius: 4px;
        }

        .rural-link span:hover {
          background-color: rgba(250, 204, 21, 0.3);
          color: white;
        }

        .rural-logout {
          background-color: #dc2626;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .rural-logout:hover {
          background-color: #b91c1c;
        }

        .rural-main {
          flex: 1;
          padding: 24px 32px;
        }

        /* Small phones (≤ 480px) */
        @media (max-width: 480px) {
          .rural-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 12px 16px;
            gap: 10px;
          }

          .rural-title {
            font-size: 20px;
          }

          .rural-nav {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .rural-link {
            width: 100%;
            text-align: left;
            padding: 6px 12px;
          }

          .rural-logout {
            width: 100%;
            padding: 6px 12px;
          }

          .rural-main {
            padding: 16px 16px;
          }
        }

        /* Tablets (481px - 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .rural-header {
            padding: 14px 24px;
          }

          .rural-title {
            font-size: 22px;
          }

          .rural-nav {
            flex-wrap: wrap;
            gap: 16px;
          }

          .rural-main {
            padding: 20px 24px;
          }
        }

        /* Laptops (769px - 1200px) */
        @media (min-width: 769px) and (max-width: 1200px) {
          .rural-header {
            padding: 16px 28px;
          }

          .rural-title {
            font-size: 24px;
          }

          .rural-nav {
            gap: 20px;
          }

          .rural-main {
            padding: 24px 28px;
          }
        }
      `}</style>
    </div>
  );
}
