import fs from 'fs';
import path from 'path';

// Path to the directory containing gallery images within the 'public' folder
const galleryDirectory = path.join(process.cwd(), 'public', 'gallery-images');

export async function getGalleryImagePaths(): Promise<string[]> {
  try {
    const filenames = await fs.promises.readdir(galleryDirectory);

    // Filter out any non-image files if necessary (e.g., .DS_Store)
    const imageFiles = filenames.filter(file =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );

    // Return paths relative to the 'public' directory for use in Image src
    return imageFiles.map(file => `/gallery-images/${file}`);
  } catch (error) {
    // If the directory doesn't exist or there's an error reading it, return an empty array
    console.error('Error reading gallery images directory:', error);
    return [];
  }
}