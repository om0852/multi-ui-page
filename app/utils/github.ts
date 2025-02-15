const GITHUB_API_URL = 'https://api.github.com/repos/om0852/multi-ui/contents';
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/om0852/multi-ui/main';

export interface GithubComponent {
  name: string;
  displayName: string;
  path: string;
  type: string;
  content?: string;
  variants?: string[];
}

interface ComponentVariant {
  name: string;
  code: string;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export async function fetchComponentsList(): Promise<GithubComponent[]> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/app`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch components');
    }

    const data = await response.json();
    const components = data.filter((item: GithubComponent) => 
      item.type === 'dir' && !item.name.startsWith('.') && !['components', 'utils', 'hooks', 'docs'].includes(item.name.toLowerCase())
    ).map(item => ({
      ...item,
      displayName: capitalizeFirstLetter(item.name)
    }));

    // Fetch variants for each component
    const componentsWithVariants = await Promise.all(
      components.map(async (component) => {
        const variantsResponse = await fetch(`${GITHUB_API_URL}/app/${component.name}/_components`, {
          next: { revalidate: 3600 }
        });
        
        if (!variantsResponse.ok) {
          return component;
        }

        const variantsData = await variantsResponse.json();
        const variants = variantsData
          .filter((item: any) => item.type === 'file' && item.name.toLowerCase().includes('.tsx'))
          .map((item: any) => item.name.replace('.tsx', ''));

        return {
          ...component,
          variants
        };
      })
    );

    return componentsWithVariants;
  } catch (error) {
    console.error('Error fetching components:', error);
    return [];
  }
}

export async function fetchComponentVariants(componentName: string): Promise<ComponentVariant[]> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/app/${componentName}/_components`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch component variants');
    }

    const data = await response.json();
    const variants = data.filter((item: any) => 
      item.type === 'file' && item.name.toLowerCase().includes('.tsx')
    );

    const variantsWithCode = await Promise.all(
      variants.map(async (variant: any) => {
        const code = await fetchComponentCode(`app/${componentName}/_components/${variant.name}`);
        return {
          name: variant.name.replace('.tsx', ''),
          code: code || ''
        };
      })
    );

    return variantsWithCode;
  } catch (error) {
    console.error('Error fetching component variants:', error);
    return [];
  }
}

export async function fetchComponentCode(componentPath: string): Promise<string | null> {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/${componentPath}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch component code');
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching component code:', error);
    return null;
  }
}

export async function fetchComponentMetadata(componentName: string): Promise<any | null> {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/app/${componentName}/metadata.json`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      // Generate default metadata based on component name
      return {
        name: componentName.replace(/([A-Z])/g, ' $1').trim(),
        description: `A collection of ${componentName.toLowerCase()} components with different styles and animations`,
        category: 'UI Components',
        tags: ['interactive', 'animated'],
        installation: `npm install @multi-ui/core`,
        usage: `import { ${componentName} } from '@multi-ui/core'`
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching component metadata:', error);
    return null;
  }
} 