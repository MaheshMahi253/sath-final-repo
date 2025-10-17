export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>BridgeConnect</h4>
          <p>
            Connecting Urban/NRI kids with Rural kids through guided virtual
            interactions — fostering empathy and confidence.
          </p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            Email:{" "}
            <a href="mailto:info@bridgeconnect.com">info@bridgeconnect.com</a>
          </p>
          <p>Phone: +91 9876543210</p>
          <p>Address: Bengaluru, India</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="socials">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" aria-label="Twitter" className="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14.861A4.48 4.48 0 0022.337.36a9.016 9.016 0 01-2.828 1.08A4.515 4.515 0 0016.616 0c-2.515 0-4.552 2.037-4.552 4.548 0 .356.042.703.118 1.036A12.845 12.845 0 013 1.671a4.542 4.542 0 001.404 6.07 4.465 4.465 0 01-2.06-.568v.058c0 2.198 1.564 4.03 3.637 4.445a4.52 4.52 0 01-2.054.078 4.554 4.554 0 004.247 3.157A9.043 9.043 0 010 19.54 12.78 12.78 0 006.918 21c8.293 0 12.827-6.874 12.827-12.835 0-.196-.005-.392-.014-.587A9.183 9.183 0 0023 3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.413a4.92 4.92 0 011.794 1.17 4.92 4.92 0 011.17 1.794c.173.457.357 1.257.413 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.413 2.427a4.916 4.916 0 01-1.17 1.794 4.918 4.918 0 01-1.794 1.17c-.457.173-1.257.357-2.427.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.413a4.918 4.918 0 01-1.794-1.17 4.916 4.916 0 01-1.17-1.794c-.173-.457-.357-1.257-.413-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.413-2.427a4.918 4.918 0 011.17-1.794 4.916 4.916 0 011.794-1.17c.457-.173 1.257-.357 2.427-.413C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.012 7.052.07 5.77.128 4.756.312 4.042.57a6.916 6.916 0 00-2.512 1.633A6.916 6.916 0 00.57 4.042c-.258.714-.442 1.728-.5 3.01C0 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.282.242 2.296.5 3.01a6.912 6.912 0 001.633 2.512 6.912 6.912 0 002.512 1.633c.714.258 1.728.442 3.01.5C8.332 24 8.736 24 12 24s3.668-.012 4.948-.07c1.282-.058 2.296-.242 3.01-.5a6.916 6.916 0 002.512-1.633 6.916 6.916 0 001.633-2.512c.258-.714.442-1.728.5-3.01C24 15.668 24 15.264 24 12s-.012-3.668-.07-4.948c-.058-1.282-.242-2.296-.5-3.01a6.916 6.916 0 00-1.633-2.512A6.916 6.916 0 0019.958.57c-.714-.258-1.728-.442-3.01-.5C15.668 0 15.264 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 11-2.879 0 1.44 1.44 0 012.879 0z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M20.447 20.452H17.39v-5.569c0-1.328-.026-3.037-1.85-3.037-1.851 0-2.134 1.445-2.134 2.938v5.668H10.26V9h2.946v1.561h.041c.411-.777 1.414-1.594 2.91-1.594 3.106 0 3.676 2.045 3.676 4.703v6.782zM5.337 7.433c-.948 0-1.718-.77-1.718-1.718s.77-1.718 1.718-1.718 1.718.77 1.718 1.718-.77 1.718-1.718 1.718zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.205 24 24 23.227 24 22.271V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 BridgeConnect. All rights reserved.
      </div>

      <style jsx>{`
        .footer {
          background-color: #2f2f2f;
          color: #f5f5f5;
          padding: 30px 20px 15px;
          text-align: center;
          flex-shrink: 0;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto 10px;
        }

        .footer-section {
          flex: 1 1 250px;
          min-width: 220px;
        }

        .footer-section h4 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #ffffff;
        }

        .footer-section p,
        .footer-section a {
          font-size: 14px;
          color: #e5e5e5;
          text-decoration: none;
          margin-bottom: 6px;
          display: block;
        }

        .footer-section a:hover {
          color: #facc15;
        }

        .socials {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 10px;
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          transition: background 0.3s ease;
        }

        .social-icon:hover {
          background: #facc15;
        }

        .social-icon svg {
          fill: white;
        }

        .social-icon:hover svg {
          fill: #2f2f2f;
        }

        .footer-bottom {
          text-align: center;
          font-size: 13px;
          color: #d1d5db;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 10px;
          margin-top: 10px;
        }

        /* Small phones (≤ 480px) */
        @media (max-width: 480px) {
          .footer-content {
            flex-direction: column;
            gap: 15px;
          }

          .footer-section h4 {
            font-size: 16px;
          }

          .footer-section p,
          .footer-section a {
            font-size: 13px;
          }

          .social-icon {
            width: 35px;
            height: 35px;
          }
        }

        /* Tablets (481px - 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 20px;
          }
        }

        /* Laptops (769px - 1200px) */
        @media (min-width: 769px) and (max-width: 1200px) {
          .footer-content {
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  );
}
