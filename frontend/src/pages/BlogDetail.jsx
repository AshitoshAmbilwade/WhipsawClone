import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../api/blogApi";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark,
  Eye,
  MessageCircle,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ArrowRight,
  Heart
} from "lucide-react";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPostById(id)
      .then(postData => {
        if (postData) {
          // Proper date handling with validation
          let postDate;
          if (postData.createdAt) {
            const date = new Date(postData.createdAt);
            postDate = isNaN(date.getTime()) ? new Date() : date;
          } else {
            postDate = new Date();
          }
          
          postData.formattedDate = postDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          postData.fullDateTime = postDate.toISOString();
        }
        setPost(postData);
      })
      .catch(error => {
        console.error("Error fetching post:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const getReadingTime = (content) => {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || '');
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
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
            Loading article...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/blog')}
            className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
          >
            Back to Blog
          </motion.button>
        </div>
      </div>
    );
  }

  const featuredImage = post.images?.[0];
  const readingTime = getReadingTime(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Modern Glass Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/blog')}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Blog</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-xl transition-colors ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800/50 text-gray-400 hover:text-white p-2 rounded-xl border border-gray-700 transition-colors"
              >
                <Bookmark className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article - 8 columns */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              {/* Category & Meta */}
              <div className="flex items-center gap-4 mb-6">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-full"
                >
                  Design Innovation
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-sm"
                >
                  {readingTime}
                </motion.span>
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Author & Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 text-gray-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {(post.author || "A")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.author || "Admin"}</p>
                    <p className="text-sm text-gray-400">Senior Design Director</p>
                  </div>
                </div>
                
                <div className="h-6 w-px bg-gray-600"></div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <time dateTime={post.fullDateTime} className="font-medium">
                    {post.formattedDate}
                  </time>
                </div>
              </motion.div>
            </motion.header>

            {/* Featured Image */}
            {featuredImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative rounded-2xl overflow-hidden mb-8 border border-gray-700"
              >
                <img
                  src={featuredImage}
                  alt={post.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
                <div className="text-gray-300 leading-relaxed text-lg space-y-6">
                  {post.content.split('\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-gray-300 leading-8"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Additional Images */}
                {post.images && post.images.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {post.images.slice(1).map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl overflow-hidden border border-gray-600"
                      >
                        <img
                          src={img}
                          alt={`Blog image ${index + 2}`}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="mt-12 pt-8 border-t border-gray-700"
                >
                  <div className="flex flex-wrap gap-3">
                    {['Design', 'Innovation', 'Technology', 'Creative', 'UI/UX'].map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-700/50 text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-600 hover:border-cyan-500/50 transition-colors"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.article>

          {/* Modern Sidebar - 4 columns */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Share Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-3">
                <Share2 className="w-5 h-5 text-cyan-400" />
                Share this article
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 89, 152, 0.3)' }}
                  onClick={() => shareOnSocial('facebook')}
                  className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-xl transition-colors border border-gray-600 hover:border-blue-500"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="text-sm">Facebook</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(29, 161, 242, 0.3)' }}
                  onClick={() => shareOnSocial('twitter')}
                  className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-xl transition-colors border border-gray-600 hover:border-blue-400"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm">Twitter</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 119, 181, 0.3)' }}
                  onClick={() => shareOnSocial('linkedin')}
                  className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-xl transition-colors border border-gray-600 hover:border-blue-600"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={copyToClipboard}
                  className="flex items-center gap-3 text-gray-300 hover:text-white p-3 rounded-xl transition-colors border border-gray-600 hover:border-gray-400"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Author Profile */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {(post.author || "A")[0].toUpperCase()}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{post.author || "Admin"}</h3>
                <p className="text-cyan-400 text-sm font-medium mb-3">Senior Design Director</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Passionate about creating innovative design solutions that push boundaries and inspire meaningful change in digital experiences.
                </p>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6"
            >
              <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest design insights and creative breakthroughs.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Subscribe Now
                </motion.button>
              </div>
            </motion.div>

            {/* Related Posts */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6"
            >
              <h3 className="text-white font-semibold mb-4">Related Reads</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-600 hover:border-cyan-500/50 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium mb-1">Future of Design Systems</h4>
                      <p className="text-gray-400 text-xs">5 min read</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        </div>

        {/* Comments Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-16 lg:col-span-8"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Discussion (24)</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 text-white px-6 py-2 rounded-xl font-semibold text-sm hover:bg-cyan-600 transition-colors"
              >
                Join Discussion
              </motion.button>
            </div>
            
            {/* Comment Form */}
            <div className="mb-8">
              <textarea
                placeholder="Share your thoughts on this article..."
                className="w-full h-24 px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
              <div className="flex justify-end mt-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors"
                >
                  Post Comment
                </motion.button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {[1, 2].map((comment) => (
                <motion.div
                  key={comment}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-gray-700 pt-6 first:border-t-0 first:pt-0"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-white font-semibold">Sarah Johnson</h4>
                        <span className="text-gray-400 text-sm">2 days ago</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        This article perfectly captures the evolution of design thinking. The insights about user-centered approaches are exactly what our team needed for our current project!
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="text-gray-400 hover:text-cyan-400 text-sm font-medium transition-colors">
                          Reply
                        </button>
                        <button className="text-gray-400 hover:text-red-400 text-sm font-medium transition-colors">
                          Like (12)
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default BlogDetail;