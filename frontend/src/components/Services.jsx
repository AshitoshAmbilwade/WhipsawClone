import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {useNavigate} from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "product design", "strategy", "engineering", "branding"];

  const projects = [
    {
      id: 1,
      title: "Smart Home Ecosystem",
      description: "Complete IoT home automation system with seamless device integration and intuitive mobile control.",
      category: "product design",
      image: "/api/placeholder/600/400",
      client: "TechHome Inc.",
      year: "2023",
      awards: ["Red Dot Award", "iF Design Award"]
    },
    {
      id: 2,
      title: "Medical Device Innovation",
      description: "Next-generation diagnostic equipment with enhanced accuracy and patient comfort features.",
      category: "engineering",
      image: "/api/placeholder/600/400",
      client: "MedTech Solutions",
      year: "2023",
      awards: ["Medical Design Excellence"]
    },
    {
      id: 3,
      title: "Luxury Automotive UI",
      description: "Digital cockpit experience for premium electric vehicle with adaptive interface and haptic feedback.",
      category: "product design",
      image: "/api/placeholder/600/400",
      client: "AutoLux Motors",
      year: "2022",
      awards: ["Automotive Innovation Award"]
    },
    {
      id: 4,
      title: "Sustainable Packaging",
      description: "Eco-friendly product packaging system using biodegradable materials and smart manufacturing.",
      category: "branding",
      image: "/api/placeholder/600/400",
      client: "GreenLife Products",
      year: "2022",
      awards: ["Sustainable Design Award"]
    },
    {
      id: 5,
      title: "Enterprise SaaS Platform",
      description: "Comprehensive business management suite with AI-powered analytics and workflow automation.",
      category: "strategy",
      image: "/api/placeholder/600/400",
      client: "WorkFlow Pro",
      year: "2023",
      awards: ["Business Innovation"]
    },
    {
      id: 6,
      title: "Consumer Electronics",
      description: "Wireless audio devices with advanced noise cancellation and sustainable material choices.",
      category: "product design",
      image: "/api/placeholder/600/400",
      client: "SoundSphere",
      year: "2022",
      awards: ["CES Innovation Award"]
    }
  ];

  const services = [
    {
      title: "Product Design",
      description: "End-to-end product development from concept to manufacturing-ready designs.",
      icon: "📐",
      features: ["User Research", "Prototyping", "3D Modeling", "CMF Strategy"]
    },
    {
      title: "Design Strategy",
      description: "Strategic planning and innovation consulting to guide product development.",
      icon: "🎯",
      features: ["Market Analysis", "Product Roadmaps", "Innovation Workshops", "Brand Positioning"]
    },
    {
      title: "Engineering",
      description: "Technical development and engineering solutions for complex product challenges.",
      icon: "⚙️",
      features: ["Mechanical Engineering", "Electronics", "Software Integration", "Testing & Validation"]
    },
    {
      title: "Brand Development",
      description: "Comprehensive brand identity and market positioning strategies.",
      icon: "✨",
      features: ["Brand Identity", "Packaging Design", "Visual Systems", "Market Launch"]
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="services" 
      ref={ref}
      className="relative py-32 bg-white text-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-px bg-gray-300 mb-6"></div>
            <h2 className="text-sm font-medium text-gray-500 tracking-widest uppercase">
              Our Services
            </h2>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl font-light mb-8 leading-tight"
          >
            Design
            <br />
            <span className="text-gray-400">Innovation</span>
            <br />
            <span className="text-gray-600">Execution</span>
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 max-w-6xl"
          >
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We deliver comprehensive design and engineering services 
              that transform ideas into market-leading products.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Our multidisciplinary approach combines strategic thinking 
              with technical excellence to create solutions that resonate 
              with users and drive business success.
            </p>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-32"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl font-medium text-gray-900 mb-4">
                  {service.title}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li 
                      key={idx}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    >
                      • {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-px bg-gray-300 mb-6"></div>
            <h2 className="text-sm font-medium text-gray-500 tracking-widest uppercase">
              Featured Work
            </h2>
          </motion.div>

          <motion.h4
            variants={itemVariants}
            className="text-3xl md:text-4xl font-light text-gray-800 mb-8"
          >
            Selected Projects
          </motion.h4>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Project Image</span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="text-white text-lg font-medium"
                  >
                    View Project →
                  </motion.span>
                </div>
                
                {/* Awards Badge */}
                {project.awards.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white text-xs font-medium text-gray-700">
                      Award Winning
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h5 className="text-xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h5>
                  <span className="text-sm text-gray-400">{project.year}</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{project.client}</span>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
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
              Have a project in mind?
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
                onClick ={()=>navigate("/contact")}
              >
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-gray-300 text-gray-700 font-medium text-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
              >
                Download Capabilities Deck
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>
    </section>
  );
}

export default Services;