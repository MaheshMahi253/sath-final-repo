import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Navbar />

      <section className="home-section">
        <h2>BridgeConnect</h2>
        <p>Connect Urban/NRI kids with Rural kids in India through guided virtual interactions.</p>
        <div className="about-box">
          <h3>About BridgeConnect</h3>
          <p>BridgeConnect bridges the gap between Urban/NRI and Rural kids in India.</p>
          <p>Quick, simple, and safe peer-to-peer connections to grow together through guided virtual interactions and educational sessions.</p>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .container { min-height: 100vh; display: flex; flex-direction: column; }
        .home-section { text-align: center; padding: 80px 20px 40px; background-color: #f9fafb; flex: 1; }
        .home-section h2 { font-size: 40px; color: #1e40af; margin-bottom: 16px; }
        .home-section p { color: #374151; max-width: 700px; margin: 0 auto 24px; }
        .about-box { max-width: 700px; margin: 0 auto; padding: 24px; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .about-box h3 { font-size: 24px; margin-bottom: 12px; }
      `}</style>
    </div>
  );
}
