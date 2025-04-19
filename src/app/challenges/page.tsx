import { getAllChallengesButFeatured } from '@/lib/challenges';
import { FeaturedChallenges } from '@/components/FeaturedChallenges';
import ChallengeListClient from '@/components/ChallengeListClient';

const ChallengesPage = async () => {
  const challenges = await getAllChallengesButFeatured();
  // randomize the challenge order
  const shuffledChallenges = challenges.sort(() => Math.random() - 0.5);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-150px)]">
      <h1 className="text-4xl font-bold text-skin mb-8 text-center">Challenges</h1>

      <div className="mb-12">
        <FeaturedChallenges showViewAllButton={false} />
      </div>

      <h2 className="text-3xl font-semibold text-olive mb-6">All Challenges</h2>

      {challenges.length > 0 ? (
        <ChallengeListClient challenges={shuffledChallenges} />
      ) : (
        <p className="text-center text-lg text-gray-600">No challenges found.</p>
      )}
    </div>
  );
};

export default ChallengesPage;