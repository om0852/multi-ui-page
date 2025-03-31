'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, GitPullRequest, MessageSquare, BookOpen, Star, Award, FileCode, CheckCircle2, PlusCircle, Code2, Server, FileText } from 'lucide-react';

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Managing Open Contributions for Multi-UI</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Join our community of contributors and help build the future of modern UI components
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="https://github.com/om0852/multi-ui" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub Repository
            </Link>
            <Link 
              href="https://github.com/om0852/multi-ui/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all hover:bg-blue-600"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Browse Open Issues
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Contribution Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contribution Workflow</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">1. Set Up a Contribution Workflow</h3>
              </div>
              <p className="mb-4 text-gray-700">
                We&apos;ve created a comprehensive CONTRIBUTING.md file in our GitHub repository that outlines:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>How to set up the project locally</li>
                <li>Coding standards (TypeScript, Tailwind CSS, Framer Motion usage)</li>
                <li>Branching strategy (main for stable releases, dev for ongoing work)</li>
                <li>How to submit PRs (create an issue first, use feature branches)</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Example PR Workflow:</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>Fork the repository</li>
                  <li>Create a new branch (feature/my-new-component)</li>
                  <li>Make changes and commit with clear messages</li>
                  <li>Open a Pull Request (PR)</li>
                </ol>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">2. Use GitHub Issues & Discussions</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We use several GitHub features to organize contributions effectively:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Issues:</strong> For bug reports, feature requests, and improvements</li>
                  <li><strong>Discussions:</strong> For general questions and design decisions</li>
                  <li><strong>Good First Issues:</strong> Labeled beginner-friendly issues to encourage new contributors</li>
                </ul>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link 
                    href="https://github.com/om0852/multi-ui/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                  >
                    <GitPullRequest className="mr-2 h-4 w-4" />
                    Browse Issues
                  </Link>
                  <Link 
                    href="https://github.com/om0852/multi-ui/discussions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Join Discussions
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">3. PR Review Process</h3>
              </div>
              <p className="mb-4 text-gray-700">
                We&apos;ve implemented a robust PR review process to maintain high code quality:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>GitHub Actions to run tests (ESLint, Prettier, TypeScript checks)</li>
                <li>At least one approved review required before merging PRs</li>
                <li>CODEOWNERS file to assign reviewers automatically</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                <p className="text-sm text-gray-700">
                  Pull requests go through automated testing and code reviews to ensure they meet our quality standards before being merged.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">4. Component Proposal Template</h3>
              </div>
              <p className="mb-4 text-gray-700">
                We&apos;ve defined a template for proposing new components in GitHub issues:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Component Proposal Fields:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Component Name</li>
                  <li>Use Case</li>
                  <li>Props & API</li>
                  <li>Design Reference (Figma, Dribbble, etc.)</li>
                </ul>
              </div>
              <Link 
                href="https://github.com/om0852/multi-ui/issues/new?assignees=&labels=component&template=component_proposal.md&title=%5BComponent%5D%3A+"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Propose a Component
              </Link>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">5. Monorepo for Scalability (Optional)</h3>
              </div>
              <p className="mb-4 text-gray-700">
                For larger contributions, we&apos;re considering a monorepo structure with Turborepo to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Make it easier to work on individual components without affecting others</li>
                <li>Help in maintaining different versions of the library</li>
                <li>Improve build performance and dependency management</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                <p className="text-sm text-gray-700 italic">
                  This is a future direction we&apos;re exploring as the component library grows.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">6. Reward & Recognize Contributors</h3>
              </div>
              <p className="mb-4 text-gray-700">
                We believe in recognizing the hard work of our contributors:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>CONTRIBUTORS.md file listing all contributors</li>
                <li>GitHub&apos;s &ldquo;Contributor&rdquo; role to highlight key contributors</li>
                <li>Community Discord server for discussions and collaboration</li>
              </ul>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link 
                  href="https://github.com/om0852/multi-ui/blob/main/CONTRIBUTORS.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                >
                  <Star className="mr-2 h-4 w-4" />
                  View Contributors
                </Link>
                <Link 
                  href="https://discord.gg/multi-ui" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Join Discord
                </Link>
              </div>
            </div>

            {/* Step 7 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">7. License & Documentation</h3>
              </div>
              <p className="mb-4 text-gray-700">
                We maintain clear licensing and documentation:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>MIT License for the library</li>
                <li>Comprehensive documentation using Storybook</li>
                <li>Detailed API references for all components</li>
              </ul>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link 
                  href="https://github.com/om0852/multi-ui/blob/main/LICENSE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  View License
                </Link>
                <Link 
                  href="/docs" 
                  className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Contribute?</h2>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Join our growing community of contributors and help us build the next generation of UI components
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="https://github.com/om0852/multi-ui" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub Repository
            </Link>
            <Link 
              href="https://github.com/om0852/multi-ui/issues/new/choose" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-500 bg-opacity-25 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all hover:bg-opacity-40 border border-white border-opacity-20"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Start Contributing
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 