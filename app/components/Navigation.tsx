"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Terminal, Book, Blocks, Github } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/docs', label: 'Documentation', icon: Book },
    { href: '/components', label: 'Components', icon: Blocks },
    { href: 'https://github.com/om0852/multi-ui', label: 'GitHub', icon: Github, external: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full border-b border-terminal-border bg-terminal-bg/95 backdrop-blur supports-[backdrop-filter]:bg-terminal-bg/60"
    >
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center rounded-lg bg-terminal-accent p-2"
          >
            <Terminal className="h-5 w-5 text-white" />
          </motion.div>
          <span className="hidden font-bold text-terminal-accent sm:inline-block">Multi-UI</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon, external }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                target={external ? '_blank' : undefined}
                className={`group flex items-center space-x-2 transition-colors hover:text-terminal-accent ${
                  isActive ? 'text-terminal-accent' : 'text-terminal-text'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Icon className="h-4 w-4" />
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[12px] left-0 right-0 h-[2px] bg-terminal-accent"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
                <span className="hidden sm:inline-block">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/docs"
              className="hidden h-9 items-center justify-center rounded-md bg-terminal-accent px-4 text-sm font-medium text-white transition-colors hover:bg-terminal-accent/90 sm:inline-flex"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
} 