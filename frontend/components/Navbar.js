import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">BridgeConnect</h1>
      <div className="nav-links">
        <Link href="/" className="link">Home</Link>
        <Link href="/login" className="link">Login / Sign Up</Link>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 32px; /* reduce navbar height */
          background-color: #57819ecb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          color: white;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          color: white;
        }

        .nav-links {
          display: flex;
          gap: 25px; /* space between Home and Login */
        }

        .link {
          color: white; /* links in white */
          text-decoration: none;
          font-weight: 500;
        }

        .link:hover {
          text-decoration: underline;
        }

        /* Small phones (≤ 480px) */
        @media (max-width: 480px) {
          .navbar {
            flex-direction: column;
            padding: 10px 16px;
            gap: 10px;
          }

          .logo {
            font-size: 20px;
          }

          .nav-links {
            flex-direction: column;
            gap: 8px;
          }

          .link {
            font-size: 14px;
          }
        }

        /* Tablets (481px - 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .navbar {
            padding: 12px 24px;
          }

          .logo {
            font-size: 21px;
          }

          .nav-links {
            gap: 20px;
          }
        }

        /* Laptops (769px - 1200px) */
        @media (min-width: 769px) and (max-width: 1200px) {
          .navbar {
            padding: 12px 28px;
          }

          .logo {
            font-size: 22px;
          }

          .nav-links {
            gap: 22px;
          }
        }
      `}</style>
    </nav>
  );
}
