import { useEffect, useState } from "react";
import { getAllPosts as getPosts } from "../api/blogApi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen, Clock, Eye } from "lucide-react";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then(posts => {
        // Ensure dates are properly handled
        const postsWithFormattedDates = posts.map(post => ({
          ...post,
          displayDate: post.createdAt ? new Date(post.createdAt) : new Date()
        }));
        setPosts(postsWithFormattedDates);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -12,
      rotateY: 5,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Format date function
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get reading time estimate
  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white font-light text-lg"
          >
            Loading creative insights...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-1000 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header with Glass Morphism */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4 shadow-2xl mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-sm font-semibold text-white uppercase tracking-widest">
                Creative Chronicles
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl lg:text-8xl font-black text-white mb-6"
            >
              OUR
              <motion.span
                initial={{ backgroundPosition: "0%" }}
                animate={{ backgroundPosition: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                BLOG
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Dive into the world of design innovation, creative processes, and 
              groundbreaking ideas that shape tomorrow's experiences.
            </motion.p>
          </motion.div>

          {/* Admin Access - Floating Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="fixed top-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(255,255,255,0.2)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/admin/login")}
              className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold border border-white/20 shadow-2xl flex items-center gap-3"
            >
              <User className="w-4 h-4" />
              Admin Portal
            </motion.button>
          </motion.div>

          {/* Blog Posts Grid */}
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20"
              >
                <BookOpen className="w-16 h-16 text-white/60" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Crafting Masterpieces
              </h3>
              <p className="text-white/60 max-w-md mx-auto text-lg">
                Our creative team is working on exceptional content that will inspire and innovate. 
                The first story is coming soon!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {posts.map((post, index) => {
                const featuredImage = post.images?.[0];
                const readingTime = getReadingTime(post.content);

                return (
                  <motion.article
                    key={post._id}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                    className="group cursor-pointer perspective-1000"
                    onClick={() => navigate(`/blog/${post._id}`)}
                  >
                    <motion.div
                      variants={hoverVariants}
                      className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden h-full flex flex-col transform-style-preserve-3d"
                    >
                      {/* Featured Image with Gradient Overlay */}
                      {featuredImage && (
                        <div className="relative h-56 overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.15, rotate: 2 }}
                            transition={{ duration: 0.6 }}
                            src={featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Date Badge */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-medium"
                          >
                            {formatDate(post.displayDate)}
                          </motion.div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          {/* Category Tag */}
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4"
                          >
                            Design
                          </motion.span>

                          <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
                            {post.title}
                          </h2>
                          
                          <p className="text-white/70 mb-6 line-clamp-3 leading-relaxed font-light">
                            {post.content.substring(0, 120)}...
                          </p>
                        </div>

                        {/* Meta Information */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-white/60">
                              <User className="w-4 h-4" />
                              <span className="font-medium">{post.author || "Creative Team"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/60">
                              <Clock className="w-4 h-4" />
                              <span>{readingTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Additional Images Preview */}
                        {post.images && post.images.length > 1 && (
                          <div className="flex gap-2 mb-4">
                            {post.images.slice(1, 4).map((img, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white/30"
                              >
                                <img
                                  src={img}
                                  alt={`post ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            ))}
                            {post.images.length > 4 && (
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-xs font-medium text-white/60 border border-white/30">
                                +{post.images.length - 4}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Read More Button */}
                        <motion.div
                          whileHover={{ x: 10 }}
                          className="flex items-center justify-between pt-4 border-t border-white/20"
                        >
                          <span className="text-cyan-300 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                            Explore Insights
                            <ArrowRight className="w-4 h-4" />
                          </span>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="text-white/40 group-hover:text-cyan-300 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Join Our Creative Journey
              </h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto text-lg">
                Get exclusive design insights and creative breakthroughs delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <motion.input
                  whileFocus={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.5)" }}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    background: "linear-gradient(45deg, #06b6d4, #3b82f6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;