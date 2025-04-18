import Image from 'next/image';
import { getGalleryImagePaths } from '@/lib/gallery'; // Assuming @ alias

// Make the component async to fetch data server-side
const GalleryPage = async () => {
  const imagePaths = await getGalleryImagePaths();

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-150px)]">
      <h1 className="text-4xl font-bold text-skin mb-8 text-center">Gallery</h1>

      {imagePaths.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagePaths.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group border-2 border-amber/50 hover:border-amber transition-colors">
              <Image
                src={src}
                alt={`Gallery image ${src.split('/').pop()}`}
                fill // Use fill to cover the container
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Responsive sizes
                className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-olive/80">The gallery is currently empty. Add some images to <code>public/gallery-images/</code>!</p>
      )}
    </div>
  );
};

export default GalleryPage;