"use client";

import React, { useEffect, useState, lazy, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code,
  Eye,
  Layers,
  Zap,
  Copy,
  Settings,
  Search,
  Check,
  ExternalLink,
  ChevronDown,
  Terminal,
  MessageSquare,
} from "lucide-react";
import ChatBot from "../ChatBot";
import { cn } from "../../../lib/utils";

// Lazy load SyntaxHighlighter to improve initial load time
const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((mod) => ({
    default: mod.Prism,
  }))
);
const tomorrow = lazy(() =>
  import("react-syntax-highlighter/dist/esm/styles/prism").then((mod) => ({
    default: mod.tomorrow,
  }))
);

// Loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center h-full min-h-[300px]">
    <div className="space-y-2 text-center">
      <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <p className="text-gray-400">Loading component preview...</p>
    </div>
  </div>
);

// Error component when component loading fails
const ErrorComponent = ({ error }) => (
  <div className="flex flex-col justify-center items-center h-full min-h-[300px] p-6 text-center">
    <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-4">
      <div className="text-red-400 text-xl mb-2">Component failed to load</div>
      <p className="text-gray-300 text-sm">
        {error?.message ||
          "The component could not be loaded. It might not exist yet or there may be an error in the component code."}
      </p>
    </div>
    <p className="text-gray-400 mt-4 text-sm">
      You can still view the code examples in the other tabs.
    </p>
  </div>
);

export default function ComponentPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";

  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [commandCopied, setCommandCopied] = useState(false);
  const [error, setError] = useState(null);
  const [componentError, setComponentError] = useState(null);

  // State to keep track of the dynamic component
  const [DynamicComponent, setDynamicComponent] = useState(null);

  // Use a more efficient approach for data fetching
  useEffect(() => {
    const fetchComponentData = async () => {
      try {
        // Reduce complexity in the data generation
        const maxVariants = getMaxVariants(slug);

        // Generate variants more efficiently
        const variants = Array.from({ length: maxVariants }, (_, i) => ({
          id: `${i + 1}`,
          name: `Variant ${i + 1}`,
          description: `${toTitleCase(
            slug.replace("-", " ")
          )} design variation ${i + 1}`,
        }));

        // Create component data object
        const componentData = {
          name: toTitleCase(slug.replace("-", " ")),
          slug: slug,
          description: `A collection of ${variants.length} ${toTitleCase(
            slug.replace("-", " ")
          )} components for your UI needs.`,
          variants,
        };

        setComponent(componentData);
        setSelectedVariant(variants[0]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch component data:", error);
        setLoading(false);
        setError(error.message);
      }
    };

    fetchComponentData();
  }, [slug]);

  // Load the actual dynamic component when selected variant changes
  useEffect(() => {
    if (!selectedVariant || !slug) return;

    const variantId = selectedVariant.id;
    setComponentError(null);

    // Import the actual component dynamically
    const importComponent = async () => {
      try {
        // Use the path format seen in test/page.tsx for dynamic import
        const path = `../../public/multiui/${slug}/examples/Example_${variantId}`;
        console.log("Attempting to load component from path:", path);

        // Reset previous dynamic component
        setDynamicComponent(null);

        // Create a new dynamic component with error handling
        const Component = dynamic(
          () =>
            import(
              `../../../public/multiui/${slug}/examples/Example_${variantId}`
            ).catch((error) => {
              console.error("Failed to load component:", error);
              setComponentError(error);
              return Promise.resolve(() => <ErrorComponent error={error} />);
            }),
          {
            loading: () => <LoadingComponent />,
            ssr: false,
          }
        );

        setDynamicComponent(() => Component);
      } catch (error) {
        console.error("Error setting up dynamic component:", error);
        setComponentError(error);
      }
    };

    importComponent();
  }, [slug, selectedVariant]);

  // Helper function to get max variants based on component type
  const getMaxVariants = (componentSlug) => {
    switch (componentSlug) {
      case "accordian":
        return 30;
      case "badge":
        return 15;
      case "bar":
        return 30;
      case "button":
        return 30;
      case "cards":
        return 30;
      case "carousel":
        return 20;
      case "checkbox":
        return 30;
      case "circularprogressbar":
        return 25;
      case "clock":
        return 20;
      case "collapsible":
        return 20;
      case "colorpicker":
        return 15;
      case "confetti":
        return 17;
      case "counter":
        return 20;
      case "dialog":
        return 15;
      case "drawer":
        return 20;
      case "editable":
        return 20;
      case "fileinput":
        return 20;
      case "inputfield":
        return 14;
      case "inputmask":
        return 15;
      case "label":
        return 30;
      case "link":
        return 3;
      case "listgroup":
        return 20;
      case "loader":
        return 20;
      case "menubar":
        return 20;
      case "otpfield":
        return 20;
      case "passwordinput":
        return 20;
      case "popup":
        return 20;
      case "progressbar":
        return 25;
      case "radiogroup":
        return 20;
      case "rangeslider":
        return 5;
      case "rating":
        return 20;
      case "scrollarea":
        return 7;
      case "separator":
        return 20;
      case "share":
        return 30;
      case "sidebar":
        return 15;
      case "skeleton":
        return 20;
      case "steppedprogressbar":
        return 30;
      case "switch":
        return 30;
      case "tab":
        return 20;
      default:
        return 10;
    }
  };

  // Helper function to convert strings to title case
  const toTitleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Filter variants based on search term - memo this for performance
  const filteredVariants = React.useMemo(() => {
    return (
      component?.variants?.filter(
        (variant) =>
          variant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          variant.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [component, searchTerm]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Get paths for the component and example code
  const getComponentPath = () => {
    return `/multiui/${slug}/_components/${toTitleCase(slug)}_${
      selectedVariant?.id || "1"
    }.tsx`;
  };

  const getExamplePath = () => {
    return `/multiui/${slug}/examples/Example_${
      selectedVariant?.id || "1"
    }.tsx`;
  };

  // Generate code examples based on the selected component - memo these for performance
  const componentCode = React.useMemo(
    () => getComponentCode(),
    [slug, selectedVariant]
  );
  const exampleCode = React.useMemo(
    () => getExampleCode(),
    [slug, selectedVariant]
  );
  const installCode = React.useMemo(() => getInstallCode(), []);
  const usageCode = React.useMemo(
    () => getUsageCode(),
    [slug, selectedVariant]
  );

  // Code generator functions
  function getComponentCode() {
    return `// ${toTitleCase(slug)}_${selectedVariant?.id || "1"}.tsx
export interface ${toTitleCase(slug)}Props {
  title?: string;
  content?: string;
  variant?: string;
  className?: string;
}

export const ${toTitleCase(slug)} = ({
  title = "Default Title",
  content = "Default content goes here",
  variant = "${selectedVariant?.id || "1"}",
  className,
  ...props
}: ${toTitleCase(slug)}Props) => {
  return (
    <div 
      className={cn(
        "rounded-lg border border-gray-200 shadow-sm", 
        {
          "bg-blue-50 border-blue-200": variant === "${
            selectedVariant?.id || "1"
          }",
          "bg-gray-50 border-gray-200": variant === "2",
          "bg-purple-50 border-purple-200": variant === "3",
          "bg-green-50 border-green-200": variant === "4",
        },
        className
      )}
      {...props}
    >
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};`;
  }

  function getExampleCode() {
    return `// Example_${selectedVariant?.id || "1"}.tsx
import React from 'react';
import { ${toTitleCase(slug)} } from '../_components/${toTitleCase(slug)}_${
      selectedVariant?.id || "1"
    }';

export default function Example() {
  return (
    <div className="p-4 space-y-4">
      <${toTitleCase(slug)}
        title="Example ${toTitleCase(slug)}"
        content="This is an example of the ${toTitleCase(
          slug
        )} component with variant ${selectedVariant?.id || "1"}."
        variant="${selectedVariant?.id || "1"}"
      />
      
      <${toTitleCase(slug)}
        title="Custom Example"
        content="You can customize this component with your own content and styling."
        variant="${selectedVariant?.id || "1"}"
        className="border-dashed"
      />
    </div>
  );
}`;
  }

  function getInstallCode() {
    return `npm install @multi-ui/react

# Or if you prefer yarn
yarn add @multi-ui/react`;
  }

  function getUsageCode() {
    return `import { ${toTitleCase(slug)} } from '@multi-ui/react';

function MyComponent() {
  return (
    <${toTitleCase(slug)} 
      title="My ${toTitleCase(slug)}"
      content="This is my custom ${toTitleCase(slug)} component"
      variant="${selectedVariant?.id || "1"}"
    />
  );
}`;
  }

  // Copy code to clipboard
  const copyToClipboard = (code, isCommand = false) => {
    navigator.clipboard.writeText(code);
    if (isCommand) {
      setCommandCopied(true);
      setTimeout(() => setCommandCopied(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Code block component to reduce duplication
  const CodeBlock = ({ code, language, style }) => (
    <Suspense
      fallback={
        <div className="p-4 bg-gray-800 text-gray-400 font-mono text-sm">
          Loading code...
        </div>
      }
    >
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          background: "#1f2937",
          ...(style || {}),
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Suspense>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !component) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Component not found</h1>
        <p className="mt-2 text-gray-300">
          The component you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/components"
          className="mt-4 inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Components
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Background */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-800"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Link
              href="/components"
              className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Components
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {component.name}
              </span>
            </h1>
            <p className="mt-2 text-lg text-gray-300">
              {component.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Variants List */}
            <div className="lg:w-1/3">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4 sticky top-4">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Layers className="mr-2 text-blue-400" size={18} />
                  Variants
                </h3>

                {/* Search variants */}
                <div className="mb-4">
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      className="block w-full rounded-md bg-gray-900 border-gray-700 pl-10 pr-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder={`Search variants...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Variants list */}
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredVariants.map((variant) => (
                      <motion.div key={variant.id} variants={itemVariants}>
                        <button
                          onClick={() => setSelectedVariant(variant)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                            selectedVariant?.id === variant.id
                              ? "bg-blue-900/30 text-blue-400"
                              : "hover:bg-gray-700 text-gray-300"
                          }`}
                        >
                          <Zap
                            className={`h-4 w-4 mr-2 ${
                              selectedVariant?.id === variant.id
                                ? "text-blue-400"
                                : "text-gray-400"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{variant.name}</div>
                            <div className="text-xs text-gray-400 truncate">
                              {variant.description}
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>

                  {filteredVariants.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">No variants found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Preview/Code/Example */}
            <div className="lg:w-2/3">
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-700">
                  <button
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "preview"
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                    onClick={() => setActiveTab("preview")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                  <button
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "code"
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                    onClick={() => setActiveTab("code")}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Component Code
                  </button>
                  <button
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "example"
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                    onClick={() => setActiveTab("example")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Usage Example
                  </button>
                  <button
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "customize"
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                    onClick={() => setActiveTab("customize")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Customize
                  </button>
                </div>

                {/* Tab Content - Only render the active tab for performance */}
                <div className="p-6">
                  {activeTab === "preview" && (
                    <div>
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        {/* Component preview */}
                        <div className="p-8 flex items-center justify-center min-h-[400px]">
                          {/* Actual component preview */}
                          <div className="w-full">
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-white">
                                  {component.name} - Variant{" "}
                                  {selectedVariant?.id}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        `npx multi-ui add ${toTitleCase(
                                          slug
                                        )}_${selectedVariant?.id}`,
                                        true
                                      )
                                    }
                                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-xs text-gray-200 font-medium flex items-center"
                                  >
                                    {commandCopied ? (
                                      <>
                                        <Check className="h-3 w-3 mr-1" />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Terminal className="h-3 w-3 mr-1" />
                                        Copy Install Command
                                      </>
                                    )}
                                  </button>
                                  <div className="bg-blue-900/30 px-2 py-1 rounded-full text-xs text-blue-400 font-medium flex items-center">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Live Preview
                                  </div>
                                </div>
                              </div>

                              {/* Render the actual component */}
                              <div className="bg-gray-900 rounded-lg p-6 relative">
                                {componentError ? (
                                  <ErrorComponent error={componentError} />
                                ) : DynamicComponent ? (
                                  <Suspense fallback={<LoadingComponent />}>
                                    <DynamicComponent />
                                  </Suspense>
                                ) : (
                                  <LoadingComponent />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-800 border-t border-gray-700">
                          <div className="flex justify-between">
                            <Link
                              href={`/components/${slug}/${
                                selectedVariant?.id || "1"
                              }`}
                              className="text-sm text-blue-400 inline-flex items-center hover:text-blue-300"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View full details for {
                                component.name
                              } Variant {selectedVariant?.id}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "code" && (
                    <div>
                      <div className="mb-4">
                        <h3 className="text-white text-lg font-medium mb-2 flex items-center">
                          <Code className="h-5 w-5 mr-2 text-blue-400" />
                          Component Code
                        </h3>
                        <p className="text-gray-400 text-sm">
                          This is the source code for the {component.name}{" "}
                          component, Variant {selectedVariant?.id}.
                        </p>
                      </div>

                      <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
                        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                          <span className="text-gray-300 text-sm font-mono">
                            {getComponentPath()}
                          </span>
                          <button
                            onClick={() => copyToClipboard(componentCode)}
                            className="flex items-center text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-gray-200"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                Copy Code
                              </>
                            )}
                          </button>
                        </div>
                        <div className="overflow-auto max-h-[400px]">
                          <CodeBlock code={componentCode} language="tsx" />
                        </div>
                      </div>

                      <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/30">
                        <h4 className="font-medium text-blue-400 mb-2 flex items-center">
                          <Terminal className="h-4 w-4 mr-2" />
                          Installation
                        </h4>
                        <p className="text-gray-300 text-xs">
                          Install the Multi UI library to use this component in
                          your project.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "example" && (
                    <div>
                      <div className="mb-4">
                        <h3 className="text-white text-lg font-medium mb-2 flex items-center">
                          <ExternalLink className="h-5 w-5 mr-2 text-blue-400" />
                          Usage Example
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Example of how to use the {component.name} component,
                          Variant {selectedVariant?.id} in your React
                          application.
                        </p>
                      </div>

                      <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
                        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                          <span className="text-gray-300 text-sm font-mono">
                            {getExamplePath()}
                          </span>
                          <button
                            onClick={() => copyToClipboard(exampleCode)}
                            className="flex items-center text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-gray-200"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                Copy Code
                              </>
                            )}
                          </button>
                        </div>
                        <div className="overflow-auto max-h-[300px]">
                          <CodeBlock code={exampleCode} language="tsx" />
                        </div>
                      </div>

                      {/* Installation Command */}
                      <div className="mt-6 bg-gray-900 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <div className="flex items-center">
                            <Terminal className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-400">
                              Installation Command
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `npx multi-ui add ${toTitleCase(slug)}_${
                                  selectedVariant?.id
                                } --example`,
                                true
                              )
                            }
                            className="flex items-center text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-gray-200"
                          >
                            {commandCopied ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                Copy Command
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-4 bg-gray-900">
                          <code className="text-sm text-gray-300 font-mono">
                            npx multi-ui add {toTitleCase(slug)}_
                            {selectedVariant?.id} --example
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "customize" && (
                    <div>
                      <div className="mb-4">
                        <h3 className="text-white text-lg font-medium mb-2 flex items-center">
                          <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                          AI Component Customization
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Chat with our AI assistant to customize this
                          component. Describe your desired changes and get
                          instant code.
                        </p>
                      </div>

                      <ChatBot
                        componentName={component.name}
                        variantId={selectedVariant?.id || "1"}
                        onCustomizationComplete={(code) => {
                          // Here you could implement saving to database
                          console.log("Generated code:", code);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
