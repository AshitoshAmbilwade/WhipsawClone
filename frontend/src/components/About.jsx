import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Whipsaw-style content - more professional and design-focused
  const principles = [
    {
      title: "Human-Centered Design",
      description: "We create products and experiences that resonate with people on an emotional level while delivering exceptional functionality.",
      number: "01"
    },
    {
      title: "Strategic Innovation",
      description: "Our approach combines deep market insights with technological foresight to deliver groundbreaking solutions.",
      number: "02"
    },
    {
      title: "Holistic Thinking",
      description: "We consider every aspect of the user journey, from initial concept to final implementation and beyond.",
      number: "03"
    }
  ];

  const specialties = [
    {
      category: "Product Design",
      items: ["User Experience", "Interface Design", "Design Systems", "Prototyping"]
    },
    {
      category: "Strategy & Innovation",
      items: ["Design Research", "Product Strategy", "Brand Development", "Market Analysis"]
    },
    {
      category: "Engineering",
      items: ["Frontend Development", "3D Visualization", "IoT Integration", "Technical Architecture"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-32 bg-gray-300 text-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section - Whipsaw Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-px bg-gray-300 mb-6"></div>
            <h2 className="text-sm font-medium text-gray-500 tracking-widest uppercase">
              About Whipsaw
            </h2>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight"
          >
            We design the future
            <br />
            <span className="text-gray-400">through innovation</span>
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 max-w-6xl"
          >
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Whipsaw is a premier industrial design and engineering firm that 
              transforms bold ideas into extraordinary products and experiences.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Founded in San Francisco, we've spent over two decades partnering 
              with visionary companies to create products that redefine categories 
              and set new standards for design excellence.
            </p>
          </motion.div>
        </motion.div>

        {/* Principles Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-32"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h4 className="text-2xl md:text-3xl font-light text-gray-800">
              Our Design Philosophy
            </h4>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.number}
                variants={itemVariants}
                className="group"
              >
                <div className="flex items-start mb-6">
                  <span className="text-4xl font-light text-gray-300 mr-4">
                    {principle.number}
                  </span>
                  <div className="w-12 h-px bg-gray-300 mt-6"></div>
                </div>
                <h5 className="text-xl font-medium text-gray-900 mb-4">
                  {principle.title}
                </h5>
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specialties Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-32"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h4 className="text-2xl md:text-3xl font-light text-gray-800">
              Our Expertise
            </h4>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.category}
                variants={itemVariants}
                className="group"
              >
                <h5 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {specialty.category}
                </h5>
                <ul className="space-y-3">
                  {specialty.items.map((item, itemIndex) => (
                    <li 
                      key={item}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section - Minimalist */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t border-gray-200 pt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Years of Excellence" },
              { number: "300+", label: "Products Designed" },
              { number: "150+", label: "Design Awards" },
              { number: "50+", label: "Industry Partners" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-32"
        >
          <div className="max-w-2xl mx-auto">
            <motion.h4
              className="text-2xl md:text-3xl font-light text-gray-800 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Ready to create something extraordinary?
            </motion.h4>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-900 text-white font-medium text-lg transition-all duration-300 hover:bg-gray-800"
              >
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-gray-300 text-gray-700 font-medium text-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gray-100"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gray-100"></div>
      </div>
    </section>
  );
}

export default About;