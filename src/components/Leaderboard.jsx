import React, { useState, useEffect } from 'react';
import { GetLeaderboard as GetSnakeLeaderboard } from './games/snake/leaderboard'; 
import { GetLeaderboard as GetTetrisLeaderboard } from './games/snake/leaderboard';  
import { GetLeaderboard as GetFlappyBirdLeaderboard } from './games/snake/leaderboard'; 
import NavBar from './NavBar';
import useAuthStore from '../store/authStore';

const Leaderboard = () => {
  const [snakeLeaderboard, setSnakeLeaderboard] = useState([]);
  const [tetrisLeaderboard, setTetrisLeaderboard] = useState([]);
  const [flappyBirdLeaderboard, setFlappyBirdLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const snakeData = await GetSnakeLeaderboard('snake');
        const tetrisData = await GetTetrisLeaderboard('Tetris');
        const flappyBirdData = await GetFlappyBirdLeaderboard('FlappyBird'); 
        
        // Filter and sort scores above 0
        const sortedSnakeData = snakeData.filter(entry => entry.score > 0).sort((a, b) => b.score - a.score);
        const sortedTetrisData = tetrisData.filter(entry => entry.score > 0).sort((a, b) => b.score - a.score);
        const sortedFlappyBirdData = flappyBirdData.filter(entry => entry.score > 0).sort((a, b) => b.score - a.score);
        
        setSnakeLeaderboard(sortedSnakeData);
        setTetrisLeaderboard(sortedTetrisData);
        setFlappyBirdLeaderboard(sortedFlappyBirdData);
      } catch (error) {
        console.error('Error fetching leaderboards:', error);
      }
    };

    fetchLeaderboards();
  }, []);

  // Renders medals for the top 3 scores
  const renderMedal = (index) => {
    if (index === 0) return '🥇 ';
    if (index === 1) return '🥈 ';
    if (index === 2) return '🥉 ';
    return '';
  };

  return (
    <>
      <NavBar />
      <div className="homeAuth2">
        <div className="leaderboards">
          <div className="leaderboardContainer">
            <h2>Snake Leaderboard</h2>
            <ol>
              {snakeLeaderboard.map((entry, index) => (
                <li className="leadEntry" key={index}>
                  {renderMedal(index)} {renderMedal(index) ? '' : `${index + 1}.`} {entry.username}: {entry.score}
                </li>
              ))}
            </ol>
          </div>
          <div className="leaderboardContainer">
            <h2>Tetris Leaderboard</h2>
            <ol>
              {tetrisLeaderboard.map((entry, index) => (
                <li className="leadEntry" key={index}>
                  {renderMedal(index)} {renderMedal(index) ? '' : `${index + 1}.`} {entry.username}: {entry.score}
                </li>
              ))}
            </ol>
          </div>
          <div className="leaderboardContainer">
            <h2>Flappy Bird Leaderboard</h2>
            <ol>
              {flappyBirdLeaderboard.map((entry, index) => (
                <li className="leadEntry" key={index}>
                  {renderMedal(index)} {renderMedal(index) ? '' : `${index + 1}.`} {entry.username}: {entry.score}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
