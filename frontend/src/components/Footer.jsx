import React from "react";
import { Link } from "react-scroll";
import { FaLinkedin, FaTwitter, FaInstagram, FaDribbble, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Studio",
      links: [
        { name: "San Francisco", to: "Hero", icon: <FaMapMarkerAlt className="w-3 h-3" /> },
        { name: "+1 (555) 123-4567", to: "Hero", icon: <FaPhone className="w-3 h-3" /> },
        { name: "hello@whipsaw.com", to: "Hero", icon: <FaEnvelope className="w-3 h-3" /> }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Product Design", to: "services" },
        { name: "Design Strategy", to: "services" },
        { name: "Engineering", to: "services" },
        { name: "Brand Development", to: "services" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", to: "about" },
        { name: "Services", to: "services" },
        { name: "Contact", href: "/contact", isExternal: true } // <-- Contact uses anchor
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin className="w-4 h-4" />, name: "LinkedIn", href: "#" },
    { icon: <FaTwitter className="w-4 h-4" />, name: "Twitter", href: "#" },
    { icon: <FaInstagram className="w-4 h-4" />, name: "Instagram", href: "#" },
    { icon: <FaDribbble className="w-4 h-4" />, name: "Dribbble", href: "#" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 mb-6 cursor-pointer">
              <div className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                WHIPSAW
              </div>
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-cyan-400">
                <HiSparkles className="w-5 h-5" />
              </motion.div>
            </motion.div>

            <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
              A premier design and innovation firm transforming bold ideas into extraordinary products and experiences that redefine categories.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links with react-scroll or anchor */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="space-y-6">
              <h4 className="text-lg font-semibold text-white">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 group"
                      >
                        {link.icon && (
                          <span className="text-gray-500 group-hover:text-cyan-400 transition-colors">{link.icon}</span>
                        )}
                        <span>{link.name}</span>
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        smooth={true}
                        duration={800}
                        className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 group cursor-pointer"
                      >
                        {link.icon && (
                          <span className="text-gray-500 group-hover:text-cyan-400 transition-colors">{link.icon}</span>
                        )}
                        <span>{link.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© {currentYear} Whipsaw Inc. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              {[
                { name: "Privacy Policy", to: "Hero" },
                { name: "Terms of Service", to: "Hero" },
                { name: "Cookie Policy", to: "Hero" }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={800}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            animate={{ y: [0, -20, 0], x: [0, Math.sin(i) * 10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5 }}
            style={{ left: `${20 + i * 30}%`, bottom: '10%' }}
          />
        ))}
      </div>
    </footer>
  );
}

export default Footer;
