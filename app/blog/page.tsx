"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  User,
  Tag,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  image: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.article 
      className="bg-gray-800/70 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">
          <Link href={`/blog/${post.id}`} className="hover:text-blue-400 transition-colors">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>
          
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            {post.author.name}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const FeaturedPost = ({ post }: { post: BlogPost }) => {
  return (
    <motion.article 
      className="relative h-[500px] rounded-xl overflow-hidden mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src={post.image} 
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-300 mb-6 max-w-3xl">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-gray-300">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {post.author.name}
            </div>
          </div>
          
          <Link 
            href={`/blog/${post.id}`}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white"
          >
            Read More
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const BlogPage = () => {
  // Sample blog posts data
  const featuredPost: BlogPost = {
    id: "getting-started-with-multi-ui",
    title: "Getting Started with Multi UI: A Comprehensive Guide",
    excerpt: "Learn how to integrate Multi UI components into your React projects and create beautiful user interfaces in minutes.",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    author: {
      name: "Om Salunke",
      avatar: "/team/om.jpg"
    },
    tags: ["Tutorial", "React", "Components"],
    image: "/blog/getting-started.jpg"
  };

  const blogPosts: BlogPost[] = [
    {
      id: "customizing-components",
      title: "Customizing Multi UI Components: Tips and Tricks",
      excerpt: "Discover advanced techniques for customizing Multi UI components to match your brand's unique style.",
      date: "Mar 12, 2024",
      readTime: "6 min read",
      author: {
        name: "Sarah Chen",
        avatar: "/team/sarah.jpg"
      },
      tags: ["Customization", "Styling", "Design"],
      image: "/blog/customizing.jpg"
    },
    {
      id: "ai-features",
      title: "Exploring Multi UI's AI Features",
      excerpt: "Deep dive into the AI-powered features that make Multi UI stand out from other component libraries.",
      date: "Mar 10, 2024",
      readTime: "5 min read",
      author: {
        name: "Alex Thompson",
        avatar: "/team/alex.jpg"
      },
      tags: ["AI", "Features", "Innovation"],
      image: "/blog/ai-features.jpg"
    },
    {
      id: "performance-optimization",
      title: "Performance Optimization in Multi UI",
      excerpt: "Learn how to optimize your Multi UI components for maximum performance and efficiency.",
      date: "Mar 8, 2024",
      readTime: "7 min read",
      author: {
        name: "Om Salunke",
        avatar: "/team/om.jpg"
      },
      tags: ["Performance", "Optimization", "Best Practices"],
      image: "/blog/performance.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-20" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold mb-6 relative inline-flex items-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden md:block"
              >
                <Sparkles className="h-8 w-8 text-blue-400" />
              </motion.div>
              
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-gradient">
                Multi UI Blog
              </span>
              
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden md:block"
              >
                <Sparkles className="h-8 w-8 text-purple-400" />
              </motion.div>
            </motion.h1>
            
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-[300px] mb-8"
            />
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <input 
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 bg-gray-800/90 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {["All", "Tutorial", "React", "Components", "Design", "Performance", "AI"].map((tag, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured Post */}
        <FeaturedPost post={featuredPost} />

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="mt-16 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest updates, tutorials, and resources delivered directly to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-gray-800/90 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage; 