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
    
    if (!fs.existsSync(componentsDir)) {
      console.error('Components directory not found:', componentsDir);
      return [];
    }

    const files = fs.readdirSync(componentsDir);
    const variants = files
      .filter(file => file.endsWith('.tsx'))
      .sort((a, b) => {
        const aNum = parseInt(a.split('_')[1]) || 0;
        const bNum = parseInt(b.split('_')[1]) || 0;
        return aNum - bNum;
      })
      .map(file => {
        const filePath = path.join(componentsDir, file);
        const code = fs.readFileSync(filePath, 'utf-8');
        return {
          name: file.replace('.tsx', ''),
          code,
          preview: file
        };
      });

    return variants;
  } catch (error) {
    console.error('Error fetching component variants:', error);
    throw error;
  }
}

export async function fetchComponentMetadata(componentName: string): Promise<Component> {
  try {
    const metadataPath = path.join(process.cwd(), 'app', 'multiui', componentName, 'metadata.json');
    
    const defaultMetadata = {
      name: capitalizeFirstLetter(componentName),
      displayName: capitalizeFirstLetter(componentName),
      description: `A collection of ${componentName.toLowerCase()} components with different styles and animations`,
      category: 'UI Components',
      tags: ['interactive', 'animated']
    };

    if (!fs.existsSync(metadataPath)) {
      return defaultMetadata;
    }

    const fileMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    return {
      ...defaultMetadata,
      ...fileMetadata,
      name: componentName,
      displayName: capitalizeFirstLetter(componentName)
    };
  } catch (error) {
    console.error('Error fetching component metadata:', error);
    const defaultMetadata = {
      name: capitalizeFirstLetter(componentName),
      displayName: capitalizeFirstLetter(componentName),
      description: `A collection of ${componentName.toLowerCase()} components with different styles and animations`,
      category: 'UI Components',
      tags: ['interactive', 'animated']
    };
    return defaultMetadata;
  }
} 