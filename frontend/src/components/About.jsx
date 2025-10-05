import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const principles = [
    {
      title: "Human-Centered Design",
      description:
        "We create products and experiences that resonate with people on an emotional level while delivering exceptional functionality.",
      number: "01",
    },
    {
      title: "Strategic Innovation",
      description:
        "Our approach combines deep market insights with technological foresight to deliver groundbreaking solutions.",
      number: "02",
    },
    {
      title: "Holistic Thinking",
      description:
        "We consider every aspect of the user journey, from initial concept to final implementation and beyond.",
      number: "03",
    },
  ];

  const specialties = [
    {
      category: "Product Design",
      items: [
        "User Experience",
        "Interface Design",
        "Design Systems",
        "Prototyping",
      ],
    },
    {
      category: "Strategy & Innovation",
      items: [
        "Design Research",
        "Product Strategy",
        "Brand Development",
        "Market Analysis",
      ],
    },
    {
      category: "Engineering",
      items: [
        "Frontend Development",
        "3D Visualization",
        "IoT Integration",
        "Technical Architecture",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-px bg-cyan-500 mb-6"></div>
            <h2 className="text-sm font-medium text-cyan-400 tracking-widest uppercase">
              About Whipsaw
            </h2>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight"
          >
            We design the future
            <br />
            <span className="text-gray-300">through innovation</span>
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 max-w-6xl"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Whipsaw is a premier industrial design and engineering firm that
              transforms bold ideas into extraordinary products and experiences.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Founded in San Francisco, we've spent over two decades partnering
              with visionary companies to create products that redefine
              categories and set new standards for design excellence.
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
            <h4 className="text-2xl md:text-3xl font-light text-cyan-400">
              Our Design Philosophy
            </h4>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
            {principles.map((principle) => (
              <motion.div
                key={principle.number}
                variants={itemVariants}
                className="group"
              >
                <div className="flex items-start mb-6">
                  <span className="text-4xl font-light text-cyan-500 mr-4">
                    {principle.number}
                  </span>
                  <div className="w-12 h-px bg-cyan-500 mt-6"></div>
                </div>
                <h5 className="text-xl font-semibold text-gray-100 mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {principle.title}
                </h5>
                <p className="text-gray-400 leading-relaxed">
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
            <h4 className="text-2xl md:text-3xl font-light text-cyan-400">
              Our Expertise
            </h4>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            {specialties.map((specialty) => (
              <motion.div
                key={specialty.category}
                variants={itemVariants}
                className="group"
              >
                <h5 className="text-lg font-medium text-gray-200 mb-6 pb-2 border-b border-gray-700">
                  {specialty.category}
                </h5>
                <ul className="space-y-3">
                  {specialty.items.map((item) => (
                    <li
                      key={item}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t border-gray-800 pt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Years of Excellence" },
              { number: "300+", label: "Products Designed" },
              { number: "150+", label: "Design Awards" },
              { number: "50+", label: "Industry Partners" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-light text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
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
              className="text-2xl md:text-3xl font-light text-gray-200 mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Ready to create something extraordinary?
            </motion.h4>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {/* Start a Project Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0,255,200,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/contact")}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 
                   text-gray-900 font-semibold text-lg tracking-wide 
                   transition-all duration-500 hover:from-cyan-300 hover:to-emerald-300"
              >
                Start a Project
              </motion.button>

              {/* View Our Work Button - Scrolls to Services */}
              <motion.button
                whileHover={{ scale: 1.05, color: "#5eead4" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const section = document.getElementById("services");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 py-4 rounded-full border border-cyan-400 
                   text-cyan-300 font-semibold text-lg tracking-wide 
                   transition-all duration-500 hover:bg-cyan-400/10 hover:border-cyan-300"
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </section>
  );
}

export default About;
