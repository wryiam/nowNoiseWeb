import React, { useEffect, useRef, useState } from 'react';
import logo from "./assets/images/nnlogo.png";
import './assets/fonts/fonts.css';
import charles from './assets/images/charles.jpg';
import will from './assets/images/will.jpg';

const ModernAnimatedSite = () => {
  const sectionsRef = useRef([]);
  const polygonContainerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      
      document.querySelector('.floating-particles')?.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000);
    };

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 800);
    for (let i = 0; i < 8; i++) {
      setTimeout(createParticle, i * 300);
    }

    // Intersection Observer for side fade-in animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    // Create moving blobs/polygons
    const createPolygon = () => {
      if (!polygonContainerRef.current) return;
      
      const polygon = document.createElement('div');
      polygon.className = 'moving-polygon';
      
      const size = Math.random() * 300 + 150;
      const left = Math.random() * 120 - 10;
      const duration = Math.random() * 25 + 15;
      const delay = Math.random() * 3;
      const opacity = Math.random() * 0.4 + 0.2;
      const rotation = Math.random() * 360;
      
      const blobTypes = [
        'polygon(30% 20%, 70% 5%, 90% 30%, 95% 60%, 80% 85%, 50% 95%, 20% 80%, 5% 50%, 10% 25%)',
        'polygon(25% 10%, 60% 0%, 85% 20%, 100% 45%, 90% 75%, 65% 95%, 35% 100%, 10% 80%, 0% 50%, 5% 20%)',
        'polygon(40% 0%, 70% 10%, 95% 35%, 100% 65%, 85% 90%, 55% 100%, 25% 95%, 0% 70%, 5% 40%, 15% 15%)',
        'polygon(20% 15%, 50% 0%, 80% 15%, 95% 40%, 90% 70%, 70% 90%, 40% 100%, 15% 85%, 0% 55%, 10% 25%)',
        'polygon(35% 5%, 65% 0%, 90% 25%, 100% 55%, 85% 80%, 60% 100%, 30% 95%, 5% 75%, 0% 45%, 15% 20%)',
      ];

      const clipPath = blobTypes[Math.floor(Math.random() * blobTypes.length)];

      polygon.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(${rotation}deg, 
          rgba(220, 220, 220, ${opacity}) 0%,
          rgba(190, 190, 190, ${opacity * 0.8}) 20%,
          rgba(160, 160, 160, ${opacity * 0.6}) 50%,
          rgba(140, 140, 140, ${opacity * 0.4}) 80%,
          rgba(120, 120, 120, ${opacity * 0.2}) 100%
        );
        clip-path: ${clipPath};
        left: ${left}%;
        top: 100vh;
        animation: float-polygon ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        transform-origin: center;
        filter: blur(2px) drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        border-radius: 50%;
      `;
            
      polygonContainerRef.current.appendChild(polygon);
      
      setTimeout(() => {
        if (polygon.parentNode) {
          polygon.parentNode.removeChild(polygon);
        }
      }, (duration + delay) * 1000);
    };

    const polygonInterval = setInterval(createPolygon, 100);

    for (let i = 0; i < 8; i++) {
      setTimeout(createPolygon, i * 50);
    }

    return () => {
      clearInterval(polygonInterval);
      clearInterval(particleInterval);
      observer.disconnect();
    };
  }, []);

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const handleEmailSubmit = () => {
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hero-tagline {
          font-family: 'SoraItalic';
          font-weight: 100;
          font-size: 3.7vw;
          margin-left: 6px;
          opacity: 0;
          animation: fadeInUp 1.5s ease-out 1s forwards;
        }

        .logotag {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        body {
          font-family: 'Sora', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(180deg, 
            #010111ff 50%, 
            #06061dff 80%);
          background-attachment: fixed;
          color: #e0e6ff;
          min-height: 100vh;
          overflow-x: hidden;
          line-height: 1.7;
          position: relative;
        }

        .bg-polygons {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -2;
          overflow: hidden;
        }

        .floating-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -1;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: rgba(80, 80, 80, 0.3);
          border-radius: 50%;
          animation: float-particle linear infinite;
        }

        @keyframes float-particle {
          0% {
            opacity: 0;
            transform: translateY(100vh) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
          }
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .interactive-hover {
          transition: all 0.3s ease;
        }

        .interactive-hover:hover {
          transform: translateY(-2px);
          text-shadow: 0 5px 15px rgba(255, 255, 255, 0.4);
        }
        
        .blur-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          backdrop-filter: blur(30px);
          z-index: -1;
          pointer-events: none;
        }

        @keyframes float-polygon {
          0% {
            top: 100vh;
            transform: translateX(0px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          25% {
            transform: translateX(-30px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translateX(20px) rotate(180deg) scale(1.3);
          }
          75% {
            transform: translateX(-10px) rotate(270deg) scale(1.1);
          }
          95% {
            opacity: 1;
          }
          100% {
            top: -300px;
            transform: translateX(40px) rotate(360deg) scale(0.7);
            opacity: 0;
          }
        }

        /* Fullscreen Logo Section */
        .fullscreen-hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .fullscreen-logo-container {
          text-align: center;
          animation: logoEntrance 2s ease-out forwards;
          opacity: 0;
        }

        .main-logo {
          width: 15vw;
          min-width: 200px;
          max-width: 400px;
          height: auto;
          margin-bottom: 2rem;
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.3));
        }

        .hero-title {
          font-family: 'SyncopateBold', sans-serif;
          font-weight: 200;
          background: linear-gradient(135deg, #ffffff 0%, #e0e6ff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.06em;
          font-size: 5.5vw;
          max-font-size: 120px;
          min-font-size: 40px;
          margin-bottom: 0rem;
          text-shadow: 0 0 50px rgba(255,255,255,0.2);
          opacity: 0;
          animation: fadeInUp 1.5s ease-out 0.5s forwards;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          animation: fadeInUp 1.5s ease-out 2s forwards, bounce 2s ease-in-out 3s infinite;
          color: rgba(255,255,255,0.6);
          text-align: center;
          cursor: pointer;
        }

        .scroll-arrow {
          font-size: 2rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        /* Content Sections */
        .section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          opacity: 0;
          transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .section:nth-child(even) {
          transform: translateX(-100px);
        }

        .section:nth-child(odd) {
          transform: translateX(100px);
        }

        .section.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .container {
          max-width: 1400px;
          width: 100%;
        }

        .content-section {
          text-align: center;
          background: rgba(255,255,255,0.08);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 80px 60px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }

        .content-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }

        .developers-section {
          text-align: center;
          padding: 120px 20px;
        }

        .developers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 80px;
          margin-top: 100px;
        }

        .developer-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          border-radius: 32px;
          padding: 60px 40px;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }

        .developer-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .developer-card:hover {
          transform: translateY(-15px) scale(1.02);
          background: linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 100%);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }

        .developer-card:hover::before {
          left: 100%;
        }

        .developer-photo {
          width: 220px;
          height: 220px;
          background: linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 50%;
          margin: 0 auto 40px;
          border: 4px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          color: rgba(255,255,255,0.7);
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .developer-card:hover .developer-photo {
          transform: scale(1.05);
          border-color: rgba(255,255,255,0.5);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .developer-photo::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .developer-card:hover .developer-photo::after {
          opacity: 1;
        }

        .developer-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: all 0.6s ease;
        }

        .developer-card:hover .developer-photo img {
          transform: scale(1.1);
        }

        .developer-name {
          font-family: 'Sora', sans-serif;
          font-size: 2.4rem;
          font-weight: 400;
          margin-bottom: 20px;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          letter-spacing: -0.01em;
        }

        .developer-role {
          font-family: 'Sora', sans-serif;
          font-size: 1.4rem;
          color: #a5b4fc;
          margin-bottom: 35px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .developer-bio {
          font-family: 'Sora', sans-serif;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #e0e6ff;
          text-align: center;
          max-width: 400px;
          margin: 0 auto;
          font-weight: 300;
        }

        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
          text-align: center;
          margin-bottom: 60px;
          color: #fff;
          letter-spacing: -0.02em;
          text-shadow: 0 0 30px rgba(255,255,255,0.2);
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: pulse-line 2s ease-in-out infinite;
        }

        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleX(1.2); }
        }

        .app-demo {
          background: rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 80px 60px;
          border: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .app-mockup {
          width: 300px;
          height: 600px;
          background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 30px;
          margin: 40px auto;
          border: 2px solid rgba(255,255,255,0.2);
          position: relative;
          overflow: hidden;
        }

        .app-mockup::before {
          content: 'nowNoise App';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255,255,255,0.6);
          font-size: 1.2rem;
          font-weight: 300;
        }

        .email-form {
          max-width: 500px;
          margin: 0 auto;
        }

        .email-input {
          width: 100%;
          padding: 18px 24px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          color: #fff;
          font-size: 1rem;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .email-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.15);
        }

        .email-input::placeholder {
          color: rgba(255,255,255,0.6);
        }

        .submit-button {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.25) 100%);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50px;
          color: #fff;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .submit-button:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.35) 100%);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .success-message {
          color: #4ade80;
          font-size: 1.1rem;
          margin-top: 20px;
          padding: 20px;
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 12px;
        }

        .description-text {
          font-family: 'Sora', sans-serif;
          font-size: 1.2rem;
          line-height: 1.9;
          color: #c7d2fe;
          max-width: 800px;
          margin: 0 auto 40px;
          font-weight: 300;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
        }

        @media (max-width: 1200px) {
          .developers-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
        }

        @media (max-width: 768px) {
          .main-logo {
            width: 40vw;
          }

          .hero-title {
            font-size: 12vw;
          }

          .hero-tagline {
            font-size: 6vw;
          }

          .section {
            padding: 60px 20px;
            min-height: auto;
          }

          .developers-section {
            padding: 80px 20px;
          }

          .content-section, .app-demo {
            padding: 60px 40px;
          }
          
          .developers-grid {
            grid-template-columns: 1fr;
            gap: 50px;
            margin-top: 60px;
          }
          
          .developer-card {
            padding: 50px 30px;
          }

          .developer-photo {
            width: 180px;
            height: 180px;
          }

          .developer-name {
            font-size: 2rem;
          }

          .developer-role {
            font-size: 1.2rem;
          }

          .app-mockup {
            width: 250px;
            height: 500px;
          }
        }

        @media (max-width: 480px) {
          .content-section, .app-demo {
            padding: 40px 30px;
          }
          
          .developer-card {
            padding: 40px 25px;
          }

          .developer-photo {
            width: 160px;
            height: 160px;
          }

          .developer-name {
            font-size: 1.8rem;
          }

          .app-mockup {
            width: 200px;
            height: 400px;
          }

          .hero-tagline {
            font-size: 8vw;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div className="bg-polygons" ref={polygonContainerRef}></div>
      <div className="floating-particles"></div>
      <div className="blur-overlay"></div>

      {/* Fullscreen Logo Hero Section */}
      <section className="fullscreen-hero">
        <div className="fullscreen-logo-container">
          <img src={logo} className="main-logo" alt="nowNoise Logo" />
          <div className="logotag">
            <h1 className="hero-title">nowNoise</h1>
            <h2 className="hero-tagline interactive-hover">your song, in a day</h2>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="section developers-section" ref={addSectionRef}>
        <div className="container">
          <h2 className="section-title text-glow">meet our founders</h2>
          <div className="developers-grid">
            <div className="developer-card">
              <div className="developer-photo">
                <img src={will} alt="William Costales" />
              </div>
              <h3 className="developer-name interactive-hover">william costales</h3>
              <p className="developer-role">Co-Founder & Lead Developer</p>
              <p className="developer-bio">
                With a strong background as a computer scientist and AI student partner at university, Will brings technical excellence and innovative problem-solving to nowNoise's development team.
              </p>
            </div>
            <div className="developer-card">
              <div className="developer-photo">
                <img src={charles} alt="Charlie Poumblaum" />
              </div>
              <h3 className="developer-name interactive-hover">charlie poumblaum</h3>
              <p className="developer-role">Co-Founder & Creative Director</p>
              <p className="developer-bio">
                A classically trained musician turned tech entrepreneur, Charlie bridges the gap between artistry and innovation. His background in music production and AI research drives nowNoise's mission to democratize music creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Demo Section */}
      <section className="section" ref={addSectionRef}>
        <div className="container">
          <div className="app-demo">
            <h2 className="section-title text-glow">experiencing nowNoise</h2>
            <p className="description-text interactive-hover">
              nowNoise lets you experience sound in real time — expressive, emotional, and always evolving.
            </p>
            <div className="app-mockup">
              {/* This would contain your actual app demo or screenshots */}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '50px'}}>
              <div className="interactive-hover" style={{textAlign: 'center', padding: '25px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontSize: '3rem', marginBottom: '15px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'}}>🎵</div>
                <h4 style={{color: '#fff', marginBottom: '8px', fontFamily: 'Sora', fontWeight: '500'}}>Upload Your Idea</h4>
                <p style={{color: '#c7d2fe', fontSize: '0.9rem', fontFamily: 'Sora'}}>Hum, sing, or describe</p>
              </div>
              <div className="interactive-hover" style={{textAlign: 'center', padding: '25px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontSize: '3rem', marginBottom: '15px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'}}>🤖</div>
                <h4 style={{color: '#fff', marginBottom: '8px', fontFamily: 'Sora', fontWeight: '500'}}>AI Magic</h4>
                <p style={{color: '#c7d2fe', fontSize: '0.9rem', fontFamily: 'Sora'}}>We create and produce</p>
              </div>
              <div className="interactive-hover" style={{textAlign: 'center', padding: '25px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontSize: '3rem', marginBottom: '15px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'}}>🎧</div>
                <h4 style={{color: '#fff', marginBottom: '8px', fontFamily: 'Sora', fontWeight: '500'}}>Your Song</h4>
                <p style={{color: '#c7d2fe', fontSize: '0.9rem', fontFamily: 'Sora'}}>Ready in 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section" ref={addSectionRef}>
        <div className="container">
          <div className="content-section">
            <h2 className="section-title text-glow">Our Vision</h2>
            <p className="description-text interactive-hover">
              Music creation shouldn't be limited by technical barriers or expensive equipment. 
              We believe everyone has a song inside them waiting to be heard. nowNoise harnesses 
              the power of AI to transform your ideas into professional-quality music in just one day.
            </p>
            <p className="description-text interactive-hover">
              Whether you're humming a melody, have lyrics scribbled on a napkin, or just an emotional 
              concept you want to express, our platform turns your creative spark into a complete musical experience.
            </p>
          </div>
        </div>
      </section>

      {/* Email List Section */}
      <section className="section" ref={addSectionRef}>
        <div className="container">
          <div className="content-section">
            <h2 className="section-title text-glow">Join the Waitlist</h2>
            <p className="description-text interactive-hover">
              Be among the first to experience the future of music creation. 
              Get early access and exclusive updates about nowNoise.
            </p>
            {!isSubmitted ? (
              <div className="email-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  style={{fontFamily: 'Sora'}}
                />
                <button 
                  onClick={handleEmailSubmit} 
                  className="submit-button interactive-hover"
                  style={{fontFamily: 'Sora', fontWeight: '500'}}
                >
                  Join Waitlist
                </button>
              </div>
            ) : (
              <div className="success-message" style={{fontFamily: 'Sora'}}>
                🎉 Thank you! You're now on our waitlist. We'll be in touch soon with exciting updates about nowNoise!
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ModernAnimatedSite;