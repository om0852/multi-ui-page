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

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export async function fetchComponentsList(): Promise<Component[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/components/`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchComponentVariants(componentName: string): Promise<ComponentVariant[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/components/${encodeURIComponent(componentName)}/variants`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchComponentMetadata(componentName: string): Promise<Component> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/components/${encodeURIComponent(componentName)}/metadata`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getGithubData() {
  const response = await fetch('/api/github');
  return response.json();
} 