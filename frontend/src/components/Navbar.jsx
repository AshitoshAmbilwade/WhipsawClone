import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Hero", to: "Hero", type: "link" },
    { name: "About", to: "about", type: "link" },
    { name: "Services", to: "services", type: "link" },
    { name: "Contact", to: "contact", type: "link" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5 } 
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo - Minimalist like Whipsaw */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <motion.div
                className={`text-xl lg:text-2xl font-bold tracking-tight ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                WHIPSAW
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-80"
              />
            </div>

            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`opacity-70 ${scrolled ? "text-gray-600" : "text-white"}`}
            >
              <HiLightningBolt size={16} />
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-12"
            >
              {links.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  {link.name === "Contact" ? (
                    <a
                      href="/contact"
                      className={`relative font-medium text-sm tracking-wide transition-all duration-300 group ${
                        scrolled 
                          ? "text-gray-700 hover:text-gray-900" 
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {link.name}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={800}
                      className={`relative font-medium text-sm tracking-wide transition-all duration-300 group ${
                        scrolled 
                          ? "text-gray-700 hover:text-gray-900" 
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {link.name}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled 
                ? "text-gray-700 hover:bg-gray-100" 
                : "text-white hover:bg-white/10"
            }`}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 overflow-hidden"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-6 py-6 space-y-1"
            >
              {links.map((link) => (
                <motion.div
                  key={link.name}
                  variants={itemVariants}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {link.name === "Contact" ? (
                    <a
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block py-4 text-gray-700 hover:text-gray-900 font-medium transition-colors text-lg"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={800}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 text-gray-700 hover:text-gray-900 font-medium transition-colors text-lg"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 px-6 py-4 border-t border-gray-100"
            >
              <div className="text-center text-sm text-gray-600">
                <p>San Francisco • Since 1999</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
