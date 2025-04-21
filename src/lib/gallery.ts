import fs from 'fs';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';

// Path to the directory containing gallery images within the 'public' folder
const galleryDirectory = path.join(process.cwd(), 'public', 'gallery-images');
const publicGalleryPath = '/gallery-images'; // Base public path

export interface GalleryImage {
  src: string;
  blurDataURL: string;
  group: string; // Added group property
}

// Helper function to recursively find image files
async function findImageFiles(dir: string, basePublicPath: string, currentGroup: string): Promise<GalleryImage[]> {
  let images: GalleryImage[] = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const publicPath = `${basePublicPath}/${entry.name}`;

    if (entry.isDirectory()) {
      // Recursively search in subdirectories, using the directory name as the group
      images = images.concat(await findImageFiles(fullPath, publicPath, entry.name));
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
      // Process image files
      try {
        const buffer = await fs.promises.readFile(fullPath);
        const { base64 } = await getPlaiceholder(buffer);
        images.push({
          src: publicPath,
          blurDataURL: base64,
          group: currentGroup, // Assign the current group
        });
      } catch (placeholderError) {
        console.error(`Error generating placeholder for ${fullPath}:`, placeholderError);
        // Optionally skip the image or add with a default/missing blurDataURL
      }
    }
  }
  return images;
}

export async function getGalleryImagePaths(): Promise<GalleryImage[]> {
  try {
    // Start searching from the root gallery directory with a default group name like 'General'
    const allImages = await findImageFiles(galleryDirectory, publicGalleryPath, 'General');
    return allImages;
  } catch (error: unknown) {
    // If the base directory doesn't exist or there's an error reading it
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'ENOENT') {
        console.log(`Gallery directory not found: ${galleryDirectory}. No images loaded.`);
    } else {
        console.error('Error reading gallery images directory or generating placeholders:', error);
    }
    return [];
  }
}