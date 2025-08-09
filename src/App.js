import React, { useEffect, useRef, useState } from 'react';
import logo from "./assets/images/nnlogo.png";
import './assets/fonts/fonts.css';
import charles from './assets/images/charles.jpg';
import will from './assets/images/will.jpg';
import ss1 from './assets/images/ss1.png';
import ss2 from './assets/images/ss2.png';
import ss3 from './assets/images/ss3.png';


const ModernAnimatedSite = () => {
  const sectionsRef = useRef([]);
  const polygonContainerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const screenshots = [ss1, ss2, ss3];

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

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % screenshots.length);
    }, 3000);
  
    return () => clearInterval(slideInterval);
  }, [screenshots.length]);

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % screenshots.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + screenshots.length) % screenshots.length);
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
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
          flex-direction: column;
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
          display: flex;
          flex-direction: column;
          gap: 120px;
          margin-top: 100px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .developer-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          border-radius: 32px;
          padding: 80px 60px;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 80px;
        }

        .developer-card:nth-child(even) {
          flex-direction: row-reverse;
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
          width: 400px;
          height: 400px;
          background: linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 16px;
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
          flex-shrink: 0;
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
          border-radius: 16px;
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
          border-radius: 12px;
          transition: all 0.6s ease;
        }

        .developer-card:hover .developer-photo img {
          transform: scale(1.1);
        }

        .developer-content {
          flex: 1;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .developer-name {
          font-family: 'Sora', sans-serif;
          font-size: 3.5rem;
          font-weight: 600;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          letter-spacing: -0.02em;
          margin: 0;
        }

        .developer-role {
          font-family: 'Sora', sans-serif;
          font-size: 1.6rem;
          color: #a5b4fc;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .developer-bio {
          font-family: 'Sora', sans-serif;
          font-size: 1.3rem;
          line-height: 1.8;
          color: #e0e6ff;
          font-weight: 300;
          margin: 0;
          max-width: none;
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
          background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          border-radius: 20px;
          padding: 0px 60px;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0px;
          max-width: 1200px;

        }
        
        .app-demo:hover {
          transform: translateY(-15px) scale(1.02);
          background: linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 100%);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }

        .vision-section {
          background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          border-radius: 20px;
          padding: 80px 60px;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0px;
          min-width: 1200px;

        }

        .vision-section:hover {
          transform: translateY(-15px) scale(1.02);
          background: linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 100%);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }

        .email-section{
          background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          border-radius: 20px;
          padding: 80px 60px;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0px;
          min-width: 1200px;

        }

        .email-section:hover {
          transform: translateY(-15px) scale(1.02);
          background: linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 100%);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }

        
        .app-mockup {
          width: 310px;
          height: 570px;
          background: linear-gradient(145deg, #1a1a1a 0%, #0d1117 100%);
          border-radius: 50px;
          margin: 40px auto;
          border: 5px solid #2d3748;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 25px 50px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.5);
          transition: transform 0.3s ease;
        }

        .app-mockup:hover {
          transform: scale(1.05);
        }

        .app-mockup::after {
          content: '';
          position: absolute;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 4px;
          background: #333;
          border-radius: 2px;
          z-index: 11;
        }

        .slideshow-container {
          position: relative;
          width: 100%;
          height: 100%;
          padding-top: 50px;
          overflow: hidden;
          border-radius: 27px;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide.active {
          opacity: 1;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 27px;
        }

        .slide-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 15;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: rgba(255,255,255,0.9);
          transform: scale(1.2);
        }

        .slide-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          border: none;
          color: white;
          font-size: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 15;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-nav:hover {
          background: rgba(0,0,0,0.7);
          transform: translateY(-50%) scale(1.1);
        }

        .slide-nav.prev {
          left: 15px;
        }

        .slide-nav.next {
          right: 15px;
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

        .app-demo-enhanced {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
  background: linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%);
  border-radius: 32px;
  padding: 80px 60px;
  border: 2px solid rgba(255,255,255,0.15);
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 60px;
}

.app-demo-enhanced:hover {
  transform: translateY(-10px);
  border-color: rgba(255,255,255,0.3);
  box-shadow: 0 40px 80px rgba(0,0,0,0.4);
}

.mockup-container {
  flex: 0 0 400px;
  display: flex;
  justify-content: center;
  position: relative;
}

.app-mockup-enhanced {
  position: relative;
  width: 320px;
  height: 600px;
}

.phone-frame {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #1a1a1a 0%, #0d1117 100%);
  border-radius: 40px;
  border: 4px solid #2d3748;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 25px 50px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.1);
  transition: all 0.4s ease;
}

.phone-frame:hover {
  transform: scale(1.02) rotateY(-5deg);
  box-shadow: 0 35px 70px rgba(0,0,0,0.7);
}

.phone-notch {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 4px;
  background: #333;
  border-radius: 2px;
  z-index: 20;
}

.phone-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 30%, transparent 70%);
  border-radius: 36px;
  pointer-events: none;
}

.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 30px 20px 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.slide:hover .slide-overlay {
  transform: translateY(0);
}

.slide-info {
  color: white;
  text-align: center;
}

.slide-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
}

.slide-description {
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.4;
}

.slide-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  z-index: 15;
}

.slide-nav {
  background: rgba(0,0,0,0.6);
  border: none;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.slide-nav:hover {
  background: rgba(0,0,0,0.8);
  transform: scale(1.1);
}

.slide-nav span {
  font-size: 18px;
  line-height: 1;
}

.slide-progress {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 15;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: rgba(255,255,255,0.9);
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(255,255,255,0.5);
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
}

.floating-note {
  position: absolute;
  color: rgba(255,255,255,0.3);
  font-size: 24px;
  animation: float-notes 4s ease-in-out infinite;
}

.note-1 {
  top: 20%;
  left: -30px;
  animation-delay: 0s;
}

.note-2 {
  top: 60%;
  right: -30px;
  animation-delay: 1.5s;
}

.note-3 {
  top: 40%;
  left: -25px;
  animation-delay: 3s;
}

.floating-wave {
  position: absolute;
  bottom: -20px;
  left: -50px;
  width: 100px;
  height: 20px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  border-radius: 10px;
  animation: wave-pulse 3s ease-in-out infinite;
}

@keyframes float-notes {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-20px) rotate(10deg); opacity: 0.6; }
}

@keyframes wave-pulse {
  0%, 100% { opacity: 0.2; transform: scaleX(1); }
  50% { opacity: 0.5; transform: scaleX(1.2); }
}

.features-showcase {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.feature-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-card:hover, .feature-card.active {
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
  border-color: rgba(255,255,255,0.3);
  transform: translateX(10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.feature-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #4ade80, #3b82f6, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before, .feature-card.active::before {
  opacity: 1;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.feature-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 15px;
}

.feature-description {
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
  margin-bottom: 20px;
}

.feature-stats {
  display: flex;
  gap: 30px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-family: 'Sora', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4ade80;
}

.stat-label {
  font-family: 'Sora', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.feature-highlight {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.highlight-item {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.genre-tag {
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.demo-info {
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(20px);
}

.info-grid {
  display: flex;
  justify-content: space-around;
  gap: 40px;
}

.info-item {
  text-align: center;
  flex: 1;
}

.info-number {
  font-family: 'Sora', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4ade80, #3b82f6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  margin-bottom: 10px;
}

.info-label {
  font-family: 'Sora', sans-serif;
  color: rgba(255,255,255,0.7);
  font-size: 1rem;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .app-demo-enhanced {
    flex-direction: column;
    gap: 50px;
    text-align: center;
  }
  
  .mockup-container {
    flex: none;
  }
  
  .info-grid {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .app-demo-enhanced {
    padding: 50px 30px;
  }
  
  .app-mockup-enhanced {
    width: 280px;
    height: 520px;
  }
  
  .feature-card {
    padding: 25px;
  }
  
  .info-number {
    font-size: 2rem;
  }
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
          .developer-card {
            flex-direction: column !important;
            text-align: center;
            gap: 50px;
            padding: 60px 50px;
          }

          .developer-content {
            text-align: center;
          }

          .developer-photo {
            width: 350px;
            height: 350px;
          }

          .developer-name {
            font-size: 3rem;
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
            gap: 80px;
            margin-top: 60px;
          }
          
          .developer-card {
            padding: 50px 40px;
            gap: 40px;
          }

          .developer-photo {
            width: 280px;
            height: 280px;
          }

          .developer-name {
            font-size: 2.5rem;
          }

          .developer-role {
            font-size: 1.3rem;
          }

          .developer-bio {
            font-size: 1.1rem;
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
            padding: 40px 30px;
            gap: 30px;
          }

          .developer-photo {
            width: 220px;
            height: 220px;
          }

          .developer-name {
            font-size: 2rem;
          }

          .developer-role {
            font-size: 1.1rem;
          }

          .developer-bio {
            font-size: 1rem;
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

      <div className="blur-overlay"></div>

      {/* Fullscreen Logo Hero Section */}
      <section className="fullscreen-hero">
        <div className="fullscreen-logo-container">
          <img src={logo} className="main-logo" alt="nowNoise Logo" />
          <div className="logotag">
            <h1 className="hero-title">NowNoise</h1>
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
              <div className="developer-content">
                <h3 className="developer-name interactive-hover">William Costales</h3>
                <p className="developer-role">Co-Founder & Lead Developer</p>
                <p className="developer-bio">
                  With a strong background as a computer scientist and AI student partner at university, Will brings technical excellence and innovative problem-solving to nowNoise's development team. His expertise in machine learning and software architecture drives the platform's cutting-edge AI capabilities.
                </p>
              </div>
            </div>
            <div className="developer-card">
              <div className="developer-photo">
                <img src={charles} alt="Charlie Ponambalum" />
              </div>
              <div className="developer-content">
                <h3 className="developer-name interactive-hover">Charlie Ponambalum</h3>
                <p className="developer-role">Co-Founder & Creative Lead</p>
                <p className="developer-bio">
                  A classically trained musician turned tech entrepreneur, Charlie bridges the gap between artistry and innovation. His background in music production and AI research drives nowNoise's mission to democratize music creation, ensuring that technology serves creativity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="section" ref={addSectionRef}>
  <div className="container">
    <h2 className="section-title text-glow">experience nowNoise</h2>
    
    <div className="app-demo-enhanced">
      {/* Left side - App mockup with enhanced features */}
      <div className="mockup-container">
        <div className="app-mockup-enhanced">
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="slideshow-container">
              {screenshots.map((screenshot, index) => (
                <div 
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <img src={screenshot} alt={`nowNoise App - ${index === 0 ? 'Music Creation' : index === 1 ? 'AI Studio' : 'Sound Library'}`} />
                  <div className="slide-overlay">
                    <div className="slide-info">
                      <h4 className="slide-title">
                        {index === 0 ? 'Create Instantly' : index === 1 ? 'AI-Powered Studio' : 'Explore Sounds'}
                      </h4>
                      <p className="slide-description">
                        {index === 0 ? 'Turn ideas into music with simple inputs' : 
                         index === 1 ? 'Professional tools powered by AI' : 
                         'Discover and customize audio elements'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Enhanced Navigation */}
              <div className="slide-controls">
                <button className="slide-nav prev" onClick={prevSlide}>
                  <span>‹</span>
                </button>
                <button className="slide-nav next" onClick={nextSlide}>
                  <span>›</span>
                </button>
              </div>
              
              {/* Progress indicators */}
              <div className="slide-progress">
                {screenshots.map((_, index) => (
                  <div
                    key={index}
                    className={`progress-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Phone reflection effect */}
            <div className="phone-reflection"></div>
          </div>
          
          {/* Floating UI elements for visual interest */}
          <div className="floating-elements">
            <div className="floating-note note-1">♪</div>
            <div className="floating-note note-2">♫</div>
            <div className="floating-note note-3">♪</div>
            <div className="floating-wave"></div>
          </div>
        </div>
      </div>

      {/* Right side - Interactive feature showcase */}
      <div className="features-showcase">
        <div className="feature-card active" data-feature="create">
          <div className="feature-content">
            <h3 className="feature-title">Instant Creation</h3>
            <p className="feature-description">
              Simply hum a melody, describe your vision, or upload a voice memo. 
              Our AI transforms your input into professional-quality music within hours.
            </p>
            <div className="feature-stats">
              <div className="stat">
                <span className="stat-number">24hr</span>
                <span className="stat-label">turnaround</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">instruments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-card" data-feature="studio">
          <div className="feature-content">
            <h3 className="feature-title">AI Studio</h3>
            <p className="feature-description">
              Fine-tune every aspect of your track with intelligent suggestions. 
              Adjust tempo, key, instrumentation, and mood with intuitive controls.
            </p>
            <div className="feature-highlight">
              <div className="highlight-item">Real-time preview</div>
              <div className="highlight-item">Smart recommendations</div>
              <div className="highlight-item">Version control</div>
            </div>
          </div>
        </div>

        <div className="feature-card" data-feature="library">
          <div className="feature-content">
            <h3 className="feature-title">Sound Library</h3>
            <p className="feature-description">
              Access thousands of samples, loops, and AI-generated elements. 
              Mix genres, create unique soundscapes, and discover new musical territories.
            </p>
            <div className="genre-tags">
              <span className="genre-tag">Electronic</span>
              <span className="genre-tag">Classical</span>
              <span className="genre-tag">Hip-Hop</span>
              <span className="genre-tag">Jazz</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom info section */}
    <div className="demo-info">
      <div className="info-grid">
        <div className="info-item">
          <div className="info-number">30sec</div>
          <div className="info-label">to get started</div>
        </div>
        <div className="info-item">
          <div className="info-number">24hr</div>
          <div className="info-label">to complete</div>
        </div>
        <div className="info-item">
          <div className="info-number">∞</div>
          <div className="info-label">creative possibilities</div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Vision Section */}
      <section className="section" ref={addSectionRef}>
      <h2 className="section-title text-glow">our vision as a team</h2>
          <div className="vision-section">
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
      </section>

      {/* Email List Section */}
      <section className="section" ref={addSectionRef}>
      <h2 className="section-title text-glow">stay in tune</h2>
          <div className="email-section">
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
      </section>
    </>
  );
};

export default ModernAnimatedSite;