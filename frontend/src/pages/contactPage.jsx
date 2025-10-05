/* import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";
import { sendContactForm as sendContactFormApi } from "../api/contactApi";

function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      await sendContactFormApi(formData);
      setStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-lg" />,
      title: "Visit Our Studio",
      details: ["123 Design Street", "San Francisco, CA 94103"],
      link: "#"
    },
    {
      icon: <FaPhone className="text-lg" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM PST"],
      link: "tel:+15551234567"
    },
    {
      icon: <FaEnvelope className="text-lg" />,
      title: "Email Us",
      details: ["hello@whipsaw.com", "info@whipsaw.com"],
      link: "mailto:hello@whipsaw.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden"
    >
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6 mx-auto"></div>
            <h2 className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">
              Get In Touch
            </h2>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            Let's Create
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </motion.h3>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to bring your vision to life? Let's discuss how we can help 
              transform your ideas into exceptional products and experiences.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="group cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-6">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p 
                          key={idx}
                          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-gray-700"
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                Follow Our Work
              </h4>
              <div className="flex space-x-4">
                {[{ icon: <FaLinkedin />, label: "LinkedIn", url: "#" },
                  { icon: <FaTwitter />, label: "Twitter", url: "#" }]
                  .map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      className="w-12 h-12 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl p-8"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-300"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center border backdrop-blur-md ${
                      status.includes("Thank you") 
                        ? "bg-green-500/20 text-green-200 border-green-500/30" 
                        : "bg-red-500/20 text-red-200 border-red-500/30"
                    }`}
                  >
                    {status}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 pt-20 border-t border-gray-700"
        >
          <p className="text-gray-400">
            We typically respond to all inquiries within 24 hours during business days.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactPage;  
 */

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        "service_nwlp0t6",   
        "template_ejw6b59",  
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "Df8kmPTF9MyzGtbVd"    
      );

      setStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-lg" />,
      title: "Visit Our Studio",
      details: ["123 Design Street", "San Francisco, CA 94103"],
      link: "#"
    },
    {
      icon: <FaPhone className="text-lg" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM PST"],
      link: "tel:+15551234567"
    },
    {
      icon: <FaEnvelope className="text-lg" />,
      title: "Email Us",
      details: ["hello@whipsaw.com", "info@whipsaw.com"],
      link: "mailto:hello@whipsaw.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6 mx-auto"></div>
            <h2 className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">
              Get In Touch
            </h2>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            Let's Create
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </motion.h3>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to bring your vision to life? Let's discuss how we can help 
              transform your ideas into exceptional products and experiences.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="group cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-6">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p 
                          key={idx}
                          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-gray-700"
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                Follow Our Work
              </h4>
              <div className="flex space-x-4">
                {[{ icon: <FaLinkedin />, label: "LinkedIn", url: "#" },
                  { icon: <FaTwitter />, label: "Twitter", url: "#" }].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    className="w-12 h-12 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-300"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center border backdrop-blur-md ${
                      status.includes("Thank you") 
                        ? "bg-green-500/20 text-green-200 border-green-500/30" 
                        : "bg-red-500/20 text-red-200 border-red-500/30"
                    }`}
                  >
                    {status}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 pt-20 border-t border-gray-700"
        >
          <p className="text-gray-400">
            We typically respond to all inquiries within 24 hours during business days.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactPage;
