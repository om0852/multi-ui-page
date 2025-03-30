# Contributing to Multi-UI

Thank you for your interest in contributing to Multi-UI! We're excited to have you join our community of contributors. This document provides guidelines and instructions to help you get started with contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Submitting Changes](#submitting-changes)
6. [Component Contributions](#component-contributions)
7. [Documentation](#documentation)
8. [Community](#community)

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/om0852/multi-ui/blob/main/CODE_OF_CONDUCT.md) to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Setting Up the Project Locally

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/multi-ui.git
   cd multi-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Visit `http://localhost:3000` to see the application running

## Development Workflow

We follow a structured development workflow to maintain code quality and organization:

### Branching Strategy

- `main` - Stable releases, production-ready code
- `dev` - Development branch for ongoing work
- Feature branches - Created for specific features, components, or fixes

### Branch Naming Conventions

- Features: `feature/component-name` or `feature/feature-description`
- Bugfixes: `fix/issue-description`
- Documentation: `docs/what-changed`
- Performance: `perf/what-improved`

## Coding Standards

We have established coding standards to maintain consistency throughout the codebase:

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid using `any` whenever possible
- Use proper type imports from libraries

### React + Next.js

- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Use Next.js features appropriately (app router, server components, etc.)

### Tailwind CSS

- Use Tailwind CSS for styling
- Follow a consistent style for class naming
- Group related classes together
- Use Tailwind's customization features for unique styles

### Framer Motion

- Use Framer Motion for animations
- Keep animations subtle and purposeful
- Ensure animations work well across different devices
- Consider accessibility in animations (respect reduced motion preferences)

### Code Formatting

We use ESLint and Prettier to enforce code formatting. Before submitting a PR, ensure your code is properly formatted:

```bash
npm run lint
# or
yarn lint
```

## Submitting Changes

### Pull Request Process

1. Create a new branch from `dev` for your changes
2. Make your changes and commit with clear, descriptive messages
3. Push your branch to your fork
4. Create a Pull Request (PR) to the `dev` branch of the main repository
5. Fill out the PR template with all required information
6. Wait for code review and address any feedback
7. Once approved, your PR will be merged

### Commit Message Guidelines

Follow these guidelines for commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Example:
```
feat(button): add hover animation effect

- Add smooth transition on hover
- Update documentation
- Fix accessibility attributes

Fixes #123
```

## Component Contributions

### Creating a New Component

When creating a new component, follow these steps:

1. Check if a similar component already exists
2. Create an issue using the component proposal template
3. Once approved, create a new directory in `app/components/{component-name}`
4. Implement the component following our structure:
   - `index.tsx` - Main component export
   - `variants/` - Different style variants
   - `types.ts` - TypeScript interfaces
   - `README.md` - Component documentation

### Component Requirements

All components must:

- Be fully accessible (ARIA attributes, keyboard navigation)
- Work well on mobile devices (responsive)
- Include proper TypeScript type definitions
- Have clear, documented props
- Include basic tests
- Follow the established design language

## Documentation

Good documentation is essential for the project:

- Update the README when making significant changes
- Document props and usage examples for components
- Include comments for complex code
- Provide visual examples where possible

## Community

Join our community to discuss features, report bugs, and get help:

- [GitHub Issues](https://github.com/om0852/multi-ui/issues)
- [GitHub Discussions](https://github.com/om0852/multi-ui/discussions)
- [Discord Community](https://discord.gg/multi-ui)

## License

By contributing to Multi-UI, you agree that your contributions will be licensed under the project's [MIT License](https://github.com/om0852/multi-ui/blob/main/LICENSE).

Thank you for contributing to Multi-UI! 