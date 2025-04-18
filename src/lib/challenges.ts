import fs from 'fs';
import path from 'path';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Or use a more flexible string type
}

// Determine the correct path to the data file
// process.cwd() gives the root of the Next.js project
const challengesFilePath = path.join(process.cwd(), 'data', 'challenges.json');

export async function getChallenges(): Promise<Challenge[]> {
  try {
    const jsonData = await fs.promises.readFile(challengesFilePath, 'utf-8');
    const challenges = JSON.parse(jsonData) as Challenge[];
    return challenges;
  } catch (error) {
    console.error('Error reading challenges data:', error);
    // Depending on requirements, return empty array or throw the error
    return [];
  }
}