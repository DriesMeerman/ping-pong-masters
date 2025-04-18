import { getAllChallenges, Challenge } from '@/lib/challenges';
import { FeaturedChallenges } from '@/components/FeaturedChallenges';
import ChallengeListClient from '@/components/ChallengeListClient';

const ChallengesPage = async () => {
  const allChallenges = await getAllChallenges();

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-150px)]">
      <h1 className="text-4xl font-bold text-skin mb-8 text-center">Challenges</h1>

      <div className="mb-12">
        <FeaturedChallenges showViewAllButton={false} />
      </div>

      <h2 className="text-3xl font-semibold text-olive mb-6">All Challenges</h2>

      {allChallenges.length > 0 ? (
        <ChallengeListClient challenges={allChallenges} />
      ) : (
        <p className="text-center text-lg text-gray-600">No challenges found.</p>
      )}
    </div>
  );
};

export default ChallengesPage;