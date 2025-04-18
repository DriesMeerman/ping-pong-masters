import { getGalleryImagePaths } from '@/lib/gallery';
import GalleryClient from '@/components/GalleryClient'; // Import the new client component

// Keep this as an async Server Component
const GalleryPage = async () => {
  // Fetch data on the server
  const imagePaths = await getGalleryImagePaths();

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-150px)]">
      <h1 className="text-4xl font-bold text-skin mb-8 text-center">Gallery</h1>

      {/* Render the Client Component, passing data as props */}
      <GalleryClient imagePaths={imagePaths} />
    </div>
  );
};

export default GalleryPage;