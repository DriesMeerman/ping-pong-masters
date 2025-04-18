import fs from 'fs';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';

// Path to the directory containing gallery images within the 'public' folder
const galleryDirectory = path.join(process.cwd(), 'public', 'gallery-images');

export interface GalleryImage {
  src: string;
  blurDataURL: string;
}

export async function getGalleryImagePaths(): Promise<GalleryImage[]> {
  try {
    const filenames = await fs.promises.readdir(galleryDirectory);

    const imageFiles = filenames.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file) // Plaiceholder might not support all SVG variants well
    );

    // Generate src and blurDataURL for each image
    const imagesWithData = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(galleryDirectory, file);
        const buffer = await fs.promises.readFile(filePath);
        const { base64 } = await getPlaiceholder(buffer);
        return {
          src: `/gallery-images/${file}`,
          blurDataURL: base64,
        };
      })
    );

    return imagesWithData;

  } catch (error) {
    // If the directory doesn't exist or there's an error reading it, return an empty array
    console.error('Error reading gallery images directory or generating placeholders:', error);
    return [];
  }
}