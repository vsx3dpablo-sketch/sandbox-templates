import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "Services", "Studio", "Process", "Contact"];

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-sans antialiased bg-[#080808] text-white min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Outfit:wght@200;300;400;500&display=swap');

        :root {
          --deep-black: #080808;
          --dark-gray: #111111;
          --mid-gray: #1a1a1a;
          --border-subtle: rgba(255,255,255,0.08);
          --border-medium: rgba(255,255,255,0.15);
          --text-muted: rgba(255,255,255,0.4);
          --text-secondary: rgba(255,255,255,0.65);
          --accent-white: #ffffff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--deep-black); }

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Outfit', sans-serif; }

        /* NAV */
        .nav-base {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 2.5rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.5s ease, border-bottom 0.5s ease;
        }
        .nav-scrolled {
          background: rgba(8,8,8,0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 0.5px solid var(--border-subtle);
        }
        .nav-transparent { background: transparent; border-bottom: 0.5px solid transparent; }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: white;
          text-decoration: none;
        }
        .nav-logo span { font-style: italic; font-weight: 300; }

        .nav-links { display: flex; align-items: center; gap: 2.5rem; }
        .nav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.25s ease;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0; right: 100%;
          height: 0.5px;
          background: white;
          transition: right 0.3s ease;
        }
        .nav-link:hover { color: white; }
        .nav-link:hover::after { right: 0; }

        .nav-cta {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: white;
          border: 0.5px solid var(--border-medium);
          padding: 0.55rem 1.4rem;
          text-decoration: none;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .nav-cta:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.35);
        }

        /* HERO */
        .hero-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 700px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
          filter: grayscale(60%);
        }

        /* Gradient overlay */
        .overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(8,8,8,0.65) 0%, rgba(8,8,8,0.2) 50%, rgba(8,8,8,0.85) 100%),
            linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 50%, rgba(8,8,8,0.5) 100%);
        }

        /* Grain texture overlay */
        .grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        /* HERO CONTENT */
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 2rem;
          max-width: 1100px;
        }

        .hero-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.68rem;
          font-weight: 300;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 2.2rem;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 0.9s ease 0.3s forwards;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.01em;
          color: white;
          margin-bottom: 0.15em;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 1s ease 0.5s forwards;
        }
        .hero-title em {
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.75);
        }

        .hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3.5vw, 3.2rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.02em;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(15px);
          animation: fadeUp 1s ease 0.75s forwards;
        }

        .hero-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 1.8;
          color: var(--text-secondary);
          max-width: 480px;
          margin: 0 auto 3.5rem;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 1s ease 1s forwards;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 1s ease 1.2s forwards;
        }

        .btn-primary {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #080808;
          background: white;
          padding: 1rem 2.5rem;
          text-decoration: none;
          display: inline-block;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .btn-primary:hover { background: rgba(255,255,255,0.88); }

        .btn-ghost {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.25s ease;
        }
        .btn-ghost:hover { color: white; }
        .btn-ghost-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .btn-ghost:hover .btn-ghost-arrow { transform: translateX(4px); }

        /* SCROLL INDICATOR */
        .scroll-indicator {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          opacity: 0;
          animation: fadeUp 1s ease 1.8s forwards;
        }
        .scroll-line {
          width: 0.5px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.4));
          animation: scrollPulse 2.4s ease-in-out 2.5s infinite;
        }
        .scroll-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* DECORATIVE LINES */
        .deco-left, .deco-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          opacity: 0;
          animation: fadeIn 1.5s ease 1.5s forwards;
        }
        .deco-left { left: 2.5rem; }
        .deco-right { right: 2.5rem; }
        .deco-text {
          font-family: 'Outfit', sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-muted);
          writing-mode: vertical-rl;
        }

        /* MOBILE MENU */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          flex-direction: column;
          gap: 5px;
        }
        .hamburger-line {
          width: 22px;
          height: 0.5px;
          background: rgba(255,255,255,0.7);
          transition: all 0.3s ease;
          display: block;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(8,8,8,0.97);
          z-index: 200;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-close {
          position: absolute;
          top: 1.5rem; right: 2rem;
          background: none; border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .mobile-nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: white;
          text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: rgba(255,255,255,0.5); }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .mobile-menu-btn { display: flex; }
          .deco-left, .deco-right { display: none; }
          .hero-actions { flex-direction: column; gap: 1rem; }
        }
      `}</style>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
          Close ✕
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            {link}
          </a>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`nav-base ${scrolled ? "nav-scrolled" : "nav-transparent"}`}>
        <a href="#" className="nav-logo">
          The Render<span>Pros</span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.slice(0, -1).map((link) => (
            <a key={link} href="#" className="nav-link">{link}</a>
          ))}
        </div>
        <a href="#" className="nav-cta">Start a Project</a>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" style={{ width: "14px" }} />
        </button>
      </nav>

      {/* Hero */}
      <section className="hero-container">
        {/* Video background — using a placeholder; swap src for your real video */}
        <video
          ref={videoRef}
          className="video-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80&auto=format"
        >
          {/* Replace with your actual video source */}
          {/* <source src="/your-reel.mp4" type="video/mp4" /> */}
        </video>

        <div className="overlay" />
        <div className="grain" />

        {/* Side decorative text */}
        <div className="deco-left">
          <span className="deco-text">Architecture · Visualization</span>
        </div>
        <div className="deco-right">
          <span className="deco-text">Est. MMXIX · Buenos Aires</span>
        </div>

        {/* Main content */}
        <div className="hero-content">
          <p className="hero-label">Award-Winning Architectural Visualization</p>

          <h1 className="hero-title">
            We Render<br /><em>the Impossible</em>
          </h1>

          <p className="hero-subtitle">
            Into something breathtaking.
          </p>

          <p className="hero-desc">
            Photorealistic 3D renders and animations that transform your architectural vision into
            compelling visual narratives. From concept to final delivery.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn-primary">View Our Work</a>
            <a href="#" className="btn-ghost">
              Our Process <span className="btn-ghost-arrow">→</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Below-fold teaser */}
      <section style={{
        background: "#0d0d0d",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        padding: "5rem 2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4rem",
        flexWrap: "wrap"
      }}>
        {[
          { num: "340+", label: "Projects Delivered" },
          { num: "18", label: "Countries Served" },
          { num: "12", label: "Years of Excellence" },
          { num: "99%", label: "Client Satisfaction" },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3rem",
              fontWeight: 300,
              color: "white",
              lineHeight: 1
            }}>{num}</p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 300,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginTop: "0.6rem"
            }}>{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
