# Multi-UI CLI

A powerful command-line interface tool for managing and integrating UI components from both GitHub and MongoDB sources, built for Next.js projects.

## 🚀 Features

- Interactive component selection and management
- Support for both TypeScript and JavaScript components
- Advanced component search functionality
- Custom naming and organization support
- Example file integration with live previews
- MongoDB component integration
- Automatic TypeScript to JavaScript conversion
- Project-specific configuration
- Next.js 14+ compatibility
- Tailwind CSS support out of the box

## 📦 Installation

```bash
npm  i -g  multi-ui-cli
```

## 🔧 Setup

Before using the CLI, set up your project preferences:

```bash
npx multi-ui setup
```

This command will:
1. Install necessary dependencies (including Tailwind CSS and required Babel presets)
2. Configure your preferred language (TypeScript/JavaScript)
3. Set up the component directory structure
4. Create a configuration file (`multi-ui.config.json`)
5. Add required Next.js configurations

## 📚 Commands

### List Components
```bash
npx multi-ui list
```
Displays all available components with:
- Component categories and total count
- Number of variants per component
- Hierarchical view with search filters
- Component metadata and dependencies

### Interactive Mode
```bash
npx multi-ui interactive
```
Provides an interactive UI for:
1. Component browsing and selection
2. Variant preview and selection
3. Custom naming options
4. Example file integration
5. Dependency management

### Search Components
```bash
npx multi-ui search <term>
```
Advanced search features:
- Case-insensitive searching
- Fuzzy matching support
- Tag-based filtering
- Category-based organization

### Add Components

#### From GitHub
```bash
npx multi-ui add <ComponentName> [customFilename]
```
Example:
```bash
npx multi-ui add Accordion_1
npx multi-ui add Accordion_1 MyCustomAccordion
```

#### From MongoDB
```bash
npx multi-ui add <ComponentID> [customFilename]
```
Example:
```bash
npx multi-ui add 67ebe9ea02982b02d0ffc9d8
npx multi-ui add 67ebe9ea02982b02d0ffc9d8 CustomComponent
```

#### Add Example Files
```bash
npx multi-ui add <ComponentName> --example [customFilename]
```

### Remove Components
```bash
npx multi-ui remove <ComponentName>
```

### Version & Help
```bash
npx multi-ui --version  # or -v
npx multi-ui --help     # or -h
```

## 🎯 Project Structure

The CLI integrates with Next.js projects following this structure:
```
your-project/
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
└── package.json
```

## ⚙️ Configuration

The `multi-ui.config.json` configuration:
```json
{
  "language": "typescript",
  "componentPath": "app/components/multi-ui",
  "examplesPath": "examples",
  "framework": "next",
  "styling": "tailwind",
  "typescript": {
    "strict": true
  }
}
```

## 🔄 Language Support

### TypeScript (Default)
- Full type safety and IntelliSense support
- `.tsx` extension for components
- Type definitions included

### JavaScript
- Automatic TypeScript conversion
- `.jsx` extension for components
- Babel configuration included

## 🛠️ Advanced Options

| Option | Description |
|--------|-------------|
| `--example` | Include example files |
| `--force` | Override existing files |
| `--dry-run` | Preview changes without applying |
| `--template` | Use custom template |
| `--help` | Show help information |
| `--version` | Show version information |

## 🔐 Security

- Secure MongoDB connections with environment variables
- API key management through `.env` files
- Protected file system operations
- Dependency vulnerability scanning

## 🐛 Troubleshooting

Common issues and solutions:

1. Setup Issues
   - Run `npx multi-ui doctor` for diagnostics
   - Verify Node.js version (16+ required)
   - Check project permissions

2. Component Integration
   - Ensure correct Next.js configuration
   - Verify Tailwind CSS setup
   - Check component dependencies

3. MongoDB Connection
   - Verify connection string in `.env`
   - Check network connectivity
   - Validate database access

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 🌟 Support

- GitHub Issues: [Report bugs](https://github.com/yourusername/multi-ui-cli/issues)
- Documentation: [Full docs](https://multi-ui-cli.dev)
- Discord: [Join our community](https://discord.gg/multi-ui)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.