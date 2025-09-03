import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Play, Users, Heart, Sparkles, Music, Zap, Globe, Mail, Check, AlertCircle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import logo from "./assets/images/nnlogo.png";
import './assets/fonts/fonts.css';
import charles from './assets/images/charles.jpg';
import will from './assets/images/will.jpg';
import ss1 from './assets/images/ss1.png';
import ss2 from './assets/images/ss2.png';
import ss3 from './assets/images/ss3.png';
import cases from './assets/images/cases.jpeg';
import char from './assets/images/charplay.jpeg';
import discs from './assets/images/discs.jpeg';
import data from './assets/images/DATA.png';
import pg from './assets/images/photogroup.png'


import friends from './assets/images/IMG_0914.jpeg'
import discuss from './assets/images/IMG_4699.jpeg'
import play from './assets/images/IMG_4700.jpeg'


const ModernAnimatedSite = () => {

  ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const isSmallScreen = window.innerWidth < 1000;
const fullLabels = ['1930', '1950', '1970', '1990', '2010', '2020'];
const fullData = [195, 222, 242, 259, 243, 197];

// Mobile data (every other item)
const mobileLabels = fullLabels.slice(-4);
const mobileData = fullData.slice(-4);

const data = {
  labels: isSmallScreen ? mobileLabels : fullLabels,
  datasets: [
    {
      data: isSmallScreen ? mobileData : fullData,
      backgroundColor: '#c491f0cb',
      borderColor: '#fcf8ffcc',
      borderWidth: 2,
      borderRadius: isSmallScreen ? 3 : 5,
      barThickness: isSmallScreen ? 12 : 18, 
    },
  ],
};
const options = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#2d2d2d',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      cornerRadius: isSmallScreen ? 6 : 10,
      padding: isSmallScreen ? 8 : 12,
      titleFont: {
        family: 'Sora',
        size: isSmallScreen ? 12 : 14,
      },
      bodyFont: {
        family: 'Sora',
        size: isSmallScreen ? 10 : 12,
      },
    },
  },
  scales: {
    x: {
      min: 150,
      max: 260,
    
      ticks: {
        color: 'rgba(255,255,255,0.6)',
        font: {
          family: 'Sora',
          size: isSmallScreen ? 10 : 12,
        },
        maxTicksLimit: isSmallScreen ? 4 : 6, // Fewer ticks on mobile
      },
    },
    y: {
      grid: {
        color: 'rgba(255,255,255,0.1)',
        drawBorder: false,
      },
      ticks: {
        color: 'rgba(255,255,255,0.6)',
        font: {
          family: 'Sora',
          size: isSmallScreen ? 10 : 12,
        },
      },
    },
  },
};
  const sectionsRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const screenshots = [ss1, ss2, ss3];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
      
      // Reset to idle after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

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

      .scroll-arrow {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  animation: fadeInBounce 2s ease-out 1.5s forwards;
  color: #a855f7;
  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
  transition: all 0.3s ease;
}


.scroll-arrow svg {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes fadeInBounce {
  0% {
    opacity: 0;
    transform: translateX(0%) translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateX(0%) translateY(0);
  }
}

      .email-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(1rem, 4vw, 2.5rem);

  flex-wrap: wrap;
}

.email-item {
  text-align: center;
  min-width: 0;
  flex-shrink: 0;
}

.email-number {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #dbbadaff 0%, #a855f7 100%);background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.25rem;
  display: block;
}

.email-label {
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.email-divider {
  width: 2px;
  height: clamp(30px, 6vw, 49px);
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  flex-shrink: 0;
}

@media (max-width:768px){
  .email-number {
    font-size: 1.2rem;
    font-weight: 500;
   
    margin-bottom: 0rem;

  }

  .email-label{
        font-size: 0.6rem;
  }

  .email-stats{
        gap : 0.8rem;
  }
}


          .founder-bio-compact {
          display:none;
          
          }



        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

  
        .short {
        display: none;}

        @media (max-width: 1000px){
        .short{
        display:block;
      }
      }
      
      @media (max-width: 1000px) {
      .full {
        display: none;
      }

      
      }

      .photo-container-compact{
        display: none;
      }
        @media (max-width: 1000px) {
      .photo-container-compact {
        display: flex;

        
        
        
        
        }

      .photo-container-compact img{
        width: 75%;
        margin: 0 auto;
        }
    
      }
      


        .showcase-description-compact {
                        margin-bottom: 0.8rem;
                        padding-left:10px;
                        padding-right:  10px;
                        margin-left: 6%;
                        margin-right: 6%;
                        font-weight: 100;
                        text-align: left;
                        display: none;
                      }


            @media (max-width: 1000px) {
              .showcase-description-compact{
              display: none}
            }

               


        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
          line-height: 1.6;
        }
          /* styles.css */



        .showcase-container {
          position: relative;
          background: radial-gradient(circle at 20% 80%, rgba(19, 19, 32, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(43, 19, 33, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(25, 46, 48, 0.1) 0%, transparent 50%),
                      linear-gradient(180deg, #010111ff 0%, #050516ff 100%);
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

        .stats-section{
            background: linear-gradient(135deg,rgba(64, 6, 212, 0.14) 0%,rgba(169, 85, 247, 0.09) 100%);
            border: none;
            border-radius: 20px;
            padding: 2rem 2rem 1.4rem 1.4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border: 1px solid rgba(120, 82, 236, 0.3);
            


        
        }

        .stats-section p{
        font-family: 'Sora';
        margin: 0 auto;
        color: rgba(255, 255, 255, 0.57);
        margin-top: 10px;

        }

        .stats-section img{
        width: 100%;
        }

        .submitbtn{
            background: linear-gradient(135deg,rgba(64, 6, 212, 0.46) 0%,rgba(169, 85, 247, 0.63) 100%);
            border: none;
            border-radius: 20px;
            padding: 1rem 1.8rem;
            color: #fff;
            font-weight: 400;
            font-size: 1rem;
            cursor: pointer;
            letter-spacing: 0.06em;
            gap: 0.75rem;
            font-family: 'Sora';
          }

          .submitbtn:hover {

  box-shadow: 0 20px 40px rgba(168, 85, 247, 0.4);

  transition: all 0.3s ease;
}



        .scrollbtn{
            background: linear-gradient(135deg,rgba(64, 6, 212, 0.46) 0%,rgba(169, 85, 247, 0.63) 100%);
            border: none;
            border-radius: 20px;
            padding: 1rem 1.8rem;
            color: #fff;
            font-weight: 400;
            font-size: 1rem;
            cursor: pointer;
            letter-spacing: 0.06em;

            gap: 0.75rem;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'Sora';

            opacity: 0;
            animation: fadeInUp 2s ease-out 2s forwards;
          }


.scrollbtn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 20px 40px rgba(168, 85, 247, 0.4);
  background: linear-gradient(135deg, #0891b2 0%, #9333ea 100%);
  transition: all 0.3s ease;
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

        .stylized-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.5) 50%, transparent 100%);
  margin: 0rem 0;
  margin-top: 20px;
  margin-bottom: 20px;
}

        /* Enhanced Founders Section Styles */
.founders-section {
  padding: clamp(80px, 10vw, 140px) 20px;
  margin-left: 90px;
  position: relative;
  z-index: 5;

  opacity: 0;
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(50px);
  margin-left: 8%;
  margin-right: 8%;

}

.founders-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Main Grid Layout */
.founders-main-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(80px, 12vw, 120px);

  max-width: 100%;
  margin: 0 auto;
}

/* Left Column - Text Content */
.founders-left-column {
  top: 0px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-self: start; /* Add this - aligns the grid item to the start */
  align-self: start; 
}

@media (min-width: 1000px) {
    .founders-left-column{
    gap: 0rem;}

    }



.founders-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  background: linear-gradient(135deg, #ffffff 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.founders-subtitle {
  font-family: 'Sora';
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-family: 'Sora';
}

.founders-story {
      font-family: 'Sora';
  padding: clamp(40px, 6vw, 60px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.founders-story::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.5) 50%, transparent 100%);
}

.newsletter-section {

  position: relative;
  z-index: 5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  
}

.newsletter-container {

  margin: 0 auto;
  text-align: center;
}

.newsletter-card {
  width: 800px;

  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(107, 126, 219, 0.64);
  border-radius: clamp(16px, 4vw, 28px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  cursor: default;
  font-family: 'Sora';
  backdrop-filter: blur(20px);
  border: 1px solid rgba(107, 126, 219, 0.64);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 16px rgba(107, 126, 219, 0.15);


}

.newsletter-title {
  font-size: 50px;
  font-weight: 300;
  background: linear-gradient(135deg, #dbbadaff 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;

  line-height: 1.1;
  padding-top: 10px;
  padding-bottom: 20px;
}

.newsletter-description {
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 15px;
  line-height: 1.6;
  max-width: min(500px, 85vw);
  margin-left: auto;
  margin-right: auto;

}

.statslist {
display: flex;
flex-direction: column;
margin: 0 auto;}

/* Base styles for feature-item-list */
.feature-item-list {
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  padding: clamp(0.6rem, 2vw, 0.8rem); /* Responsive padding */
  background: rgba(252, 0, 168, 0.03);
  border: 1px solid rgba(151, 100, 202, 0.26);
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: default;
  position: relative;
  overflow: hidden;
}

/* Demand title */
.demand {
  font-family: 'Sora', sans-serif;
  font-size: clamp(14px, 3vw, 15px); /* Responsive font size */
  margin-bottom: clamp(8px, 2vw, 10px);
  margin-top: 2px;
  color: #df9de6d1;
  font-weight: 300;
  text-align: center;
}

/* Newsletter stats container */
.newsletter-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem; /* Responsive gap */
  flex-wrap: wrap;
  text-align: center;
  margin: 0 auto;
  width: 100%;
}

/* Individual stat items */
.stat-item {
  text-align: center;
  min-width: 0;
  flex-shrink: 0;
  flex: 0 1 auto; /* Allow flexible sizing */
}

/* Stat numbers */
.stat-number {
  font-size: clamp(20px, 5vw, 25px); /* Responsive font size */
  font-weight: 600;
  background: linear-gradient(135deg, rgb(220, 52, 209) 0%, rgb(192, 137, 244) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.2rem;
  display: block;
  line-height: 1.2;
}

/* Stat labels */
.stat-label {
  font-size: clamp(9px, 2.5vw, 10px); /* Responsive font size */
  color: rgba(255, 255, 255, 0.79);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap; /* Prevent label wrapping */
}

/* Dividers */
.stat-divider {
  width: 2px;
  height: clamp(25px, 5vw, 49px); /* Responsive height */
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  flex-shrink: 0;
}

/* Privacy text */
.privacy-text-survey {
  font-size: clamp(10px, 2.5vw, 12px);
  color: rgba(255, 255, 255, 0.6);
  margin-top: clamp(8px, 2vw, 12px);
  text-align: center;
  font-style: italic;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .newsletter-stats {
    gap: clamp(0.8rem, 6vw, 2rem);
  }
  
  .feature-item-list {
    width: min(350px, 95vw);
    padding: 0.6rem;
    cursor: default;
  }
  
  .stat-divider {
    height: 30px; /* Fixed height for mobile */
  }
}

/* Very small screens */
@media (max-width: 480px) {
  .newsletter-stats {
    gap: 1rem;
  }
  
  .feature-item-list {
    width: 95vw;
    padding: 0.5rem;
    cursor: default;
  }
  
  .stat-number {
    font-size: 18px;
  }
  
  .stat-label {
    font-size: 8px;
  }
  
  .stat-divider {
    height: 25px;
  }
}


.form-container {
  position: relative;
  max-width: min(500px, 90vw);
  width: 100%;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: row;
  gap: clamp(12px, 3vw, 16px);

  position: relative;
  margin-top: 30px;
}

.input-container {
  flex: 1;
  position: relative;
  font-family: 'Sora';
  width: 100%;
}

.email-input::placeholder {
  font-family: 'Sora', sans-serif;
  font-style: italic;
}

.email-input {
    font-family: 'Sora';
  

}

.email-input::placeholder {
  font-family: 'Sora', sans-serif;


}

.email-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.01);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: clamp(12px, 3vw, 16px);
  padding: clamp(0.8rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem);
  color: #fff;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 500;
  transition: all 0.3s ease;
  outline: none;
  backdrop-filter: blur(20px);
  box-sizing: border-box;
  
}

.email-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
  font-weight: 400;
}

.email-input:focus {
  border-color: rgba(205, 6, 212, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 18px rgba(6, 182, 212, 0.15);
}

.email-input.error {
  border-color: rgba(239, 68, 68, 0.5);
  background: rgba(239, 68, 68, 0.05);
}

.submit-btn {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  border: none;
  border-radius: clamp(12px, 3vw, 16px);
  padding: clamp(0.8rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem);
  color: #fff;
  font-weight: 600;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: clamp(120px, 25vw, 140px);
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Tablet and larger screens */
@media (min-width: 1000px) {
  .form-group {
    flex-direction: row;
    align-items: stretch;
  }

  founders-section{
        text-align: center;
  }

  .founders-left-column{
        gap: 0rem;
  }

  .founders-title {
        text-align: center;
        margin-left: 100px;
  }
  
  .submit-btn {
    width: auto;
    flex-shrink: 0;
  }
  

}



/* Ultra-wide screens */
@media (min-width: 1400px) {

}



.privacy-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-style: italic;
}

.privacy-text-survey {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.34);
  text-align: center;
  font-style: italic;
  font-family: 'Sora';
  margin-top: 5px;

}

.stat-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.1);
  text-align: center;
  font-style: italic;


}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes floatNote {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-15px) rotate(5deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-8px) rotate(-3deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-12px) rotate(2deg);
    opacity: 0.9;
  }
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

        @keyframes successPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }



/* Right Column - Founders Cards */
.founders-right-column {
  display: flex;
  flex-direction: column;
  gap: clamp(0px, 6vw, 50px);
  overflow: hidden;

}

.founder-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 246, 246, 0.31);
  border-radius: 28px;
  padding: clamp(2rem, 4vw, 2.5rem);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  cursor: default;
  font-family: 'Sora';
  backdrop-filter: blur(20px);
}



.news-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: clamp(2rem, 4vw, 2.5rem);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Sora';
  backdrop-filter: blur(20px);
}


.founder-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.founder-image-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  flex-shrink: 0;
}



.founder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}



.founder-info {
  flex: 1;
  position: relative;
  z-index: 10;
}

.founder-name {
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 0.5rem;
}

.founder-title-text {
  font-size: 1rem;
  color: #a855f7;

  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.founder-bio {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 0rem;
  font-size: 0.9rem;
  position: relative;
  z-index: 10;
  font-weight: 200;
 font-size: 1rem;
}



@media (max-width: 1000px) {

  .founder-card {
    padding: 1.5rem;
    text-align: center;
    
    
  }

  .founder-bio {
        font-size: 12px;
        font-weight: 200;
  }

  .founder-image-container {
    width: 150px;
    height: 150px;
  }

  .highlight-item {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .founders-story {
    padding: clamp(20px, 4vw, 30px);
  }

  .founders-main-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .founders-left-column {
    position: static;
    order: 1;
  }

  .founders-right-column {
    order: 2;
    gap: 3rem;
  }

  .founders-story {
    margin-bottom: 2rem;
  }
  .founders-section {
    margin-left:8px;
    margin-right: 8px;
  }
  
  .founder-name {
        margin-bottom: 0px;
  }

  .founders-main-grid {
    gap: 1rem;
  }

  .founder-card {
    padding: clamp(1.5rem, 4vw, 2rem);
  }

  .founder-header {
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 15px;
    text-align: center;
  }




}

@media (max-width: 480px) {

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
          min-height: 120vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8%;
          margin-right: 8%;
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
          margin-bottom: 2.5rem;
          line-height: 1.1;
        }

        .showcase-description {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          line-height: 1.6;
          width: 90%;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          text-align:left;
          max-width: 90%;
          font-family: 'Sora';
          font-size: 10px;
          font-weight: 100;
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
          cursor: default;
          position: relative;
          overflow: hidden;
          align-items: center;
        }
        .feature-item-graph {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          gap: 2rem;
          padding: 1.5rem;

          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          align-items: center;
          width: 90%;
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
          font-weight: 400;
        }

        /* Enhanced Phone Showcase */
        .phone-showcase {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          perspective: 1000px;
          padding-right:0px;
          
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
  width: 100%;
  margin: 0 auto;
  z-index: 5;
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(50px);
  margin-left: 7%;
  margin-right:7%;
  min-height: 120vh;

  
  
  
}

.mission-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.mission-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 0px;
  align-items: center;

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
  order: 1;
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
  order: 2;
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
  order: 3;
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

/* Tablet and below - Switch to uniform grid layout with changed order */
@media (max-width: 1000px) {
  .algorithm-visualization {
    height: 320px;
    padding: 1rem;
  }

  .story-text {
      text-align: center;
  }

  .photo-grid {
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 50%;
    max-width: 360px;
    height: 200px;
  }

  /* Reset all photos to uniform size and positioning with new order */
  .photo-item:nth-child(1),
  .photo-item:nth-child(2),
  .photo-item:nth-child(3) {
    width: 100%;
    height: 100%;
    margin: 0;
    z-index: 1;
    border-radius: 8px;
    /* Reset grid positioning */
    grid-column: unset;
    grid-row: unset;
    justify-self: unset;
    align-self: unset;
  }

  /* Change the order: 3rd photo first, then 1st, then 2nd */
  .photo-item:nth-child(1) {
    order: 2;
  }

  .photo-item:nth-child(2) {
    order: 3;
  }

  .photo-item:nth-child(3) {
    order: 1;
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

footer {
  margin-top: auto;
  background: linear-gradient(135deg,rgba(17, 24, 39, 0.15) 0%,rgba(31, 41, 55, 0.15) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;

}

.footer-content {
  max-width: 100%;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 4vw, 2rem);
  text-align: center;   /* centers inline text/elements */
}

.footer-brand {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  line-height: 1.6;
  font-weight: 400;
  
  
}

.footer-brand .brand-name {
  background: linear-gradient(135deg, #ffffff 0%, #ae63ebff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  
}

.brand-name2 {
  background: linear-gradient(135deg, #d4baceff 0%, #ae63ebff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}


.footer-disclaimer {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  margin-top: clamp(0.5rem, 2vw, 0.75rem);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}



/* Alternative sticky footer approach (if flexbox doesn't work with your layout) */
.sticky-footer-wrapper {
  min-height: 100vh;
  position: relative;
  padding-bottom: 120px; /* Adjust based on footer height */
}

.sticky-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 1000px) {
  .footer-content {
    text-align: left;
  }
  
  .footer-brand,
  .footer-disclaimer {
    text-align: center;
  }

  founders-left-column{
  text-align: center;}
}

/* For very small screens */
@media (max-width: 480px) {
  footer {
    padding: 1rem 0;
  }
  
  .footer-content {
    padding: 1rem;
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
@media (max-width: 1000px) {


    


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

/* How It Works Section Styles */
.how-it-works-section {
  padding: clamp(80px, 10vw, 140px) 20px;
  position: relative;
  width: 100%;
  min-height: 120vh;

  
  margin: 0 auto;
  z-index: 5;
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(50px);
  background: linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.02) 50%, transparent 100%);
}

.smallnum {
display: none;}

@media (max-width: 1000px) {

.smallnum {
display: inline;}
}

.how-it-works-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.how-it-works-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;

  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  margin-left: 6%;
  margin-right: 8%;
}

.how-it-works-content {
  font-family: 'Sora';
}

.how-it-works-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  background: linear-gradient(135deg, #dbbadaff 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.how-it-works-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.6;
  font-weight: 200;
}

@media (max-width:1000px){
.how-it-works-description{
text-align:left;
margin-bottom: 25px;
margin-left: 13px;
margin-right: 13px;}}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.step-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.5) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}





.step-number {
  background: linear-gradient(135deg, rgba(212, 34, 123, 0.2) 0%, rgba(179, 128, 226, 0.2) 100%);
  border: 1px solid rgba(242, 100, 247, 0.3);
  color: #be5fd1ff;
  font-weight: 700;
  font-size: 1.2rem;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0rem;
  color: #fff;
}

.step-content p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}
/* How It Works Visual */
.how-it-works-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
}

/* Connection Web Styles */
.connection-web {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
}

.web-svg {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.connection-line {
  stroke: rgba(6, 182, 212, 0.4);
  stroke-width: 2;
  opacity: 0.6;
  animation: connectionPulse 3s ease-in-out infinite;
}

.connection-line:nth-child(odd) {
  animation-delay: -1.5s;
}

.node {
  cursor: pointer;
  transition: all 0.3s ease;
}

.node-center {
  fill: #a855f7;
  stroke: rgba(168, 85, 247, 0.8);
  stroke-width: 3;
}

.node-secondary {
  fill: rgba(6, 182, 212, 0.8);
  stroke: rgba(6, 182, 212, 0.6);
  stroke-width: 2;
}

.node-tertiary {
  fill: rgba(255, 255, 255, 0.7);
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 2;
}

.node-discovery {
  fill: rgba(34, 197, 94, 0.8);
  stroke: rgba(34, 197, 94, 0.6);
  stroke-width: 2;
  animation: discoveryGlow 2s ease-in-out infinite;
}

.node:hover {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.node-text {
  fill: #ffffff;
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}

.center-text {
  font-size: 14px;
  font-weight: 700;
}

.pulse {
  fill: none;
  stroke: rgba(168, 85, 247, 0.6);
  stroke-width: 1;
  opacity: 0;
  animation: pulseRing 2s ease-out infinite;
}

.pulse-1 {
  animation-delay: 0s;
  stroke: rgba(168, 85, 247, 0.6);
}

.pulse-2 {
  animation-delay: 0.5s;
  stroke: rgba(6, 182, 212, 0.6);
}

.pulse-3 {
  animation-delay: 1s;
  stroke: rgba(6, 182, 212, 0.6);
}

.pulse-4 {
  animation-delay: 1.5s;
  stroke: rgba(34, 197, 94, 0.6);
}

@keyframes connectionPulse {
  0%, 100% {
    stroke-opacity: 0.3;
    stroke-width: 2;
  }
  50% {
    stroke-opacity: 0.8;
    stroke-width: 3;
  }
}

@keyframes pulseRing {
  0% {
    r: 0;
    opacity: 1;
    stroke-width: 3;
  }
  100% {
    r: 40;
    opacity: 0;
    stroke-width: 1;
  }
}

@keyframes discoveryGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.4) drop-shadow(0 0 12px rgba(34, 197, 94, 0.6));
  }
}

/* Mobile responsive for connection web */
@media (max-width: 1000px) {
  .connection-web {
    height: 300px;
  }
  
  .web-svg {
    width: 300px;
    height: 300px;
  }
  
  .node-text {
    font-size: 10px;
  }
  
  .center-text {
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .connection-web {
    height: 250px;
  }
  
  .web-svg {
    width: 250px;
    height: 250px;
  }
  
  .node-text {
    font-size: 8px;
  }
  
  .center-text {
    font-size: 10px;
  }
  
  .connection-line {
    stroke-width: 1.5;
  }
  
  .pulse {
    stroke-width: 0.5;
  }
}

@keyframes floatArrow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.algorithm-comparison {
  display: flex;
  flex-direction: column;



 

}

.comparison-item {
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.human-way {
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.human-way:hover {
  background: rgba(6, 182, 212, 0.15);
  transform: translateY(-2px);
}

.machine-way {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.machine-way:hover {
  background: rgba(239, 68, 68, 0.15);
  transform: translateY(-2px);
}

.comparison-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.comparison-item p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.comparison-vs {
  text-align: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

/* Mobile responsive for How It Works */
@media (max-width: 1000px) {

.step-content h3 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0rem;
  background: linear-gradient(135deg, rgba(231, 114, 172, 1) 0%, rgba(240, 41, 124, 1) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

}

.step-content p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}
  .how-it-works-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-left: 0px;
    margin-right: 0px;
  }

  .how-it-works-content {
    order: 2;
    text-align: center;
  }

  .flexy{
  order: 1;}

  .how-it-works-visual {
    order: 1;
    padding: 1rem;
  }

  .workflow-diagram {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .workflow-arrow {
    display: none;
  }

  .workflow-step {
    min-width: 80px;
    padding: 1rem;
  }

  .workflow-step .step-icon {
    width: 40px;
    height: 40px;
  }

  .workflow-step span {
    font-size: 0.85rem;
  }


  .step-item {
    flex-direction: column;
    text-align: left;
    gap: 1rem;
  }

  .step-number {
  display: none;}

  .step-number {
    margin: 0 auto;
  }
}

@media (max-width: 600px) {
  .how-it-works-section {
    margin-left: 0px;
    margin-right: 0px;
    width: 100%;
  }

  
  .how-it-works-title {
    font-size: 35px;
    font-weight: 300;
  }

  .steps-list {
    gap: 1rem;
  }

  .step-item {
    padding: 1rem;

  }

  .step-number {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }

  .step-content h3 {
            font-size: 0.9rem;
        font-weight: 400;
        margin-bottom: 0.1rem;
        background: linear-gradient(135deg, rgb(210, 109, 207) 0%, rgb(201, 129, 212) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
  }

  .step-content p {
    font-size: 0.75rem;
  }

  .workflow-step {
    min-width: 70px;
    padding: 0.8rem;
  }

  .workflow-step .step-icon {
    width: 35px;
    height: 35px;
  }

  .workflow-step span {
    font-size: 0.75rem;
  }

  .comparison-item {
    padding: 1rem;
  }

  .comparison-item h4 {
    font-size: 1rem;
  }

  .comparison-item p {
    font-size: 0.8rem;
  }
}

@media (max-width: 1000px) {
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

.mission-title2 {
  font-size: 55px;
  font-weight: 350;
  background: linear-gradient(135deg, #ffffff 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.mission-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.6;
  font-weight: 200;
}

.mission-points {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Enhanced Polaroid Stack Styles */
.story-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 80px 20px;

    min-height: 120vh;
    
}

.story-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    text-align: center;
}

/* Polaroid Stack Container */
.polaroid-stack {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 320px;
    width: 380px;
    perspective: 1200px;
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (max-width: 1000px) {
  .story-text {
    text-align: center;
  }
}

.polaroid-container {
    position: absolute;
    width: 230px;
    height: 300px;
    background: linear-gradient(145deg, 
        rgba(248, 248, 248, 0.95), 
        rgba(240, 240, 240, 0.95));
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    box-shadow: 
        0 15px 35px rgba(0, 0, 0, 0.15),
        0 8px 20px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: pointer;
    transform-style: preserve-3d;
    backdrop-filter: blur(10px);
    padding: 20px 20px 60px 20px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

/* Image container within polaroid */
.polaroid-image-wrapper {
    width: 100%;
    height: 240px;
    background: #f8f8f8;
    border: 1px solid rgba(200, 200, 200, 0.3);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    box-shadow: 
        inset 0 2px 4px rgba(0, 0, 0, 0.1),
        0 1px 2px rgba(0, 0, 0, 0.05);
}

.polaroid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
    display: block;
}

.polaroid-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 0.9rem;
    font-style: italic;
    border-radius: 3px;
}

.polaroid-caption {
    margin-top: 20px;
    text-align: center;
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    line-height: 0;
    
    font-family: 'Written';
    letter-spacing: 0.3px;
    font-size: 25px;
}

/* Individual polaroid positioning - Default stacked state */
.polaroid-container:nth-child(1) {
    transform: translateX(-200px) scale(1.03) rotate(-8deg);
}

.polaroid-container:nth-child(2) {
    transform: translateX(0) scale(1.06) rotate(2deg);
    z-index: 4;


  
}

.polaroid-container:nth-child(3) {
    transform: translateX(200px) scale(1.03) rotate(6deg);
}

/* Spread out only on the X-axis */
.polaroid-stack:hover .polaroid-container:nth-child(1) {
    transform: translateX(-200px) scale(1.03) ;
}

.polaroid-stack:hover .polaroid-container:nth-child(2) {
    transform: translateX(0) scale(1.06); /* keep middle one centered */
}

.polaroid-stack:hover .polaroid-container:nth-child(3) {
    transform: translateX(200px) scale(1.03);
}


/* Individual polaroid hover effects */
.polaroid-container:hover .polaroid-image {
    transform: scale(1.05);
}

/* Add subtle glow on individual polaroid hover */
.polaroid-container:hover {
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(168, 85, 247, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

@media (max-width: 1000px) {
.story-text {
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;


    max-width: 800px;

    margin-left: 5%;
    margin-right: 5%;
    font-family: 'Sora';
    text-align: center;
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: rgba(255, 255, 255, 0.8);

          line-height: 1.6;
}
}

/* Story text styles */
.story-text {
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;


    max-width: 800px;
    margin: 0 auto 10px;
    font-family: 'Sora';
    text-align: left;
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: rgba(255, 255, 255, 0.8);

          line-height: 1.6;
}



.story-title {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    font-weight: 250;
    background: linear-gradient(135deg, #ffffff 0%, #06b6d4 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
    line-height: 1.1;
}

/* Responsive Design */
@media (max-width: 1000px) {
    .polaroid-stack {
        height: 380px;
        width: 300px;
        perspective: 800px;
        padding-left: 0px;
        margin-left: 0px;
    }

    .mission-title2 {
    text-align: center;}

    .polaroid-container {
        width: 220px;
        height: 280px;
        padding: 15px 15px 45px 15px;
    }

    .polaroid-image-wrapper {
        height: 180px;
    }

    .polaroid-caption {
        margin-top: 20px;
        font-size: 1.4rem;
        font-family: 'Written';
    }


}


  }


        .flexy p{
          margin: 0 auto;
          font-family: 'Sora';
          font-weight: 100;
          margin-top: 20px;
          font-size: 1.2rem;
          
        }

            .flexy {
            display: flex;
            justify-content: center;
            flex-direction: column;
            }

        .photo-container {
            position: relative;
            width: 80%;
            height: 60%;
            margin: 0 auto;

            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            grid-template-rows: 1fr 1fr;
            gap: 0.8rem;
            
            grid-template-areas:
                "hero secondary"
                "hero tertiary";
                
        }

        .hero-image {
            grid-area: secondary;
            width: 100%;
            height: 100%;
            min-height: 100px;
            object-fit: cover;
            border-radius: 16px;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            border: 2px solid rgba(255, 255, 255, 0.15);
        }



        .secondary-image {
            grid-area: hero;
            width: 100%;
            height: 100%;
            min-height: 180px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 2px solid rgba(255, 255, 255, 0.15);
        }

  
        .tertiary-image {
            grid-area: tertiary;
            width: 100%;
            height: 100%;
            min-height: 180px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 2px solid rgba(255, 255, 255, 0.15);
        }

   

    

@media (max-width: 1000px) {
    .polaroid-stack {
        height: 320px;
        width: 250px;
    }

    .polaroid-container {
        width: 180px;
        height: 230px;
        padding: 12px 12px 35px 12px;
    }

    .polaroid-image-wrapper {
        height: 140px;
    }

    .polaroid-caption {
        margin-top: 10px;
        font-size: 0.8rem;
    }

    /* More conservative hover effects on small screens */
    .polaroid-stack:hover .polaroid-container:nth-child(1) {
        transform: rotate(0deg) translateX(-100px) translateY(0px) translateZ(20px) scale(1.02);
    }

    .polaroid-stack:hover .polaroid-container:nth-child(2) {
        transform: rotate(0deg) translateY(-35px) translateZ(30px) scale(1.04);
    }

    .polaroid-stack:hover .polaroid-container:nth-child(3) {
        transform: rotate(18deg) translateX(60px) translateY(-20px) translateZ(15px) scale(1.01);
    }
}

/* Accessibility - Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .polaroid-stack,
    .polaroid-container,
    .polaroid-image {
        transition: none;
    }
    
    .polaroid-stack:hover .polaroid-container:nth-child(1),
    .polaroid-stack:hover .polaroid-container:nth-child(2),
    .polaroid-stack:hover .polaroid-container:nth-child(3) {
        transform: scale(1.02);
    }
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
  .mission-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;


  padding: 1rem;
}

.photo-grid {
  position: relative;
  width: 200%;
  height: 550px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
  grid-template-areas: 
    "main top"
    "main bottom";
}

.case-photo {
  grid-area: main;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.case-photo:hover {
  transform: rotate(2deg) translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3); 
}

.charplay {
  grid-area: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.charplay:hover {
  transform: rotate(-1deg) translateY(-5px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

.discs {
  grid-area: bottom;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.discs:hover {
  transform: rotate(3deg) translateY(-5px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

/* Add a subtle overlay effect */
.photo-grid::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    transparent 50%, 
    rgba(255, 255, 255, 0.05) 100%);
  border-radius: 20px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mission-title3{
display: none}






/* Responsive adjustments */
@media (max-width: 1000px) {
  .mission-visual {
    max-height: 100px;
    margin-bottom: 100px;
  }

  .mission-title, .mission-description{
        text-align: center;
  }
  
  .photo-grid {
    display: flex;
    flex-direction: row; /* makes it a row */
    gap: 12px;
    width: 50%;
    max-width: 360px;
    height: 300px;
    margin-left: 0px;
    padding-left: 0px
  
  }

  .mission-visual {
  margin-left: 0px;
    padding-left: 0px
  }

  .mission-grid {
  margin-left: 0px;
    padding-left: 0px
    }

    
    
  .case-photo,
  .charplay,
  .discs {
    border-radius: 12px;
  }
  
  .charplay {

  }
  
  .discs {

  }
}

@media (max-width: 480px) {
  .mission-visual {
    min-height: 00px;
    padding: 0.5rem;
  }
  
  .photo-grid {
    height: 380px;
    gap: 1rem;
  }
  
  .charplay,
  .discs {
    transform: none;
  }
  
  .charplay:hover,
  .discs:hover {
    transform: scale(1.02);
  }
}

/* Mobile Responsive Styles */
@media (max-width: 1000px) {
  .photo-grid, .mission-grid, .newsletter-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    justify-content: center;
    margin-left: 10px;
  }

  .how-it-works-title {
      font-size: 28px;
      }




  .mission-content {
    order: 1;
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
    padding: 0rem;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    border-radius: 20px;
  }

  .submit-btn {
    border-radius: 16px;
    justify-content: center;
  }
}

@media (max-width: 1000px) {
        .mission-section {
        width:100%;
          }
}

@media (max-width: 480px) {
  .mission-section,{
    padding: clamp(60px, 15vw, 100px) 15px;
    
  }

  .mission-section {
        margin-left: 0px;
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

        .photo-cap {
        display:none;}

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
        @media (max-width: 1000px) {
          .hero-section {
            height: auto;
            min-height: 100vh;
            padding: 40px 20px;
          }

          .feature-icon{
            margin-top: 30px;
          }

          .showcase-grid {
            grid-template-columns: 1fr;
            gap: 0rem;
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

        @media (max-width: 770px) {
          .showcase-section {
            padding-left: 0px;
            margin-left: 20px;
          
          }  
        }

        .body {
          overflow-x: hidden;
        }

        @media (max-width: 1000px) {


        .feature-item-list {
          display: flex;
          flex-direction: column;
          width: 80%;
          align-items: center;
          justify-content: center;

          padding: 0.8rem;
          background: rgba(252, 0, 168, 0.03);
          border: 1px solid rgba(151, 100, 202, 0.26);
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          align-items: center;
        }


        .demand {
          font-family: 'Sora';
          font-size: 10px;
          margin-bottom: 0px;
          margin-top: 0px;
          color: #df9de6d1;
          font-weight: 300;

        }

        .stat-item {
          text-align: center;
          min-width: 0;
          flex-shrink: 0;
        }

          .stat-number {
            font-size: 15px;
            font-weight: 300;
            background: linear-gradient(135deg, rgb(220, 52, 209) 0%, rgb(192, 137, 244) 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.rem;
            display: block;
          }

        .stat-label {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.79);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  max-width: 100px;
  
  white-space: normal;       /* allow wrapping */
  word-wrap: break-word;     /* break long words if needed */
  overflow-wrap: break-word; /* modern alternative */
  text-align: left;
}


        .flexy p{
        margin-top: 5px;
        min-height: 10vh;
        
        }


        .flexy {
        margin-top: 100px;

        }

        

        .footer-brand, .footer-brand2 {
            font-size: 0.75rem;
            line-height: 1.6;
            margin-left: 15px;
            margin-right:15px;
            text-align: center;
            
          }

            brand-name {
              background: linear-gradient(135deg, #ffffff 0%, #06b6d4 100%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: 600;
              
            }

            .footer-brand, .footer-brand2{

              font-weight: 200;
              color: #ffffff96;
              
            
            }

            .footer-brand span {

              font-weight: 600;
              
            
            }

            .footer-disclaimer {
              font-size: 0.6rem;
              margin-top: clamp(0.5rem, 2vw, 0.75rem);
              opacity: 0.3;
              transition: opacity 0.3s ease;
            }

.footer-disclaimer:hover {
  opacity: 1;
}


        .newsletter-section {
                          padding: 30px;
                          position: relative;
                          width: 100%;
                        }
                        .newsletter-card {
                          padding: clamp(1.5rem, 5vw, 2.5rem);
                        }

                        .newsletter-title {
                          font-size: 30px;
                          font-weight: 400;
                        
                          line-height: 1.1;
                          padding-top: 10px;
                          padding-bottom: 10px;
                        }

                        .newsletter-description {
                          font-size: clamp(0.9rem, 3vw, 1.25rem);
                          margin-bottom: 15px;
                          line-height: 1.6;
                          max-width: 100vw;
                          margin-left: auto;
                          margin-right: auto;
                          font-weight: 100;
                        }

                        .newsletter-stats {
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          /* Dynamic gap that scales with container width */
                          gap: clamp(1rem, 3vw, 4rem);
                          flex-wrap: wrap;
                          margin-bottom: 0px;
                      }

                        .stat-item {
                          text-align: center;
                          min-width: 0;
                          flex-shrink: 0;
                          display: flex;
                          gap: 0.4rem;
               
                        }

                        .stat-number {
                          font-size: 1.1rem;
                          font-weight: 600;
                          margin-bottom: 0rem;
                          display: block;
                    
                        }

                        .stat-label {
                          font-size: 0.6rem;
                          text-transform: uppercase;
                          letter-spacing: 0.05em;
                        }

                        .stat-divider {
                          width: 3px;
                          height: 30px;
                          flex-shrink: 0;
                        }

                        .form-container {
                          position: relative;
                          max-width: min(500px, 90vw);
                          width: 100%;
                          margin: 0 auto;
                        }

                        .form-group {
                          display: flex;
                          flex-direction: row;
                          gap: 8px;

                          position: relative;
                          margin-top: 10px;
                        }

                        .input-container {
                          flex: 1;
                          position: relative;
                          font-family: 'Sora';
                          width: 100%;
                        }

                        .email-input {
                          width: 100%;
                          background: rgba(255, 255, 255, 0.04);
                          border: 2px solid rgba(255, 255, 255, 0.1);
                          border-radius: clamp(12px, 3vw, 16px);
                          padding: clamp(0.8rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem);

                          font-size: clamp(0.9rem, 2.5vw, 1rem);
                          font-weight: 500;
                          transition: all 0.3s ease;
                          outline: none;
                          backdrop-filter: blur(20px);
                          box-sizing: border-box;
                        }

                        .email-input::placeholder {
                          color: rgba(255, 255, 255, 0.4);
                          font-weight: 200;

                        }

                     

                        .email-input.error {
                          border-color: rgba(239, 68, 68, 0.5);
                          background: rgba(239, 68, 68, 0.05);
                        }

                                .submitbtn{
                                  background: linear-gradient(135deg,rgba(64, 6, 212, 0.46) 0%,rgba(169, 85, 247, 0.63) 100%);
                                  border: none;
                                  border-radius: 15px;
                                  padding: 0px;
                                  color: #fff;
                                  font-weight: 400;
                                  font-size: 1rem;
                                  cursor: pointer;
                                  letter-spacing: 0.06em;
                                  padding: 11px;

                                  font-family: 'Sora';
                                }

                                .submitbtn:hover {

                        box-shadow: 0 20px 40px rgba(168, 85, 247, 0.4);

                        transition: all 0.3s ease;
                      }

        
                      .showcase-section,
                      .team-section {
                        
                        padding-left: 0px;
                        margin-left: 0px;
                        padding-right: 0px;
                        margin-right: 0px;

                      }

                      .hero-section {
                        padding: 30px 15px;
                      }


                      /*app showcase area*/
                      .phone-container {
                        width: 150px;
                        height: 300px;
                        margin-left: 0px;
                        margin-right: 0px;
                        margin-bottom: px;
                        
                      }

                      .showcase-title {
                        font-family : 'Sora';
                        font-size: 28px;
                        font-weight: 300;
                        background: linear-gradient(135deg, #dbbadaff 0%, #a855f7 100%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 1rem;
                        line-height: 1.1;
                      }

        
                      .showcase-description {
                          display: none;

                      }


                      .feature-list {
                        gap: 0.8rem;
                        flex-direction: row;
                        width: 95vw;
                        max-width: 95vw;  /* keep inside screen */
                        overflow-x: hidden;
                        flex-wrap: wrap;
                        margin: 0 auto;
                        text-align: center;
                      }



                      .point-icon {
                          width: 50px;
                          height: 50px;
                          border: 1px solid rgba(176, 142, 208, 0.3);
                          display: none;
                        }


                      .feature-text h3 {
                        font-size: 0.9rem;
                        font-weight: 400;
                        margin-bottom: 0.1rem;

                        background: linear-gradient(135deg,rgb(210, 109, 207) 0%,rgb(201, 129, 212) 100%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                      }

                      .feature-text p {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 0.75rem;
                        line-height: 1.5;
                      }

                      .feature-item {
                        flex-direction: row;
                        text-align: left;

                        gap: 0.3rem;
                        padding: 1rem;
                        margin-left: 10px;
                        margin-right: 10px;
                        width: 95vw;
                        max-width: 95vw;

                      }
                        .feature-item-graph {
                        flex-direction: column;
                        text-align: left;

                        gap: 0.3rem;
                        padding: 1rem;

                        width: 75vw;
                        max-width: 85vw;
                        margin: 0 auto;

                      }


                      .feature-icon {
                        margin: 0 auto;
                        display: none;
                      }

                      .floating-card {
                        position: absolute;
                        background: rgba(255, 255, 255, 0.02);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        padding: 8px;
                        animation: float 6s ease-in-out infinite;
                        font-size: 0.6rem;
                        white-space: nowrap;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                      }

                      .floating-card-1 {
                        top: 4%;
                        right: -100px;
                        animation-delay: 0s;
                      }

                      .floating-card-2 {
                        bottom: 40%;
                        left: -85px;
                        animation-delay: 2s;
                      }

                      .floating-card-3 {
                        top: 95%;
                        right: -80px;
                        animation-delay: 4s;
                      }


                      /*mission for small*/
                      
                        .photo-grid {
                          position: relative;
                          display: grid;
                          grid-auto-flow: row; /* ensures items stack vertically */
                          grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
                          grid-auto-columns: 1fr;
                          gap: 3rem;
                          max-width: 200px;   /* controls row width */
                        }


                            .mission-section {
                            width: 100%;
                            }

                            .mission-grid{
                                    margin-left:0px;
                                    padding-bottom: 0px;
                                    padding-top: 0px;
                                    gap: 0rem;
                                    margin-left: 4%;
          margin-right: 4%;
                                    

                            }

                            .mission-visual {
                                    margin-bottom: 0px;
                                    padding:0px;
                                    max-height: 50px;
                                    padding-right: 0px;
                            }
                                
                              .mission-description {
                              margin-bottom: 1.1rem;
                              margin-left: 5%;
                              margin-right: 5%;
                              text-align: left;
                              }

                              .mission-title {
                              margin-bottom: 1.1rem;
                              }

                                  /* Responsive breakpoints */

                        .photo-container {
                            display: flex;
                            flex-direction: row;
                            gap: 1rem;
                            grid-template-areas: none;
                            
                        }

                        .hero-image,
                        .secondary-image,
                        .tertiary-image {
                            flex: 1;
                            min-height: 200px;
                            max-height: 250px;
                        }
                    

                        .photo-showcase {
                            padding: 0.5rem;
                            order: 2;
  
                        }

                        .photo-container {
                            gap: 0.5rem;
                            margin-bottom: 0.8rem;
                            display: none;
                        }

                        .hero-image {
                          
                        display: none;}

                        .hero-image,
                        .secondary-image,
                        .tertiary-image {
                            min-height: 150px;
                            max-height: 120px;
                            grid-area: tertiary;
                        }
                    

                      /* backstory small */

                      .single-founder {
                        display: flex;
                        flex-direction: column;
                        
                        }



                          .founder-header {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 0rem;
                            margin-bottom: 0rem;
                          }

                          .founder-image-container {
                            position: relative;
                            width: 100px;
                            height: 100px;
                            border-radius: 20px;
                            overflow: hidden;
                            border: 2px solid rgba(255, 255, 255, 0.15);
                            transition: all 0.3s ease;
                            flex-shrink: 0;
                          }

                   

                          .founder-image {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transition: transform 0.3s ease;
                          }

                    

                          .founder-info {
                            flex: 1;
                            position: relative;
                            z-index: 10;
                            text-align: left;
                            margin-left: 20px;
                          }

                          .founder-name {
                            font-size: 19px;
                            font-weight: 300;
                            color: #fff;
                            margin-bottom: 0.5rem;
                          }

                          .founder-title-text {
                            font-size: 0.8rem;
                            color: #bb89e9ff;
                            font-weight: 500;
                            text-transform: uppercase;
                            letter-spacing: 0.05em;
                          }

                          .founder-bio {
                            color: rgba(255, 255, 255, 0.85);
                            line-height: 1.7;
                            margin-top: 1rem;
                            font-size: clamp(0.95rem, 2vw, 1.05rem);
                            position: relative;
                            z-index: 10;
                            text-align: left;
                            display: none;
                          }

                          .founder-bio-compact {
                            color: rgba(255, 255, 255, 0.85);
                            line-height: 1.7;
                            margin-top: 1rem;
                            font-size: clamp(0.95rem, 2vw, 1.05rem);
                            position: relative;
                            z-index: 10;
                            text-align: left;
                            font-weight: 200;
                            display: block;
                          
                          }


                      .mission-title2 {
                        font-family : 'Sora';
                        font-size: 35px;
                        font-weight: 300;
                        background: linear-gradient(135deg, #dbbadaff 0%, #a855f7 100%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 0.8rem;
                        line-height: 1.1;
                      }

                      .story-section {
                        max-width: 1400px;
                        margin: 0 auto;
                        padding: 80px 20px;

                        min-height: 80vh;

                        .story-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 3rem;
                text-align: center;
            }


            

/* NEEDS FIX */
                                
                    /* Polaroid Stack Container */
                    
                          }



                          /* will, charlie section*/

                                                
                      /* Right Column - Founders Cards */








                      /*newsletter*/
                      

        }



          @media (max-width: 1000px) {

          .feature-list {
          text-align:center;}


          .polaroid-stack {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height:100px;
                        margin-bottom: 30px;
                        margin-top: 20px;
                        width: 100%;
                        perspective: 1200px;
                        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }



                    .polaroid-container {
                        position: absolute;
                        width: 140px;
                        height: 190px;
                        border-radius: 5px;
                        padding: 10px 10px 40px 10px;
                        display: flex;
                        flex-direction: column;
                    }

                    /* Image container within polaroid */
                    .polaroid-image-wrapper {
                        width: 100%;
                        height: auto;
                        margin: 0 auto;
                      play: block;
                    }

                    .polaroid-caption {
                        margin-top: 13px;
                        text-align: center;
                        font-size: 1rem;
                        color: #333;
                        font-weight: 300;
                        line-height: 0;
                        
                        font-family: 'Written';
                        letter-spacing: 0px;

                    }

                    .story-text {
                      font-size: 16px;
                      font-weight: 200;
                    }

                    .polaroid-container:nth-child(1) {
                        transform: translateX(-100px) scale(1.03) rotate(-3deg);
                    }

                    .polaroid-container:nth-child(2) {
                        transform: translateX(0) scale(1.06) rotate(2deg);
                        z-index: 4;
                    }

                    .polaroid-container:nth-child(3) {
                        transform: translateX(100px) scale(1.03) rotate(3deg);
                    }

                        /* Adjusted hover positions for mobile */
                    .polaroid-stack:hover .polaroid-container:nth-child(1) {
                        transform:  translateX(-100px) translateY(10px) translateZ(0px) t scale(1.0);
                    }

                    .polaroid-stack:hover .polaroid-container:nth-child(2) {
                        transform:  translateY(0px) translateZ(0px) scale(1.06);
                    }

                    .polaroid-stack:hover .polaroid-container:nth-child(3) {
                        transform: translateX(100px) translateY(0px) translateZ(0px) scale(1.0);
                    }

                  .mission-title3 {
                                          font-family : 'Sora';
                                          font-size: 35px;
                                          font-weight: 300;
                                          background: linear-gradient(135deg, #dbbadaff 0%, #a855f7 100%);
                                          background-clip: text;
                                          -webkit-background-clip: text;
                                          -webkit-text-fill-color: transparent;
                                          margin-bottom: 0.8rem;
                                          padding-top: 250px;
                                          line-height: 1.1;
                                          margin:  auto;
                                          display: block;
                                        }




                                        
                              



                    .polaroid-container:hover {
                        box-shadow: 
                            0 20px 40px rgba(0, 0, 0, 0.2),
                            0 0 20px rgba(168, 85, 247, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.9); 

                        

                   
        } 


      }























        /* Large screens optimization */
        @media (min-width: 1400px) {
          .section-container {

          
          }

          .showcase-grid {
            gap: 00px;
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
          <button
            onClick={() => {
              document.getElementById("newsletter")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="scrollbtn"
          >
            Join the Waitlist
          </button>

          
        </div>

        <div className="scroll-arrow" onClick={() => {
    document.getElementById("showcase")?.scrollIntoView({
      behavior: "smooth",
    });
  }}>
    <ChevronDown size={32} />
  </div>

        
        
      </section>

      

      {/* App Showcase Section */}
      <section id="showcase" className="showcase-section" ref={addSectionRef}>
        <div className="section-container">
          <div className="showcase-grid">
            <div className="showcase-content">
              <h2 className="showcase-title">What is nowNoise?</h2>
              <p className="showcase-description">
                nowNoise is the social music app, designed for sharing the songs you're currently
                listening to, exploring hidden gems from others, and connecting through authentic, real-time
                disovery.
              </p>
              <p className="showcase-description-compact">
                Share your vibe. Discover something new. Connect through music
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="point-icon">
                    <Music size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Real-Time Sharing</h3>
                    <p>We'll randomly ask what you're listening to— post it. Skip the highlight reel, share your actual soundtrack. </p>
                  
                  </div>
                </div>
                <div className="feature-item">
                  <div className="point-icon">
                    <Heart size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Discover Hidden Gems</h3>
                    <p>
                      Explore rising artists, trending tracks, and most importantly, the tracks your friends love.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="point-icon">
                    <Users size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Connect Through Music</h3>
                    <p>Build friendships that go beyond surface level - connect through your actual musical tastes and find your musical community.</p>
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
                      <span>Make Connections</span>
                    </div>
                  </div>
                  <div className="floating-card floating-card-2">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={16} color="#4ecdc4" />
                      <span>Hidden Gems</span>
                    </div>
                  </div>
                  <div className="floating-card floating-card-3">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="#ffd93d" />
                      <span>Music Discovery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


     <section className="how-it-works-section" ref={addSectionRef}>
        <div className="section-container">
          <div className="how-it-works-grid">
            
            <div className='flexy'>
              <div className='photo-container-compact'>
                <img src={pg}></img>
              </div>
              <div class="photo-container">
                    <img src={cases} 
                        alt="Cases" 
                        class="hero-image"></img>
                    <img src={char} 
                        alt="Character" 
                        class="secondary-image"></img>
                    <img src={discs} 
                        alt="Discs" 
                        class="tertiary-image"></img>
                </div>
                <p className='photo-cap'>Let us rewind you to a simpler time.</p>
                </div>

                <div className="how-it-works-content">
              <h2 className="how-it-works-title">Why our 'Algorithm' Works</h2>
              <p className="how-it-works-description">
                We flipped the script—real people, not machines, guide your musical journey.</p>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3><span className='smallnum'>1. </span> Listen & Evolve</h3>
                    <p className='full'>We understand your music taste through what you actually listen to—not by tracking clicks or time spent—adapting to your changing preferences for continuous musical growth.</p>
                    <p className='short'>We learn your taste from what you actually listen to, not clicks or time spent.</p>
                </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content"> 
                    <h3> <span className='smallnum'>2. </span>Connect Listeners</h3>
                    <p className='full'>Discover music through your friends and like-minded listeners. We’ll match your taste and introduce you to fresh sounds and artists along the way.
</p>          
                    <p className='short'>You'll discover new music through your connections, and we'll also introduce you fresh sounds all the way.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3><span className='smallnum'>3. </span>Surface Hidden Gems</h3>
                    <p className='full'>We prioritise hidden gems and emerging artists that match your taste, helping you break free from mainstream loops.</p>
                  <p className='short'>We find hidden gems / emerging artists that match your taste, releasing you from the mainstream.</p>
                  </div>
                </div>
                
               
              </div>
            </div>
            

            
          </div>
        </div>
      </section>

      <section className="showcase-section" ref={addSectionRef}>
        <div className="section-container">
          <div className="showcase-grid">
            <div className="showcase-content">
              <h2 className="showcase-title">Our Mission Against Algorithms</h2>

              <div className="feature-list">
                <div className="feature-item">
                  <div className="point-icon">
                    <Music size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>The Changing Nature of Songs</h3>
                    <p className='full'>In recent years, songs have become shorter, faster, and more disposable. Artists are pushed to deliver instant hooks tailored to algorithms and 15-second TikTok clips.</p>
                    <p className='short'>Songs have become shorter, faster, and more disposable—tailored to algorithms and 15-second clips rather than artistry.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="point-icon">
                    <Heart size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Discover Hidden Gems</h3>
                    <p>Tracks are designed to go viral, not to last — made to feed the stream rather than spark a real connection.
    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="point-icon">
                    <Users size={20} />
                  </div>
                  <div className="feature-text">
                    <h3>Connect Through Music</h3>
                    <p className='full'>We believe music deserves more. Discovery shouldn’t be about chasing trends or tricking algorithms — it should be about people, stories, and the timeless feeling of finding a song that truly moves you.
                    </p>
                    <p className='short'>Music deserves more than chasing trends or tricking algorithms—it's about finding songs that truly move you.</p>

                  </div>
                </div>
                
              </div>
            </div>

            <div class="photo-showcase">


   






             


              <div className="algorithm-comparison">









    <div className='feature-item-graph'>


    <div className="chart-section">
      <div className="chart-wrapper" style={{  }}>
        <Bar data={data} options={options} />
      </div>
      <p className='btm-txt'>Avg. length of songs (s)</p>
    </div>
    


                                                                     
  <style jsx>{`
    .chart-container {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 32px;
      font-family: 'Sora';
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
     
    .chart-container p {
      font-weight: 100;
      font-size: 14px;
      font-family: 'Sora';
      margin-top: 10px;
      text-align: center;
    }
     
    .chart-section {
      width: 500px;
      
    
    }

    .btm-txt {  
      font-size: 15px;
      text-align: center;
      color: rgba(228, 159, 255, 0.8);
      margin-top: 5px;
    
    }
   
    .chart-wrapper {
      height: 300px;
      
     
    }
     
    @media (max-width: 999px) {
      .chart-container {
        padding: 0px;
        margin: 0 10px;
        max-width: 300px;
      }

      .btm-txt {
      font-size: 12px;
      
      }

      .chart-section {
        width: 75vw;
      }
                           
      .chart-wrapper {
        height: 150px; /* Shorter height on mobile */
      }
                           
      .chart-container p {
        font-size: 12px; /* Smaller text on mobile */
        margin-top: 8px;
      }
    }
   
    @media (max-width: 1000px) {
      .feature-item-list {
        display: none;
      }
    @media (max-width: 600px) {
      .chart-container {
        padding: 12px;
        border-radius: 12px;
      }

    
    }
  `}</style>

  

  <div className='feature-item-list'>
                  <div class="newsletter-stats">
                 
                      <div class="stat-item">
                        <span class="stat-number">94%</span>
                        <span class="stat-label">Approval</span>
                      </div>


                      <div class="stat-divider"></div>


                      <div class="stat-item">
                        <span class="stat-number">20+</span>
                        <span class="stat-label">Beta testers</span>
                      </div>


                      <div class="stat-divider"></div>


                      <div class="stat-item">
                        <span class="stat-number">∞</span>
                        <span class="stat-label">discoveries</span>
                      </div>
                    </div>
                    <p className='privacy-text-survey'>Based on a survey with 100+ applicants.</p>
                   
                    </div>

</div>
<div className='feature-list'>
  <div className="feature-item">
    <div className='statslist'>
    
                  <div class="newsletter-stats">
                 
                      <div class="stat-item">
                        <span class="stat-number">-24%</span>
                        <span class="stat-label">Song Length since 1990</span>
                      </div>


                      <div class="stat-divider"></div>


                      <div class="stat-item">
                        <span class="stat-number">1%</span>
                        <span class="stat-label"> of artists = 90% all streams</span>
                      </div>


                    </div>
                   
    </div>
                  
                    </div>
</div>







  </div>
 
 




                   
                    

               
               
                 


             


              </div>
           
               
                </div>
    


            


        
        </div>
      </section>
      






 
      


      
      <section className="founders-section" ref={addSectionRef}>
  <div className="section-container">
    <div className="founders-main-grid">
      
     

      {/* Right Column - Founder Cards */}
    
      <div className="founders-right-column">

        <h2 className="mission-title3">The Founders</h2>
        <div className="founder-card">
          <div className='single-founder'>
            <div className="founder-header">
            <div className="founder-image-container">
              <img src={will} alt="Will - Co-founder" className="founder-image" />
            
            </div>
            <div className='founder-info'>
              <h3 className="founder-name">William Encarnacion</h3>
              <p className="founder-title-text">Co-founder & Developer</p>
            </div>
            
            </div>
            
            
            <p className="founder-bio">
         An avid guitar player, vinyl collector, and coder, William is passionate about keeping the soul of music alive in a digital world. At nowNoise, he works to ensure that new technology enhances how we discover and share songs - without letting algorithms strip away the human connection.</p>
         <p className='founder-bio-compact'>A guitarist, vinyl collector, and coder, William ensures technology at nowNoise enhances music discovery without losing the human touch.</p>
          </div>
          

        
          
          <div className="stylized-line"></div>
          <div className='single-founder'><div className="founder-header">
            <div className="founder-image-container">
              <img src={charles} alt="Charlie - Co-founder" className="founder-image" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Charlie Ponambalum</h3>
              <p className="founder-title-text">Co-founder & Designer</p>
            </div>
          </div>
          <p className="founder-bio">
          As a classically trained musician and tech enthusiast, Charlie bridges artistry and innovation. His background in music production drives nowNoise’s mission to ensure technology amplifies creativity rather than replacing it.
          </p>
          <p className='founder-bio-compact'>A classically trained musician and tech enthusiast, Charlie drives nowNoise's mission to make technology enhance artistry, not replace it.</p>
          </div>

          
         
        </div>
      </div>

       {/* Left Column - Title and Story */}
      <div className="founders-left-column">
          <h2 className="mission-title2">Our Backstory</h2>

            <div class="story-content">
      <div class="polaroid-stack">
        

        <div class="polaroid-container">
            <div class="polaroid-image-wrapper">
            <img src={discuss} alt="Will and Charlie making music" class="polaroid-image"></img>
            </div>
            <div class="polaroid-caption">sharing music</div>
        </div>

        <div class="polaroid-container">
            <div class="polaroid-image-wrapper">
                <img src={friends} alt="Will and Charlie making music" class="polaroid-image"></img>
            </div>
            <div class="polaroid-caption">song-making sessions</div>
        </div>

        <div class="polaroid-container">
            <div class="polaroid-image-wrapper">
            <img src={play} alt="Will and Charlie making music" class="polaroid-image"></img>
            </div>
            <div class="polaroid-caption">listening</div>
        </div>
    </div>
    
    <div>
        <p class="story-text">
  We were tired of streaming apps pushing the same songs. The best discoveries have always come from friends, not algorithms. 
</p>
<p class="story-text">
  So we built a space that feels human again - no endless playlists, no filters, no noise. Just people sharing tracks they love and connecting through music that matters.</p>

    </div>
</div>

      </div>
      
    </div>
  </div>
</section>



      
      <section id="newsletter" className="founders-section" ref={addSectionRef}>
  <div className="section-container">
    <div className="founders-main-grid">
      
     

      {/* Right Column - Founder Cards */}
    
      <div className="founders-right-column">

        <div className="founder-card">
          <h2 className="newsletter-title">Don't Miss the Drop</h2>
      <p className="newsletter-description">
        Join our early community and be the first to explore what’s next in sound.
      </p>

      <div className="email-stats">
        <div className="email-item">
          <span className="email-number">94%</span>
          <span className="email-label">Approval</span>
        </div>
        <div className="email-divider"></div>
        <div className="email-item">
          <span className="email-number">20+</span>
          <span className="email-label">beta testers</span>
        </div>
        <div className="email-divider"></div>
        <div className="email-item">
          <span className="email-number">100M+</span>
          <span className="email-label">tracks</span>
        </div>
        
      </div>

      <p className="stat-text">Based on a survey of 100+ participants</p>

      <form
        action="https://formspree.io/f/xdkdvbpp"
        method="POST"
        className="form-container"
      >
        <div className="form-group">
          <label className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="email-input"
            />
          </label>
          <button type="submit" className="submitbtn">
            Join Now
          </button>
        </div>
      </form>

     
        
 
          
         
        </div>
      </div>

  
      
    </div>
  </div>
</section>


 
      


<footer class="w-full text-gray-300 text-center py-6">
  <div class="footer-content">
    <p class="footer-brand">
      <span class="brand-name">nowNoise</span> — Innovating sound experiences for the future.
      
    </p>
    <p class="footer-brand2">Contact Us  <span className='brand-name2'>team@nownoiseapp.com</span></p>
    

    <p class="footer-disclaimer">
      All demo features are prototypes and subject to change without notice.
    </p>
  </div>
</footer>




      
    </div>
  );
};

export default ModernAnimatedSite;
