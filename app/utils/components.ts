export interface ComponentData {
  name: string;
  description: string;
  usage: string;
  installation: string;
  preview?: React.ReactNode;
}

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/om0852/multi-ui/main';

async function fetchComponentCode(componentName: string): Promise<string | null> {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/app/${componentName}/_components/${componentName}.tsx`);
    if (!response.ok) return null;
    return await response.text();
  } catch (error) {
    console.error('Error fetching component code:', error);
    return null;
  }
}

const components: Record<string, ComponentData> = {
  button: {
    name: 'Button',
    description: 'A customizable button component with various styles and states.',
    usage: `import { Button } from '@multi-ui/core'

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    installation: 'npm install @multi-ui/core',
  },
  input: {
    name: 'Input',
    description: 'A flexible input component for text and other data types.',
    usage: `import { Input } from '@multi-ui/core'

// Basic usage
<Input placeholder="Enter text..." />

// With label
<Input label="Username" />

// With validation
<Input error="This field is required" />`,
    installation: 'npm install @multi-ui/core',
  },
  card: {
    name: 'Card',
    description: 'A container component for grouping related content.',
    usage: `import { Card } from '@multi-ui/core'

// Basic usage
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content goes here
  </Card.Content>
</Card>`,
    installation: 'npm install @multi-ui/core',
  },
};

export function getComponent(name: string): ComponentData | null {
  return components[name.toLowerCase()] || null;
}

export function getAllComponents(): ComponentData[] {
  return Object.values(components);
}

export function searchComponents(query: string): ComponentData[] {
  const searchTerm = query.toLowerCase();
  return Object.values(components).filter(
    component => 
      component.name.toLowerCase().includes(searchTerm) ||
      component.description.toLowerCase().includes(searchTerm)
  );
}

export function getInstallationInstructions(name: string): string | null {
  const component = getComponent(name);
  return component?.installation || null;
} 