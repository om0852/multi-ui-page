import { Suspense } from 'react';
import VariantPageClient from './VariantPageClient';

// type Props = {
//   params: {
//     slug: string;
//     variantId: string;
//   }
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   return {
//     title: `${params.slug} Variant ${params.variantId} - Multi UI`,
//     description: `Explore and use the ${params.slug} component variant ${params.variantId} in your projects.`
//   };
// }

export default function Page() {
    return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    }>
      <VariantPageClient />
    </Suspense>
  );
} 