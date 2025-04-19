'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import type { Challenge } from '@/lib/challenges';

// Set the app element for react-modal accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('body'); // Adjust selector if needed
}

// Helper for difficulty styling (copied from page.tsx for encapsulation)
const getDifficultyClasses = (difficulty: Challenge['difficulty']) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Hard':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-300';
  }
};

interface ChallengeListClientProps {
  challenges: Challenge[];
}

const ChallengeListClient: React.FC<ChallengeListClientProps> = ({ challenges }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const openModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedChallenge(null);
  };

  return (
    <>
      <div className="space-y-6">
        {challenges.map((challenge) => (
          // Use a button for accessibility and clear click handling
          <button
            key={challenge.id}
            onClick={() => openModal(challenge)}
            id={challenge.id} // Keep id for anchor links if needed elsewhere
            className="block w-full text-left group focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 rounded-lg"
          >
            <div className="bg-white/80 p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200 border border-olive/20 group-hover:border-amber">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                <h3 className="text-xl font-medium text-olive group-hover:text-amber transition-colors">{challenge.title}</h3>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyClasses(challenge.difficulty)} capitalize whitespace-nowrap`}>
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-gray-700">{challenge.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Challenge Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Challenge Details"
        // Basic styling, adjust as needed
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-transparent z-40"
      >
        {selectedChallenge && (
          <div className="relative bg-white/90 rounded-lg shadow-xl p-6 sm:p-8 max-w-lg w-full mx-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="flex justify-between items-start mb-4 gap-2">
                 <h2 className="text-2xl font-semibold text-olive flex-1">{selectedChallenge.title}</h2>
                 <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyClasses(selectedChallenge.difficulty)} capitalize whitespace-nowrap`}>
                    {selectedChallenge.difficulty}
                 </span>
            </div>

            <p className="text-gray-700 text-base">
              {selectedChallenge.description}
            </p>

            {/* Add more details or actions here (e.g., Sign Up button) */}
            {/* <div className="mt-6 text-right">
              <button className="bg-amber text-white px-4 py-2 rounded-md hover:bg-amber/90">
                Sign Up / Join
              </button>
            </div> */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ChallengeListClient;