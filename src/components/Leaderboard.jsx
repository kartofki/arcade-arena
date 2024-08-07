import React, { useState, useEffect } from 'react';
import { GetLeaderboard as GetSnakeLeaderboard } from './games/snake/leaderboard'; 
import { GetLeaderboard as GetTetrisLeaderboard } from './games/snake/leaderboard';  
import { GetLeaderboard as GetFlappyBirdLeaderboard } from './games/snake/leaderboard'; // Adjust the import path if necessary
import NavBar from './NavBar';
import useAuthStore from '../store/authStore';

const Leaderboard = () => {
  const [snakeLeaderboard, setSnakeLeaderboard] = useState([]);
  const [tetrisLeaderboard, setTetrisLeaderboard] = useState([]);
  const [flappyBirdLeaderboard, setFlappyBirdLeaderboard] = useState([]); // New state for Flappy Bird leaderboard
  const authUser = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const snakeData = await GetSnakeLeaderboard('snake');
        const tetrisData = await GetTetrisLeaderboard('Tetris');
        const flappyBirdData = await GetFlappyBirdLeaderboard('FlappyBird'); // Fetch Flappy Bird leaderboard
        
        // Filter scores above 0
        setSnakeLeaderboard(snakeData.filter(entry => entry.score > 0));
        setTetrisLeaderboard(tetrisData.filter(entry => entry.score > 0));
        setFlappyBirdLeaderboard(flappyBirdData.filter(entry => entry.score > 0)); // Set Flappy Bird leaderboard
      } catch (error) {
        console.error('Error fetching leaderboards:', error);
      }
    };

    fetchLeaderboards();
  }, []);

  const renderMedal = (index) => {
    if (index === 0) return '🥇 ';
    if (index === 1) return '🥈 ';
    if (index === 2) return '🥉 ';
    return '';
  };

  return (
    <>
      <NavBar />
      <div className="tetrisPage">
        <div className="leaderboards">
          <div className="leaderboardContainer">
            <h2>Snake Leaderboard</h2>
            <ol>
              {snakeLeaderboard.map((entry, index) => (
                <li className="leadEntry" key={index}>{renderMedal(index)} {renderMedal(index) ? '' : `${index + 1}.`} {entry.username}: {entry.score}</li>
              ))}
            </ol>
          </div>
          <div className="leaderboardContainer">
            <h2>Tetris Leaderboard</h2>
            <ol>
              {tetrisLeaderboard.map((entry, index) => (
                <li className="leadEntry" key={index}>{renderMedal(index)} {renderMedal(index) ? '' : `${index + 1}.`} {entry.username}: {entry.score}</li>
              ))}
            </ol>
          </div>
          <div className="leaderboardContainer">
            <h2>Flappy Bird Leaderboard</h2>
            <ol>
              {flappyBirdLeaderboard.map((entry, index) => (
                <li className="leadEntry" key={index}>{renderMedal(index)} {renderMedal(index) ? '' : `${index + 1}.`} {entry.username}: {entry.score}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
