import { useState, useEffect } from 'react';
import { GetUserHighestScore } from '../components/games/snake/leaderboard'

const useUserHighestScores = (username) => {
  const [scores, setScores] = useState({ tetris: 0, snake: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      const tetrisScore = await GetUserHighestScore(username, 'Tetris');
      const snakeScore = await GetUserHighestScore(username, 'snake');
      setScores({ tetris: tetrisScore, snake: snakeScore });
      setLoading(false);
    };

    fetchScores();
  }, [username]);

  return { scores, loading };
};

export default useUserHighestScores;
