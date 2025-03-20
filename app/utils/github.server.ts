import 'server-only';
import fs from 'fs';
import path from 'path';

export interface Component {
  name: string;
  displayName: string;
  description: string;
  category: string;
  tags: string[];
}

export interface ComponentVariant {
  name: string;
  code: string;
  preview?: string;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export async function fetchComponentsList(): Promise<Component[]> {
  try {
    const componentsDir = path.join(process.cwd(), 'app', 'multiui');
    const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
    
    const components = entries
      .filter(entry => 
        entry.isDirectory() && 
        !entry.name.startsWith('.') && 
        !['components', 'utils', 'hooks', 'docs'].includes(entry.name.toLowerCase())
      )
      .map(entry => {
        const metadataPath = path.join(componentsDir, entry.name, 'metadata.json');
        let metadata = {
          name: capitalizeFirstLetter(entry.name),
          description: `A collection of ${entry.name.toLowerCase()} components with different styles and animations`,
          category: 'UI Components',
          tags: ['interactive', 'animated']
        };

        if (fs.existsSync(metadataPath)) {
          try {
            const fileMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
            metadata = { ...metadata, ...fileMetadata };
          } catch (error) {
            console.error(`Error reading metadata for ${entry.name}:`, error);
          }
        }

        return {
          ...metadata,
          name: entry.name,
          displayName: capitalizeFirstLetter(entry.name)
        };
      });

    return components;
  } catch (error) {
    console.error('Error fetching components:', error);
    return [];
  }
}

export async function fetchComponentVariants(componentName: string): Promise<ComponentVariant[]> {
  try {
    const componentsDir = path.join(process.cwd(), 'app', 'multiui', componentName, '_components');
    const files = fs.readdirSync(componentsDir);
    
    const variants = files
      .filter(file => file.startsWith(`${capitalizeFirstLetter(componentName)}_`))
      .map(file => ({
        name: file.replace('.tsx', ''),
        code: fs.readFileSync(path.join(componentsDir, file), 'utf-8')
      }));

    return variants;
  } catch (error) {
    console.error('Error fetching component variants:', error);
    return [];
  }
}

export async function fetchComponentMetadata(componentName: string): Promise<Component> {
  const defaultMetadata: Component = {
    name: componentName,
    displayName: capitalizeFirstLetter(componentName),
    description: `A collection of ${componentName.toLowerCase()} components`,
    category: 'UI Components',
    tags: ['interactive']
  };

  try {
    const metadataPath = path.join(process.cwd(), 'app', 'multiui', componentName, 'metadata.json');

    if (fs.existsSync(metadataPath)) {
      const fileMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      return { ...defaultMetadata, ...fileMetadata };
    }

    return defaultMetadata;
  } catch (error) {
    console.error('Error fetching component metadata:', error);
    return defaultMetadata;
  }
} 