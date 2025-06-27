"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ChevronRight,
  Terminal,
  Package,
  Layers,
  Trash,
  FileCode,
  Download,
  Sparkles,
  Settings,
  Search,
  List,
  HelpCircle,
  Menu,
  X,
  BookOpen,
  Code2,
  Boxes,
  Wrench,
  Puzzle,
  LifeBuoy,
} from "lucide-react";
// import AdBanner from "../components/AdBanner";
import AdsContext from "../components/AdsContext";

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-sm rounded-xl opacity-70 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative">
        <pre className="bg-gray-900/90 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm border border-gray-700/50 backdrop-blur-sm">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={copied ? "check" : "copy"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

const PackageManagerTabs = ({
  commands,
}: {
  commands: { [key: string]: string };
}) => {
  const [activeTab, setActiveTab] = useState("npm");

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        {Object.keys(commands).map((manager) => (
          <button
            key={manager}
            onClick={() => setActiveTab(manager)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === manager
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            {manager.toUpperCase()}
          </button>
        ))}
      </div>
      <CodeBlock code={commands[activeTab]} />
    </div>
  );
};

const NavLink = ({
  section,
  activeSection,
  onClick,
}: {
  section: { id: string; title: string; icon: React.ReactNode };
  activeSection: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
      activeSection === section.id
        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
        : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
    }`}
  >
    {section.icon}
    <span className="text-sm font-medium">{section.title}</span>
  </button>
);

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Define sections for navigation
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "installation",
      title: "Installation",
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "project-setup",
      title: "Project Setup",
      icon: <Terminal className="w-4 h-4" />,
    },
    {
      id: "add-components",
      title: "Add Components",
      icon: <Puzzle className="w-4 h-4" />,
    },
    {
      id: "additional-commands",
      title: "Additional Commands",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      id: "project-structure",
      title: "Project Structure",
      icon: <Boxes className="w-4 h-4" />,
    },
    {
      id: "configuration",
      title: "Configuration",
      icon: <Wrench className="w-4 h-4" />,
    },
    { id: "features", title: "Features", icon: <Layers className="w-4 h-4" /> },
    { id: "support", title: "Support", icon: <LifeBuoy className="w-4 h-4" /> },
  ];

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setShowMobileSidebar(false);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const installCommands = {
    npm: "npm i multi-ui-cli",
    yarn: "yarn add multi-ui-cli",
    pnpm: "pnpm add multi-ui-cli",
    bun: "bun add multi-ui-cli",
  };

  const setupCommands = {
    npm: "npx multi-ui setup",
    yarn: "yarn multi-ui setup",
    pnpm: "pnpm multi-ui setup",
    bun: "bunx multi-ui setup",
  };

  const devCommands = {
    npm: "npm run dev",
    yarn: "yarn dev",
    pnpm: "pnpm dev",
    bun: "bun dev",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-20"></div>

        {/* Animated gradient orbs - hidden on mobile for better performance */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl hidden sm:block"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl hidden sm:block"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setShowMobileSidebar(true)}
        className="fixed bottom-4 right-4 z-30 lg:hidden bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showMobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowMobileSidebar(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-[280px] bg-gray-900 border-l border-gray-800 p-4 z-50 lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-white">Navigation</h2>
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <NavLink
                    key={section.id}
                    section={section}
                    activeSection={activeSection}
                    onClick={() => scrollToSection(section.id)}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Layout */}
      <div className="lg:grid lg:grid-cols-[280px,1fr] relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed top-16 left-0 w-[280px] h-[calc(100vh-4rem)] overflow-y-auto bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 p-6 z-50">
          <div className="mb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Documentation
            </h2>
          </div>
          <nav className="space-y-2">
            {sections.map((section) => (
              <NavLink
                key={section.id}
                section={section}
                activeSection={activeSection}
                onClick={() => scrollToSection(section.id)}
              />
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-start-2 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="text-center mb-8 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Title with animated elements */}
              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Documentation
              </motion.h1>
              {/* Ad Banner */}

              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-[200px] sm:max-w-[300px] mb-4 sm:mb-8"
              />

              <motion.p
                className="max-w-3xl mx-auto text-base sm:text-xl text-gray-300 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A powerful command-line interface tool for managing and
                integrating UI components from both GitHub and MongoDB sources,
                built for Next.js projects.
              </motion.p>
            </motion.div>
          </div>
          <div className="flex justify-center my-6">
            {/* <AdBanner slot="6155612091" /> */}
            <AdsContext />
          </div>
          {/* Getting Started Section */}
          <div id="getting-started" className="scroll-mt-20 mb-12 sm:mb-20">
            <motion.div
              className="mb-12 sm:mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                Getting Started
              </h2>
              <div className="space-y-6 sm:space-y-8">
                {/* Step 1: Installation */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-lg sm:rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mt-1 shadow-inner backdrop-blur-sm">
                      <span className="font-bold text-sm sm:text-base">1</span>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Package className="text-blue-400 h-5 w-5 sm:h-6 sm:w-6" />
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          Installation
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-300 mb-4">
                        Install the Multi UI CLI tool to use it in your project.
                      </p>
                      <PackageManagerTabs commands={installCommands} />
                    </div>
                  </div>
                </motion.div>

                {/* Step 2: Setup */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-lg sm:rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mt-1 shadow-inner backdrop-blur-sm">
                      <span className="font-bold text-sm sm:text-base">2</span>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Terminal className="text-blue-400 h-5 w-5 sm:h-6 sm:w-6" />
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          Project Setup
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-300 mb-4">
                        Initialize your project with necessary dependencies and
                        configurations.
                      </p>
                      <PackageManagerTabs commands={setupCommands} />
                      <div className="mt-6">
                        <p className="text-sm text-gray-400 mb-2">
                          Then start the development server:
                        </p>
                        <PackageManagerTabs commands={devCommands} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3: Add Components */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-lg sm:rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mt-1 shadow-inner backdrop-blur-sm">
                      <span className="font-bold text-sm sm:text-base">3</span>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Layers className="text-blue-400 h-5 w-5 sm:h-6 sm:w-6" />
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          Add Components
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-300 mb-4">
                        Add components to your project using one of these
                        methods:
                      </p>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-2">
                            Add Component Using Name:
                          </p>
                          <CodeBlock code="npx multi-ui add <ComponentName> [customFilename]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-2">
                            Add Component Using ID:
                          </p>
                          <CodeBlock code="npx multi-ui add <ComponentID> [customFilename]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-2">
                            With example files:
                          </p>
                          <CodeBlock code="npx multi-ui add <ComponentName> --example [customFilename]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Installation Section */}
          <div id="installation" className="scroll-mt-20 mb-12 sm:mb-20">
            <motion.div
              className="mb-12 sm:mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                Installation
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="flex-1 w-full">
                      <p className="text-sm sm:text-base text-gray-300 mb-4">
                        Install the Multi UI CLI tool using your preferred
                        package manager:
                      </p>
                      <PackageManagerTabs commands={installCommands} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Project Setup Section */}
          <div id="project-setup" className="scroll-mt-20 mb-12 sm:mb-20">
            <motion.div
              className="mb-12 sm:mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                Project Setup
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="flex-1 w-full">
                      <p className="text-sm sm:text-base text-gray-300 mb-4">
                        Initialize your project with necessary dependencies and
                        configurations:
                      </p>
                      <PackageManagerTabs commands={setupCommands} />
                      <div className="mt-6">
                        <p className="text-sm text-gray-400 mb-2">
                          Then start the development server:
                        </p>
                        <PackageManagerTabs commands={devCommands} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Add Components Section */}
          <div id="add-components" className="scroll-mt-20 mb-12 sm:mb-20">
            <motion.div
              className="mb-12 sm:mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                Add Components
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* List Components */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    <div className="bg-blue-900/30 p-2 rounded-lg">
                      <List className="text-blue-400 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        List Components
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        View all available components
                      </p>
                    </div>
                  </div>
                  <CodeBlock code="npx multi-ui list" />
                </motion.div>

                {/* Search Components */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
                  <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    <div className="bg-blue-900/30 p-2 rounded-lg">
                      <Search className="text-blue-400 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Search Components
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Find components by name or type
                      </p>
                    </div>
                  </div>
                  <CodeBlock code="npx multi-ui search <term>" />
                </motion.div>

                {/* Interactive Mode */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    <div className="bg-blue-900/30 p-2 rounded-lg">
                      <Settings className="text-blue-400 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Interactive Mode
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Use the interactive UI
                      </p>
                    </div>
                  </div>
                  <CodeBlock code="npx multi-ui interactive" />
                </motion.div>

                {/* Remove Components */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
                  <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    <div className="bg-blue-900/30 p-2 rounded-lg">
                      <Trash className="text-blue-400 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Remove Components
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Remove unused components
                      </p>
                    </div>
                  </div>
                  <CodeBlock code="npx multi-ui remove <ComponentName>" />
                </motion.div>

                {/* Help & Version */}
                <motion.div
                  className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70 sm:col-span-2 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    <div className="bg-blue-900/30 p-2 rounded-lg">
                      <HelpCircle className="text-blue-400 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Help & Version
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Get help and version info
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-gray-400">
                        Show help information:
                      </p>
                      <CodeBlock code="npx multi-ui --help" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-gray-400">
                        Show version:
                      </p>
                      <CodeBlock code="npx multi-ui --version" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Project Structure Section */}
          <div id="project-structure" className="scroll-mt-20 mb-12 sm:mb-20">
            <motion.div
              className="mb-12 sm:mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                Project Structure
              </h2>
              <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70">
                <CodeBlock
                  code={`your-project/
├── app/
│   ├── components/
│   │   ├── multi-ui/
│   │   │   ├── [ComponentName]/
│   │   │   │   ├── index.tsx
│   │   │   │   └── examples/
│   │   │   │       └── Example_1.tsx
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── public/
│   └── multi-ui/
│       └── assets/
├── multi-ui.config.json
└── package.json`}
                />
              </div>
            </motion.div>
          </div>

          {/* Configuration Section */}
          <div id="configuration" className="scroll-mt-20 mb-12 sm:mb-20">
            <motion.div
              className="mb-12 sm:mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                Configuration
              </h2>
              <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-gray-700/70">
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  The `multi-ui.config.json` configuration file:
                </p>
                <CodeBlock
                  code={`{
  "language": "typescript",
  "componentPath": "app/components/multi-ui",
  "examplesPath": "examples",
  "framework": "next",
  "styling": "tailwind",
  "typescript": {
    "strict": true
  }
}`}
                />
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <div id="features" className="scroll-mt-20 mb-12 sm:mb-20">
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
                <h3 className="text-xl font-bold mb-4">TypeScript Support</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Full type safety</li>
                  <li>• IntelliSense support</li>
                  <li>• Automatic JS conversion</li>
                  <li>• Type definitions included</li>
                </ul>
              </div>
              <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
                <h3 className="text-xl font-bold mb-4">Next.js Integration</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Next.js 14+ compatible</li>
                  <li>• App Router support</li>
                  <li>• Server Components</li>
                  <li>• Automatic optimization</li>
                </ul>
              </div>
              <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
                <h3 className="text-xl font-bold mb-4">Styling</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Tailwind CSS support</li>
                  <li>• Custom theming</li>
                  <li>• Responsive design</li>
                  <li>• Dark mode ready</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Support Section */}
          <div id="support" className="scroll-mt-20 text-center">
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-3xl font-bold mb-8">Need Help?</h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="https://github.com/yourusername/multi-ui-cli/issues"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <HelpCircle className="mr-2" size={20} />
                  Report Issues
                </Link>
                <Link
                  href="https://discord.gg/multi-ui"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="mr-2" size={20} />
                  Join Discord
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
