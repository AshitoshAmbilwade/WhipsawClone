import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'; // For navigation

function Hero() {
  const navigate = useNavigate(); // For navigating to /blog
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      if (cursorRef.current) {
        cursorRef.current.style.left = `${clientX}px`;
        cursorRef.current.style.top = `${clientY}px`;
        
        const hueX = (clientX / window.innerWidth) * 360;
        const hueY = (clientY / window.innerHeight) * 360;
        const averageHue = (hueX + hueY) / 2;
        
        cursorRef.current.style.background = 
          `radial-gradient(circle, 
           hsla(${averageHue}, 80%, 60%, 0.4) 0%, 
           hsla(${(averageHue + 60) % 360}, 70%, 50%, 0.3) 30%, 
           hsla(${(averageHue + 120) % 360}, 60%, 40%, 0.2) 50%,
           transparent 70%)`;
      }

      if (containerRef.current) {
        const gradientElements = containerRef.current.querySelectorAll('.dynamic-gradient');
        gradientElements.forEach((grad, index) => {
          const hue = ((clientX / window.innerWidth) * 360 + (index * 120)) % 360;
          grad.style.background = `radial-gradient(circle, hsla(${hue}, 70%, 50%, 0.15) 0%, transparent 70%)`;
        });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) {
    return (
      <section className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative h-screen bg-black text-white overflow-hidden"
    >
      {/* Desktop cursor lighting */}
      {!isMobile && (
        <>
          <motion.div
            ref={cursorRef}
            className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-100"
            style={{ transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="fixed pointer-events-none z-0 w-64 h-64 transition-all duration-300"
            style={{
              background: `radial-gradient(circle, hsla(${(mousePosition.x / window.innerWidth) * 360}, 70%, 50%, 0.2) 0%, transparent 70%)`,
              left: `${(mousePosition.x / window.innerWidth) * 100}%`,
              top: `${(mousePosition.y / window.innerHeight) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      )}

      {/* Dynamic gradients */}
      <div className="absolute inset-0">
        <motion.div
          className="dynamic-gradient absolute top-20 left-10 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl transition-all duration-500"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="dynamic-gradient absolute bottom-20 right-10 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-all duration-500"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="dynamic-gradient absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-64 md:h-64 rounded-full blur-3xl transition-all duration-500"
          animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center w-full max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 md:mb-8">
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">WHIPSAW</span>
            </motion.h1>
            <motion.div initial={{ width: 0 }} animate={{ width: isMobile ? "120px" : "200px" }} transition={{ duration: 1, delay: 1 }} className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 mx-auto rounded-full" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-light">
            Where <span className="text-cyan-300 font-medium">innovation</span> meets <span className="text-purple-300 font-medium">design</span>. Creating digital experiences that transform businesses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection('services')} className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Explore Our Work
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.8)", backgroundColor: "rgba(139, 92, 246, 0.1)" }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/contact')} className="px-8 py-4 rounded-full border-2 border-purple-500/30 bg-purple-500/5 backdrop-blur-sm text-white font-bold text-lg hover:bg-purple-500/10 transition-all duration-300 group">
              <span className="flex items-center gap-2">
                Start Project
                <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
              </span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/blog')} className="px-8 py-4 rounded-full border-2 border-cyan-500/40 bg-cyan-500/5 backdrop-blur-sm text-white font-bold text-lg hover:bg-cyan-500/10 transition-all duration-300 group">
              Read Our Blog
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="hidden sm:grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
            {[{ number: "150+", label: "Projects" }, { number: "98%", label: "Satisfaction" }, { number: "25+", label: "Awards" }].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }} className="text-center group cursor-pointer" whileHover={{ scale: 1.05 }}>
                <div className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{stat.number}</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center text-gray-400 hover:text-cyan-300 cursor-pointer group" onClick={() => scrollToSection('about')}>
            <span className="text-sm mb-2 group-hover:text-white transition-colors">Scroll to discover</span>
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center group-hover:border-cyan-400 transition-colors">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-3 bg-gray-600 rounded-full mt-2 group-hover:bg-cyan-400 transition-colors" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full" />
        <motion.div animate={{ y: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute bottom-32 right-16 w-3 h-3 bg-purple-400 rounded-full" />
      </div>
    </section>
  );
}

export default Hero;
