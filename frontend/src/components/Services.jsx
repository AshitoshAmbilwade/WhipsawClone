import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../api/blogApi";

function Services() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);

  const filters = ["all", "product design", "strategy", "engineering", "branding"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllPosts();

        const formatted = data.map((post) => {
          const featuredImage = post.images?.[0];
          return {
            id: post._id,
            title: post.title,
            description: post.content?.substring(0, 120) + "...",
            category: post.category || "product design",
            image: featuredImage,
            client: post.author || "Whipsaw",
            year: new Date(post.createdAt).getFullYear(),
            awards: post.awards || [],
          };
        });

        setProjects(formatted);
        console.log("Fetched projects:", projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-[#0e2107] via-[#0e2110] to-[#14230f] text-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ===== Header Section ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-indigo-500 to-blue-500 mb-6"></div>
            <h2 className="text-sm font-semibold text-indigo-400 tracking-widest uppercase">
              Our Services
            </h2>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl font-light mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Design
            </span>
            <br />
            <span className="text-gray-300">Innovation</span>
            <br />
            <span className="text-gray-400">Execution</span>
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 max-w-6xl"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              We deliver comprehensive design and engineering services that
              transform ideas into market-leading products.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our multidisciplinary approach combines strategic thinking with
              technical excellence to create solutions that resonate with users
              and drive business success.
            </p>
          </motion.div>
        </motion.div>

        {/* ===== Portfolio Section ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-blue-500 to-purple-500 mb-6"></div>
            <h2 className="text-sm font-semibold text-indigo-400 tracking-widest uppercase">
              Featured Work
            </h2>
          </motion.div>

          <motion.h4
            variants={itemVariants}
            className="text-3xl md:text-4xl font-light text-gray-100 mb-8"
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
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ===== Projects Grid ===== */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              onClick={() => navigate(`/blog/${project.id}`)}
            >
              <div className="relative overflow-hidden bg-gray-900 aspect-[4/3] mb-6 rounded-xl border border-gray-800">
                {project.image && (
                  <div className="relative h-full overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-500">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="text-white text-lg font-medium"
                  >
                    View Project →
                  </motion.span>
                </div>

                {project.awards.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-xs font-medium text-white rounded">
                      Award Winning
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h5 className="text-xl font-medium text-gray-100 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h5>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>

                <p className="text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <span className="text-sm text-gray-500">{project.client}</span>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </section>
  );
}

export default Services;
