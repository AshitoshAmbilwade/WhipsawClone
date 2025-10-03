import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";

function ContactForm() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    company: "",
    subject: "",
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
      // Simulate API call - replace with your actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // await sendContactForm(formData);
      
      setStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", company: "", subject: "", message: "" });
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
      id="contact" 
      ref={ref}
      className="relative py-32 bg-gray-300 text-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-px bg-gray-300 mb-6 mx-auto"></div>
            <h2 className="text-sm font-medium text-gray-500 tracking-widest uppercase">
              Get In Touch
            </h2>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl font-light mb-8 leading-tight"
          >
            Let's Create
            <br />
            <span className="text-gray-400">Something Amazing</span>
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl text-gray-600 leading-relaxed">
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
            className="space-y-12"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="group cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">
                      {info.title}
                    </h4>
                    {info.details.map((detail, idx) => (
                      <p 
                        key={idx}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-gray-200"
            >
              <h4 className="text-lg font-medium text-gray-900 mb-6">
                Follow Our Work
              </h4>
              <div className="flex space-x-6">
                {[
                  { icon: <FaLinkedin />, label: "LinkedIn", url: "#" },
                  { icon: <FaTwitter />, label: "Twitter", url: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
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
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              variants={itemVariants}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-3">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-3">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="new-project">New Project</option>
                    <option value="partnership">Partnership</option>
                    <option value="careers">Careers</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project, timeline, and budget..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gray-900 text-white font-medium text-lg rounded-lg transition-all duration-300 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      ⏳
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    status.includes("Thank you") 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status}
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 pt-20 border-t border-gray-200"
        >
          <p className="text-gray-500">
            We typically respond to all inquiries within 24 hours during business days.
          </p>
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
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gray-100"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gray-100"></div>
      </div>
    </section>
  );
}

export default ContactForm;