import { useState, useEffect } from 'react';
import { GetLeaderboard } from '../components/games/snake/leaderboard'; 

const useLatestScores = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                // Fetch the latest scores for different games
                const tetrisScores = await GetLeaderboard('Tetris');
                const snakeScores = await GetLeaderboard('snake');
                const flappyBirdScores = await GetLeaderboard('FlappyBird');

                // Combine scores from all games
                const allScores = [
                    ...tetrisScores.map(score => ({ ...score, game: 'Tetris' })),
                    ...snakeScores.map(score => ({ ...score, game: 'Snake' })),
                    ...flappyBirdScores.map(score => ({ ...score, game: 'Flappy Bird' }))
                ];

                // Filter scores to only include those greater than 0
                const validScores = allScores.filter(score => score.score > 0);

                // Sort all valid scores by timestamp in descending order
                validScores.sort((a, b) => b.timestamp - a.timestamp);

                // Keep only the last 3 scores (most recent ones)
                setScores(validScores.slice(0, 3));
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    return { scores, loading };
};

export default useLatestScores;
