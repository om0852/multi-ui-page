"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Github, 
  Code2, 
  FileCode, 
  Bug, 
  MessageSquare, 
  Star, 
  GitPullRequest,
  Sparkles,
  Lightbulb,
  Users,
  Heart
} from 'lucide-react';

const ContributionCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  linkText 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) => {
  return (
    <motion.div
      className="bg-gray-800/70 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm relative group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
        
        <Link 
          href={link}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
      
      {/* Decorative corner gradient */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const ContributePage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
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
                Contribute to Multi UI
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
            
            <motion.p 
              className="max-w-3xl mx-auto text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join our community of developers and help make Multi UI even better
            </motion.p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-400">Components</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-4xl font-bold text-purple-400 mb-2">1.2K</div>
            <div className="text-gray-400">Contributors</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">5K+</div>
            <div className="text-gray-400">GitHub Stars</div>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="text-4xl font-bold text-purple-400 mb-2">100K+</div>
            <div className="text-gray-400">Downloads</div>
          </motion.div>
        </motion.div>

        {/* Ways to Contribute Section */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ContributionCard
            icon={Code2}
            title="Submit Components"
            description="Create and submit new components to expand our library. Share your unique designs with the community."
            link="https://github.com/om0852/multi-ui/blob/main/CONTRIBUTING.md#submitting-components"
            linkText="Component Guidelines"
          />
          <ContributionCard
            icon={Bug}
            title="Report Issues"
            description="Help improve Multi UI by reporting bugs, suggesting improvements, or requesting new features."
            link="https://github.com/om0852/multi-ui/issues/new"
            linkText="Open an Issue"
          />
          <ContributionCard
            icon={GitPullRequest}
            title="Pull Requests"
            description="Contribute directly to the codebase by submitting pull requests with improvements or fixes."
            link="https://github.com/om0852/multi-ui/pulls"
            linkText="View Pull Requests"
          />
          <ContributionCard
            icon={MessageSquare}
            title="Join Discussions"
            description="Participate in discussions, share ideas, and help shape the future of Multi UI."
            link="https://github.com/om0852/multi-ui/discussions"
            linkText="Join Discussion"
          />
          <ContributionCard
            icon={FileCode}
            title="Improve Docs"
            description="Help make our documentation better by fixing errors or adding examples and tutorials."
            link="https://github.com/om0852/multi-ui/tree/main/docs"
            linkText="View Documentation"
          />
          <ContributionCard
            icon={Star}
            title="Show Support"
            description="Star our repository on GitHub and spread the word about Multi UI in the community."
            link="https://github.com/om0852/multi-ui"
            linkText="Star on GitHub"
          />
        </motion.div>

        {/* Community Section */}
        <motion.div 
          className="bg-gray-800/70 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-blue-400 mr-4" />
            <h2 className="text-3xl font-bold text-white">Join Our Community</h2>
          </div>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-3xl">
            Connect with other developers, share your work, get help, and stay updated with the latest Multi UI developments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="https://github.com/om0852/multi-ui"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Link>
            <Link 
              href="https://discord.gg/multi-ui"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Discord
            </Link>
          </div>
        </motion.div>

        {/* Guidelines Section */}
        <motion.div 
          className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex items-center mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-400 mr-4" />
            <h2 className="text-3xl font-bold text-white">Contribution Guidelines</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">
              Before contributing, please read our guidelines to ensure your contributions align with our standards and practices:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Follow our coding standards and style guide</li>
              <li>Write clear commit messages and documentation</li>
              <li>Test your changes thoroughly</li>
              <li>Keep pull requests focused and atomic</li>
              <li>Be respectful and constructive in discussions</li>
            </ul>
            <div className="mt-8 flex items-center justify-center">
              <Link 
                href="https://github.com/om0852/multi-ui/blob/main/CONTRIBUTING.md"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Heart className="w-5 h-5 mr-2" />
                Read Full Guidelines
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContributePage; 