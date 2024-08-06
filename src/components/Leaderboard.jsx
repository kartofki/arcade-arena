import React, { useState, useEffect } from 'react';
import { GetLeaderboard as GetSnakeLeaderboard } from './games/snake/leaderboard'; 
import { GetLeaderboard as GetTetrisLeaderboard } from './games/snake/leaderboard';  
import NavBar from './NavBar';

const Leaderboard = () => {
  const [snakeLeaderboard, setSnakeLeaderboard] = useState([]);
  const [tetrisLeaderboard, setTetrisLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const snakeData = await GetSnakeLeaderboard('snake');
        const tetrisData = await GetTetrisLeaderboard('Tetris');
        setSnakeLeaderboard(snakeData);
        setTetrisLeaderboard(tetrisData);
      } catch (error) {
        console.error('Error fetching leaderboards:', error);
      }
    };

    fetchLeaderboards();
  }, []);

  return (
    <>
      <NavBar />
      <div className="leaderboardContainer">
        <div>
          <h2>Snake Leaderboard</h2>
          <ol>
            {snakeLeaderboard.map((entry, index) => (
              <li key={index}>{entry.username}: {entry.score}</li>
            ))}
          </ol>
        </div>
        <div>
          <h2>Tetris Leaderboard</h2>
          <ol>
            {tetrisLeaderboard.map((entry, index) => (
              <li key={index}>{entry.username}: {entry.score}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
