'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { cache } from 'react';

export interface ComponentData {
  name: string;
  description: string;
  usage: string;
  installation: string;
  preview?: React.ReactNode;
}

export interface ComponentVariant {
  name: string;
  code: string;
  preview?: string;
}

export interface Component {
  name: string;
  displayName: string;
  description: string;
  category: string;
  tags: string[];
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const defaultComponents: Record<string, ComponentData> = {
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

export async function getComponent(name: string): Promise<ComponentData | null> {
  return defaultComponents[name.toLowerCase()] || null;
}

export async function getAllComponents(): Promise<ComponentData[]> {
  return Object.values(defaultComponents);
}

export async function searchComponents(query: string): Promise<ComponentData[]> {
  const searchTerm = query.toLowerCase();
  return Object.values(defaultComponents).filter(
    component => 
      component.name.toLowerCase().includes(searchTerm) ||
      component.description.toLowerCase().includes(searchTerm)
  );
}

export async function getInstallationInstructions(name: string): Promise<string | null> {
  const component = await getComponent(name);
  return component?.installation || null;
}

export const fetchComponentsList = cache(async (): Promise<Component[]> => {
  try {
    const componentsDir = path.join(process.cwd(), 'app', 'multiui');
    const entries = await fs.readdir(componentsDir, { withFileTypes: true });
    
    const components = await Promise.all(entries
      .filter(entry => 
        entry.isDirectory() && 
        !entry.name.startsWith('.') && 
        !['components', 'utils', 'hooks', 'docs'].includes(entry.name.toLowerCase())
      )
      .map(async entry => {
        const metadataPath = path.join(componentsDir, entry.name, 'metadata.json');
        let metadata = {
          name: capitalizeFirstLetter(entry.name),
          description: `A collection of ${entry.name.toLowerCase()} components with different styles and animations`,
          category: 'UI Components',
          tags: ['interactive', 'animated']
        };

        try {
          const fileExists = await fs.stat(metadataPath).then(() => true).catch(() => false);
          if (fileExists) {
            const fileContent = await fs.readFile(metadataPath, 'utf-8');
            const fileMetadata = JSON.parse(fileContent);
            metadata = { ...metadata, ...fileMetadata };
          }
        } catch (error) {
          console.error(`Error reading metadata for ${entry.name}:`, error);
        }

        return {
          ...metadata,
          name: entry.name,
          displayName: capitalizeFirstLetter(entry.name)
        };
      }));

    return components;
  } catch (error) {
    console.error('Error fetching components:', error);
    return [];
  }
});

export const fetchComponentVariants = cache(async (componentName: string): Promise<ComponentVariant[]> => {
  try {
    const componentsDir = path.join(process.cwd(), 'app', 'multiui', componentName, '_components');
    
    try {
      await fs.stat(componentsDir);
    } catch {
      console.error('Components directory not found:', componentsDir);
      return [];
    }

    const files = await fs.readdir(componentsDir);
    const variants = await Promise.all(files
      .filter(file => file.endsWith('.tsx'))
      .sort((a, b) => {
        const aNum = parseInt(a.split('_')[1]) || 0;
        const bNum = parseInt(b.split('_')[1]) || 0;
        return aNum - bNum;
      })
      .map(async file => {
        const filePath = path.join(componentsDir, file);
        const code = await fs.readFile(filePath, 'utf-8');
        return {
          name: file.replace('.tsx', ''),
          code,
          preview: file
        };
      }));

    return variants;
  } catch (error) {
    console.error('Error fetching component variants:', error);
    throw error;
  }
});

export const fetchComponentMetadata = cache(async (componentName: string): Promise<Component> => {
  try {
    const metadataPath = path.join(process.cwd(), 'app', 'multiui', componentName, 'metadata.json');
    
    const defaultMetadata = {
      name: capitalizeFirstLetter(componentName),
      displayName: capitalizeFirstLetter(componentName),
      description: `A collection of ${componentName.toLowerCase()} components with different styles and animations`,
      category: 'UI Components',
      tags: ['interactive', 'animated']
    };

    try {
      await fs.stat(metadataPath);
      const fileContent = await fs.readFile(metadataPath, 'utf-8');
      const fileMetadata = JSON.parse(fileContent);
      return {
        ...defaultMetadata,
        ...fileMetadata,
        name: componentName,
        displayName: capitalizeFirstLetter(componentName)
      };
    } catch {
      return defaultMetadata;
    }
  } catch (error) {
    console.error('Error fetching component metadata:', error);
    return {
      name: capitalizeFirstLetter(componentName),
      displayName: capitalizeFirstLetter(componentName),
      description: `A collection of ${componentName.toLowerCase()} components with different styles and animations`,
      category: 'UI Components',
      tags: ['interactive', 'animated']
    };
  }
}); 