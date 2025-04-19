 "use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Sparkles, 
  Code2, 
  Zap, 
  Globe, 
  Heart,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';

const TeamMember = ({ 
  name, 
  role, 
  image, 
  github, 
  twitter, 
  linkedin 
}: { 
  name: string;
  role: string;
  image: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}) => {
  return (
    <motion.div 
      className="bg-gray-800/70 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm relative group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 mx-auto border-2 border-blue-500/20">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        
        <h3 className="text-xl font-bold text-white text-center mb-2">{name}</h3>
        <p className="text-gray-400 text-center mb-4">{role}</p>
        
        <div className="flex justify-center space-x-4">
          {github && (
            <Link href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </Link>
          )}
          {linkedin && (
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Milestone = ({ 
  year, 
  title, 
  description 
}: { 
  year: string;
  title: string;
  description: string;
}) => {
  return (
    <motion.div 
      className="relative pl-8 pb-8 border-l-2 border-gray-700 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
      <div className="text-blue-400 font-mono mb-2">{year}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const AboutPage = () => {
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
                About Multi UI
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
              Building the future of React components, one design at a time
            </motion.p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div 
          className="bg-gray-800/70 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <Globe className="w-8 h-8 text-blue-400 mr-4" />
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            Multi UI is on a mission to revolutionize React component development by providing a comprehensive library of beautiful, customizable, and accessible components. We believe in empowering developers to create stunning user interfaces without sacrificing performance or accessibility.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div 
            className="bg-gray-800/70 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Code2 className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Modern Components</h3>
            <p className="text-gray-300">Built with the latest React features and best practices for optimal performance.</p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/70 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Rapid Development</h3>
            <p className="text-gray-300">Accelerate your development process with our ready-to-use components.</p>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/70 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Heart className="w-8 h-8 text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Community Driven</h3>
            <p className="text-gray-300">Built by developers, for developers, with love and attention to detail.</p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Our Journey</h2>
          <div className="space-y-8">
            <Milestone 
              year="2024"
              title="Multi UI Launch"
              description="Initial release of Multi UI with core components and documentation, establishing the foundation for modern React development."
            />
            <Milestone 
              year="2024"
              title="Community Growth"
              description="Building a strong developer community and expanding our component library with contributions from talented developers."
            />
            <Milestone 
              year="2025"
              title="Templates Introduction"
              description="Launching comprehensive templates and pre-built layouts to accelerate development workflows."
            />
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember 
              name="Om Salunke"
              role="Founder & Lead Developer"
              image="./omphoto.jpg"
              github="https://github.com/om0852"
              twitter="https://twitter.com/om0852"
              linkedin="https://linkedin.com/in/om0852"
            />
            <TeamMember 
              name="Rushabh Ratnaparkhi"
              role="Core Developer"
              image="./rushabh.jpg"
              github="https://github.com/rushabh"
              twitter="https://twitter.com/rushabh"
              linkedin="https://linkedin.com/in/rushabh"
            />
            <TeamMember 
              name="Hrushikesh More"
              role="UI/UX Developer"
              image="/team/hrushikesh.jpg"
              github="https://github.com/hrushikesh"
              twitter="https://twitter.com/hrushikesh"
              linkedin="https://linkedin.com/in/hrushikesh"
            />
          </div>

          {/* Contributors Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Key Contributors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TeamMember 
                name="Nishant Talekar"
                role="Component Developer"
                image="./nishant.jpg"
                github="https://github.com/nishant"
                twitter="https://twitter.com/nishant"
                linkedin="https://linkedin.com/in/nishant"
              />
              <TeamMember 
                name="Atharva Kadam"
                role="Component Developer"
                image="./atharva.jpeg"
                github="https://github.com/atharva"
                twitter="https://twitter.com/atharva"
                linkedin="https://linkedin.com/in/atharva"
              />
              <TeamMember 
                name="Priti Sharma"
                role="Documentation Contributor"
                image="./priti.jpg"
                github="https://github.com/priti"
                twitter="https://twitter.com/priti"
                linkedin="https://linkedin.com/in/priti"
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-8">
            Have questions or want to contribute? We&apos;d love to hear from you!
          </p>
          <Link 
            href="mailto:contact@multi-ui.com"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;