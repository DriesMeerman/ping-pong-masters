'use client';

import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import type { GalleryImage } from '@/lib/gallery';

// Set the app element for react-modal accessibility
// We need to ensure this runs only on the client-side.
if (typeof window !== 'undefined') {
  Modal.setAppElement('body'); // Adjust selector if needed
}

interface GalleryClientProps {
  imagePaths: GalleryImage[];
}

const GalleryClient: React.FC<GalleryClientProps> = ({ imagePaths }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {imagePaths.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagePaths.map((image) => (
            <button
              key={image.src}
              onClick={() => openModal(image)}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg group border-2 border-amber/50 hover:border-amber transition-colors focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
            >
              <Image
                src={image.src}
                alt={`Gallery image ${image.src.split('/').pop()}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-olive/80">
          The gallery is currently empty. Add some images to{' '}
          <code>public/gallery-images/</code>!
        </p>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-transparent z-40"
      >
        <div className="relative bg-transparent rounded-lg shadow-xl">
          <button
            onClick={closeModal}
            className="absolute -top-3 -right-3 bg-skin text-white rounded-full p-1 z-10 hover:bg-olive transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {selectedImage && (
            <Image
              src={selectedImage.src}
              alt="Enlarged gallery image"
              width={800}
              height={600}
              placeholder="blur"
              blurDataURL={selectedImage.blurDataURL}
              style={{ 
                objectFit: 'contain',
                maxHeight: '85vh', 
                maxWidth: '90vw'
              }}
              className="rounded-md"
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default GalleryClient;