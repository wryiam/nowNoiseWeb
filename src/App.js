import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Play, Users, Heart, Sparkles, Music, Zap, Globe } from 'lucide-react';

// Import your assets
import logo from "./assets/images/nnlogo.png";
import './assets/fonts/fonts.css';
import charles from './assets/images/charles.jpg';
import will from './assets/images/will.jpg';
import ss1 from './assets/images/ss1.png';
import ss2 from './assets/images/ss2.png';
import ss3 from './assets/images/ss3.png';
import record from './assets/images/records.jpeg';
import cds from './assets/images/cds.jpg';
import cass from './assets/images/cass.jpg';
import shop from './assets/images/shop.jpg';


const ModernAnimatedSite = () => {
  const sectionsRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const screenshots = [ss1, ss2, ss3];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % screenshots.length);
    }, 4000);
    
    return () => clearInterval(slideInterval);
  }, [screenshots.length]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="showcase-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        .showcase-container {
          position: relative;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.1) 0%, transparent 50%),
                      linear-gradient(180deg, #010111ff 0%, #06061dff 100%);
          min-height: 100vh;
        }

        .floating-cursor {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          transition: transform 0.1s ease-out;
          transform: translate(-50%, -50%);
        }

        .hero-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .hero-content {
          text-align: center;
          z-index: 10;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        .logotag {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: logoEntrance 2s ease-out forwards;
          opacity: 0;
          margin-bottom: 2rem;
        }

        .main-logo {
          width: clamp(180px, 15vw, 300px);
          height: auto;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.3));
        }

        .hero-title {
          font-family: 'SyncopateBold', sans-serif;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #e0e6ff 50%, #a855f7 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.06em;
          font-size: clamp(2.5rem, 8vw, 6rem);
          margin-bottom: 0.5rem;
          text-shadow: 0 0 50px rgba(255,255,255,0.2);
          opacity: 0;
          animation: fadeInUp 1.5s ease-out 0.5s forwards;
        }

        .hero-tagline {
          font-family: 'SoraItalic';
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.2rem, 4vw, 2.5rem);
          opacity: 0;
          color: rgba(255, 255, 255, 0.8);
          animation: fadeInUp 1.5s ease-out 1s forwards;
          margin-bottom: 2rem;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeInUp 1.5s ease-out 1.5s forwards;
        }

        .cta-primary, .cta-secondary {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
          text-decoration: none;
          border: none;
        }

        .cta-primary {
          background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
          color: #fff;
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.4);
        }

        .cta-secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          backdrop-filter: blur(20px);
        }

        .cta-secondary:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          animation: fadeInUp 1.5s ease-out 2s forwards, bounce 2s ease-in-out 3s infinite;
          color: rgba(255,255,255,0.6);
          text-align: center;
          cursor: pointer;
        }

        .bg-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          z-index: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        /* Enhanced App Showcase Section */
        .showcase-section {
          padding: clamp(60px, 8vw, 120px) 20px;
          position: relative;
          z-index: 5;
          opacity: 0;
          transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(50px);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .showcase-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .section-container {
          max-width: 5000px;
          margin: 0 auto;
          width: 100%;
        }

        /* Centered App Showcase Layout */
        .showcase-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: clamp(40px, 8vw, 80px);
          align-items: center;
          min-height: 600px;
          font-family: 'Sora';
          padding-left: 20px;
        }

        .showcase-content {
          z-index: 10;
        }

        .showcase-title {
          font-family : 'Sora';
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300;
          background: linear-gradient(135deg, #dbbadaff 0%, #a855f7 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .showcase-description {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .feature-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #a855f7, #06b6d4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(168, 85, 247, 0.5);
          transform: translateX(8px);
        }

        .feature-item:hover::before {
          opacity: 1;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-text h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .feature-text p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Enhanced Phone Showcase */
        .phone-showcase {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          perspective: 1000px;
          
        }

        .phone-container {
          position: relative;
          width: clamp(250px, 30vw, 320px);
          height: clamp(500px, 60vw, 640px);
          transform: rotateY(-15deg) rotateX(10deg);
          transition: transform 0.5s ease;
          
        }

        .phone-container:hover {
          transform: rotateY(-10deg) rotateX(5deg) scale(1.02);
        }

        .phone-frame {
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #1a1a1a 0%, #0d1117 100%);
          border-radius: clamp(30px, 5vw, 40px);
          padding: clamp(6px, 1vw, 8px);
          box-shadow: 
            0 0 0 2px #2d3748,
            0 30px 60px rgba(0, 0, 0, 0.8),
            inset 0 2px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: clamp(24px, 4vw, 32px);
          overflow: hidden;
          position: relative;
          padding-top: clamp(20px, 3vw, 30px);
        }

        .phone-notch {
          position: absolute;
          top: clamp(15px, 2vw, 20px);
          left: 50%;
          transform: translateX(-50%);
          width: clamp(30px, 4vw, 40px);
          height: 3px;
          background: #333;
          border-radius: 2px;
          z-index: 10;
        }

        /* Mission Section Styles */
.mission-section {
  padding: clamp(80px, 10vw, 140px) 20px;
  position: relative;
  z-index: 5;
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(50px);
  background: linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%);
}

.mission-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(60px, 10vw, 100px);
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Replace the existing .algorithm-visualization styles with this: */

.algorithm-visualization {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.photo-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
  width: 300px;
  height: 320px;
  
}

.photo-item:nth-child(2) {
  position: relative;
  width: 280px;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}



.photo-item:nth-child(1) {
  position: relative;
  width: 410px;
  height: 270px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}
  .photo-item:nth-child(3) {
  position: relative;
  width: 410px;
  height: 290px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-item:hover {
  transform: scale(1.05);
  z-index: 10;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(168, 85, 247, 0.3);
}

.photo-item:hover img {
  transform: scale(1.1);
}

/* Positioning for corner overlaps */
.photo-item:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  align-self: end;
  margin-right: 30px;
  margin-bottom: -20px;
  z-index: 3;
}
/* Enhanced Responsive Photo Grid Styles */

.algorithm-visualization {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.photo-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
  width: 300px;
  height: 320px;
}

/* Base photo item styles */
.photo-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Default desktop sizes - overlapping artistic layout */
.photo-item:nth-child(1) {
  width: 410px;
  height: 270px;
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  align-self: end;
  margin-right: 30px;
  margin-bottom: -20px;
  z-index: 3;
}

.photo-item:nth-child(2) {
  width: 280px;
  height: 240px;
  grid-column: 2;
  grid-row: 1;
  justify-self: start;
  align-self: end;
  margin-left: -80px;
  margin-bottom: 20px;
  z-index: 2;
}

.photo-item:nth-child(3) {
  width: 410px;
  height: 290px;
  grid-column: 1 / -1;
  grid-row: 2;
  justify-self: center;
  align-self: start;
  margin-top: -40px;
  margin-right: -120px;
  z-index: 5;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-item:hover {
  transform: scale(1.05);
  z-index: 10;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(168, 85, 247, 0.3);
}

.photo-item:hover img {
  transform: scale(1.1);
}

/* Gradient overlays for depth */
.photo-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.photo-item:hover::before {
  opacity: 1;
}

/* Tablet and below - Switch to uniform grid layout */
@media (max-width: 768px) {
  .algorithm-visualization {
    height: 320px;
    padding: 1rem;
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 12px;
    width: 100%;
    max-width: 360px;
    height: 200px;
  }

  /* Reset all photos to uniform size and positioning */
  .photo-item:nth-child(1),
  .photo-item:nth-child(2),
  .photo-item:nth-child(3) {
    width: 100%;
    height: 100%;
    grid-column: auto;
    grid-row: 1;
    justify-self: stretch;
    align-self: stretch;
    margin: 0;
    z-index: 1;
    border-radius: 8px;
  }

  .photo-item:nth-child(1) {
    grid-column: 1;
  }

  .photo-item:nth-child(2) {
    grid-column: 2;
  }

  .photo-item:nth-child(3) {
    grid-column: 3;
  }

  /* Subtle hover effect for mobile */
  .photo-item:hover {
    transform: translateY(-4px);
    z-index: 2;
  }

  .photo-item:hover img {
    transform: scale(1.05);
  }
}

/* Small mobile - Stack vertically */
@media (max-width: 480px) {
  .algorithm-visualization {
    height: 280px;
    padding: 0.5rem;
  }

  .photo-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 200px;
    height: 240px;
  }

  /* All photos become uniform rectangles */
  .photo-item:nth-child(1),
  .photo-item:nth-child(2),
  .photo-item:nth-child(3) {
    width: 100%;
    height: 72px;
    flex: 1;
    grid-column: auto;
    grid-row: auto;
    justify-self: stretch;
    align-self: stretch;
    margin: 0;
    z-index: 1;
    border-radius: 6px;
  }

  /* Minimal hover effect */
  .photo-item:hover {
    transform: scale(1.02);
  }

  .photo-item:hover img {
    transform: scale(1.02);
  }
}

/* Extra small screens - Compact vertical stack */
@media (max-width: 360px) {
  .algorithm-visualization {
    height: 240px;
    padding: 0.25rem;
  }

  .photo-grid {
    gap: 6px;
    max-width: 180px;
    height: 200px;
  }

  .photo-item:nth-child(1),
  .photo-item:nth-child(2),
  .photo-item:nth-child(3) {
    height: 60px;
    border-radius: 4px;
  }

  /* No hover effects on very small screens */
  .photo-item:hover {
    transform: none;
  }

  .photo-item:hover img {
    transform: none;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .photo-item {
    transition: transform 0.2s ease;
  }
  
  .photo-item:active {
    transform: scale(0.98);
  }
}
.photo-item:nth-child(2) {
  grid-column: 2;
  grid-row: 1;
  justify-self: start;
  align-self: end;
  margin-left: -80px;
  margin-bottom: 20px;
  z-index: 2;
}

.photo-item:nth-child(3) {
  grid-column: 1 / -1;
  grid-row: 2;
  justify-self: center;
  align-self: start;
  margin-top: -40px;
  margin-right: -120px;
  z-index: 5;
}

/* Subtle gradient overlays for depth */
.photo-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.photo-item:hover::before {
  opacity: 1;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .photo-grid {
    width: 250px;
    height: 270px;
  }

  .photo-item {
    width: 110px;
    height: 140px;
  }

  .photo-item:nth-child(1) {
    margin-right: -15px;
    margin-bottom: -15px;
  }

  .photo-item:nth-child(2) {
    margin-left: -15px;
    margin-bottom: -8px;
  }

  .photo-item:nth-child(3) {
    margin-top: -8px;
  }
}

@media (max-width: 480px) {
  .photo-grid {
    width: 200px;
    height: 220px;
  }

  .photo-item {
    width: 90px;
    height: 115px;
  }

  .photo-item:nth-child(1) {
    margin-right: -12px;
    margin-bottom: -12px;
  }

  .photo-item:nth-child(2) {
    margin-left: -12px;
    margin-bottom: -6px;
  }

  .photo-item:nth-child(3) {
    margin-top: -6px;
  }
}

.mission-content {
  font-family: 'Sora';
}

.mission-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  background: linear-gradient(135deg, #ffffff 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.mission-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.mission-points {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mission-point {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.mission-point::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.5) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.mission-point:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(168, 85, 247, 0.3);
  transform: translateY(-4px);
}

.mission-point:hover::before {
  transform: translateX(100%);
}

.point-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #a855f7;
}

.point-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.point-content p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* Newsletter Section Styles */
.newsletter-section {
  padding: clamp(80px, 10vw, 140px) 20px;
  position: relative;
  z-index: 5;
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(50px);
  background: linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.03) 100%);
  overflow: hidden;
}

.newsletter-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.newsletter-content {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: clamp(40px, 8vw, 80px);
  align-items: center;
}

.newsletter-visual {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vinyl-record {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 50%;
  position: relative;
  animation: vinylSpin 8s linear infinite;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.vinyl-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
  border-radius: 50%;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}

.vinyl-groove {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.vinyl-groove-1 {
  width: 120px;
  height: 120px;
}

.vinyl-groove-2 {
  width: 150px;
  height: 150px;
}

.vinyl-groove-3 {
  width: 180px;
  height: 180px;
}

.sound-waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(168, 85, 247, 0.3);
  border-radius: 50%;
  animation: waveExpand 3s ease-out infinite;
}

.wave-1 { animation-delay: 0s; }
.wave-2 { animation-delay: 0.6s; }
.wave-3 { animation-delay: 1.2s; }
.wave-4 { animation-delay: 1.8s; }
.wave-5 { animation-delay: 2.4s; }

.newsletter-form-container {
  font-family: 'Sora';
}

.newsletter-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  background: linear-gradient(135deg, #ffffff 0%, #06b6d4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.newsletter-description {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.newsletter-form {
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  gap: 0;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 60px;
  padding: 4px;
  transition: all 0.3s ease;
}

.form-group:focus-within {
  border-color: rgba(168, 85, 247, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.2);
}

.email-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 1rem 1.5rem;
  color: #fff;
  font-size: 1rem;
  border-radius: 60px;
}

.email-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.submit-btn {
  background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
  border: none;
  padding: 1rem 2rem;
  border-radius: 56px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(168, 85, 247, 0.4);
}

.form-disclaimer {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.newsletter-benefits {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.benefit svg {
  color: #a855f7;
}

/* Enhanced Animations */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px) rotate(-1deg); }
  75% { transform: translateX(2px) rotate(1deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes lineFlow {
  0% { opacity: 0; transform: translateX(-100%); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateX(100%); }
}

@keyframes vinylSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes waveExpand {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .mission-grid, .newsletter-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .mission-content {
    order: 2;
  }

  .algorithm-visualization, .newsletter-visual {
    order: 1;
    margin-bottom: 2rem;
  }

  .algorithm-visualization {
    height: 250px;
    flex-direction: column;
    gap: 1rem;
  }

  .algo-box {
    width: 100px;
    height: 100px;
  }

  .algo-vs {
    position: static;
    transform: none;
    margin: 1rem 0;
  }

  .connection-lines {
    display: none;
  }

  .newsletter-benefits {
    justify-content: center;
    gap: 1rem;
  }

  .form-group {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 20px;
  }

  .submit-btn {
    border-radius: 16px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .mission-section,
  .newsletter-section {
    padding: clamp(60px, 15vw, 100px) 15px;
  }

  .mission-point {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .point-icon {
    margin: 0 auto;
  }

  .vinyl-record {
    width: 120px;
    height: 120px;
  }

  .sound-waves {
    width: 200px;
    height: 200px;
  }

  .newsletter-benefits {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
}

        .screen-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .screen-slide.active {
          opacity: 1;
        }

        .screen-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: clamp(20px, 3vw, 27px);
        }

        /* Enhanced Floating Elements */
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: clamp(12px, 2vw, 16px);
          animation: float 6s ease-in-out infinite;
          font-size: clamp(12px, 1.5vw, 14px);
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .floating-card-1 {
          top: 10%;
          right: clamp(-30px, -5vw, -50px);
          animation-delay: 0s;
        }

        .floating-card-2 {
          bottom: 20%;
          left: clamp(-50px, -8vw, -80px);
          animation-delay: 2s;
        }

        .floating-card-3 {
          top: 50%;
          right: clamp(-40px, -6vw, -60px);
          animation-delay: 4s;
        }

    

        /* Animations */
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        /* Mobile-First Responsive Design */
        @media (max-width: 768px) {
          .hero-section {
            height: auto;
            min-height: 100vh;
            padding: 40px 20px;
          }

          .showcase-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
            padding-left: 0px;
          }

          .showcase-content {
            order: 2;
          }

          .phone-showcase {
            order: 1;
            margin-bottom: 2rem;
          }

          .phone-container {
            transform: none;
            width: clamp(220px, 50vw, 280px);
            height: clamp(440px, 100vw, 560px);
          }

          .phone-container:hover {
            transform: scale(1.02);
          }

          .floating-card {
            display: none;
          }

          .hero-cta {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
            max-width: 280px;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .showcase-section,
          .vision-section,
          .team-section {
            padding: clamp(60px, 15vw, 100px) 15px;
          }

          .hero-section {
            padding: 30px 15px;
          }

          .phone-container {
            width: clamp(200px, 60vw, 260px);
            height: clamp(400px, 120vw, 520px);
          }

          .feature-item {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .feature-icon {
            margin: 0 auto;
          }
        }

        /* Large screens optimization */
        @media (min-width: 1400px) {
          .section-container {
            max-width: 1400px;
          }

          .showcase-grid {
            gap: 100px;
            padding-left: 0px;
          }

          .phone-container {
            width: 350px;
            height: 700px;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .floating-cursor {
            display: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .showcase-container {
            background: #000;
          }

          .feature-item,
          .pillar-card,
          .team-card {
            border-color: rgba(255, 255, 255, 0.5);
          }
        }
      `}</style>

      {/* Floating cursor effect */}
      <div 
        className="floating-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Animated background grid */}
      <div className="bg-grid" />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logotag">
            <img src={logo} className="main-logo" alt="nowNoise Logo" />
            <h1 className="hero-title">NowNoise</h1>
            <h2 className="hero-tagline">your song, in a day</h2>
          </div>
          <div className="hero-cta">
            <button className="cta-primary">
              <Play size={18} style={{ marginRight: '8px' }} />
              Get Early Access
            </button>
          </div>
        </div>
        
      </section>

      {/* App Showcase Section */}
      <section className="showcase-section" ref={addSectionRef}>
        <div className="section-container">
          <div className="showcase-grid">
            <div className="showcase-content">
              <h2 className="showcase-title">What is nowNoise?</h2>
              <p className="showcase-description">
                Break free from the same old playlist — nowNoise uncovers hidden gems 
                and rising artists that will transform your music taste through authentic human connections.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Music size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Music Discovery</h3>
                    <p>Break free from the same old playlist — nowNoise uncovers hidden gems and rising artists that will transform your music taste.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Heart size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Share your Music</h3>
                    <p>In a world of curated playlists and polished feeds, nowNoise is where you drop the mask. Share the song you're living with right now — raw, real, and unfiltered.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Users size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Connect with Like-Minded Listeners</h3>
                    <p>Discover people who share your unique taste. Build connections through the music you love, and explore what others are vibing to in real time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="phone-showcase">
              <div className="phone-container">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    {screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className={`screen-slide ${index === currentSlide ? 'active' : ''}`}
                      >
                        <img src={screenshot} alt={`nowNoise App Screen ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Floating cards around the phone */}
                <div className="floating-elements">
                  <div className="floating-card floating-card-1">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Heart size={16} color="#ff6b6b" />
                      <span>300+ New Artists</span>
                    </div>
                  </div>
                  <div className="floating-card floating-card-2">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={16} color="#4ecdc4" />
                      <span>6M+ Songs</span>
                    </div>
                  </div>
                  <div className="floating-card floating-card-3">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="#ffd93d" />
                      <span>Real-time Sharing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section" ref={addSectionRef}>
        <div className="section-container">
          <div className="mission-grid">
            <div className="mission-visual">
  <div className="algorithm-visualization">
    <div className="photo-stack">

      <div className="photo-item">
        <img src={record} alt="Will - nowNoise User" />
      </div>
      <div className="photo-item">
        <img src={cds} alt="Charles - nowNoise User" />
      </div>
      
      <div className="photo-item">
        {/* You can add a third image here or use one of your existing screenshots */}
        <img src={shop} alt="nowNoise Community" />
      </div>
    
    </div>
  </div>

            </div>
            <div className="mission-content">
              <h2 className="mission-title">Our Mission Against Algorithms</h2>
              <p className="mission-description">
                Music streaming platforms trap you in echo chambers, feeding you the same predictable content. 
                We believe music discovery should be human, spontaneous, and authentic.
              </p>
              <div className="mission-points">
                <div className="mission-point">
                  <div className="point-icon">
                    <Sparkles size={24} />
                  </div>
                  <div className="point-content">
                    <h3>Break the Echo Chamber</h3>
                    <p>Escape the algorithmic bubble that keeps you listening to the same genre, mood, and era.</p>
                  </div>
                </div>
                <div className="mission-point">
                  <div className="point-icon">
                    <Users size={24} />
                  </div>
                  <div className="point-content">
                    <h3>Human-Powered Discovery</h3>
                    <p>Real people with real emotions sharing what moves them right now, not what an AI thinks you'll like.</p>
                  </div>
                </div>
                <div className="mission-point">
                  <div className="point-icon">
                    <Zap size={24} />
                  </div>
                  <div className="point-content">
                    <h3>Authentic Moments</h3>
                    <p>Music that captures genuine feelings and experiences, shared in the moment they matter most.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section" ref={addSectionRef}>
        <div className="section-container">
          <div className="newsletter-content">
            <div className="newsletter-visual">
              <div className="sound-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
                <div className="wave wave-4"></div>
                <div className="wave wave-5"></div>
              </div>
              <div className="vinyl-record">
                <div className="vinyl-center"></div>
                <div className="vinyl-groove vinyl-groove-1"></div>
                <div className="vinyl-groove vinyl-groove-2"></div>
                <div className="vinyl-groove vinyl-groove-3"></div>
              </div>
            </div>
            
            <div className="newsletter-form-container">
              <h2 className="newsletter-title">Stay in the Loop</h2>
              <p className="newsletter-description">
                Be the first to experience authentic music discovery. Get early access, 
                behind-the-scenes updates, and curated playlists from real humans.
              </p>
              
              <form className="newsletter-form">
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="email-input"
                    required
                  />
                  <button type="submit" className="submit-btn">
                    <span>Join the Movement</span>
                    <Zap size={18} />
                  </button>
                </div>
                <p className="form-disclaimer">
                  No spam, no algorithms. Just real music updates from real humans.
                </p>
              </form>
              
              <div className="newsletter-benefits">
                <div className="benefit">
                  <Music size={16} />
                  <span>Early app access</span>
                </div>
                <div className="benefit">
                  <Heart size={16} />
                  <span>Curated playlists</span>
                </div>
                <div className="benefit">
                  <Users size={16} />
                  <span>Community updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ModernAnimatedSite;