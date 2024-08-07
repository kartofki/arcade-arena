import React, { useState, useRef, useEffect, useCallback } from "react";
import { useInterval } from "../../../hooks/useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  DIRECTIONS
} from "./constants";
import NavBar from '../../NavBar';
import { AddUserInLeaderboard, GetLeaderboard, GetUserHighestScore } from "./leaderboard";
import useAuthStore from "../../../store/authStore"; // Ensure this is the correct path to your auth store

const Snake = () => {
  const canvasRef = useRef();
  const gameContainerRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [directionChanged, setDirectionChanged] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const { user } = useAuthStore();

  useInterval(() => gameLoop(), speed);

  const endGame = async () => {
    setSpeed(null);
    setGameOver(true);
    new Audio("/assets/gameover.mp3").play();

    // Save score to Firestore
    try {
      if (user && user.username) {
        await AddUserInLeaderboard(user.username, "snake", score);
        fetchUserHighestScore(); // Update the highest score after saving the new score
      }
    } catch (error) {
      console.error("Error adding score to leaderboard: ", error);
    }

    // Fetch leaderboard
    fetchLeaderboard();
  };

  const fetchLeaderboard = async () => {
    try {
      const leaderboardData = await GetLeaderboard("snake");
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard: ", error);
    }
  };

  const fetchUserHighestScore = async () => {
    try {
      if (user && user.username) {
        const userHighestScore = await GetUserHighestScore(user.username, "snake");
        setHighestScore(userHighestScore);
      }
    } catch (error) {
      console.error("Error fetching user highest score: ", error);
    }
  };

  const isOppositeDirection = (newDir, currentDir) => {
    return newDir[0] === -currentDir[0] && newDir[1] === -currentDir[1];
  };

  const moveSnake = useCallback(
    (e) => {
      const { keyCode } = e;
      if (keyCode >= 37 && keyCode <= 40) {
        e.preventDefault();
        const newDir = DIRECTIONS[keyCode];
        if (!isOppositeDirection(newDir, dir) && !gameOver && !directionChanged) {
          setDir(newDir);
          setDirectionChanged(true);
        }
      }
    },
    [dir, gameOver, directionChanged]
  );

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      setScore(score + 1);
      new Audio("/assets/eat.mp3").play();
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    setDirectionChanged(false);

    const snakeCopy = JSON.parse(JSON.stringify(snake));
    let newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];

    if (newSnakeHead[0] * SCALE >= CANVAS_SIZE[0]) {
      newSnakeHead[0] = 0;
    } else if (newSnakeHead[0] < 0) {
      newSnakeHead[0] = CANVAS_SIZE[0] / SCALE - 1;
    }

    if (newSnakeHead[1] * SCALE >= CANVAS_SIZE[1]) {
      newSnakeHead[1] = 0;
    } else if (newSnakeHead[1] < 0) {
      newSnakeHead[1] = CANVAS_SIZE[1] / SCALE - 1;
    }

    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) return endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(360);
    setGameOver(false);
    setScore(0);
    setDirectionChanged(false);
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchUserHighestScore();
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);

    // Draw background
    context.fillStyle = "#3d3d3d";
    context.fillRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

    // Draw grid
    context.strokeStyle = "#1f1e1e";
    context.lineWidth = 0.005;
    for (let x = 0; x < CANVAS_SIZE[0] / SCALE; x++) {
      for (let y = 0; y < CANVAS_SIZE[1] / SCALE; y++) {
        context.strokeRect(x, y, 1, 1);
      }
    }

    // Draw snake
    snake.forEach(([x, y], index) => {
      context.fillStyle = index === 0 ? "#006400" : "#008000";
      context.fillRect(x, y, 1, 1);
      context.strokeStyle = "#005000";
      context.lineWidth = 0.01;
      context.strokeRect(x, y, 1, 1);
    });

    // Draw apple
    context.fillStyle = "#ff0000";
    context.fillRect(apple[0], apple[1], 1, 1);
    context.strokeStyle = "#8b0000";
    context.lineWidth = 0.01;
    context.strokeRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <>
      <NavBar />
      <div className="snakeScreen">
        <div className="snakeAll">
          <div className="snakeContainer" ref={gameContainerRef} tabIndex="0" onKeyDown={e => moveSnake(e)}>
            <div style={{ textAlign: "center" }}>
              <canvas
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
              />
            </div>
          </div>
          <div className="gameButtons">
            <div className="gameInfo">
              <div>Score: {score}</div>
              <div>Your Best: {highestScore}</div>
            </div>
            {gameOver && <div className="gameOverMessage">GAME OVER!</div>}
            {!gameOver && (
              <button className="startGameBtn"
                onClick={startGame}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                  borderRadius: "5px"
                }}
              >
                Start Game
              </button>
            )}
            {gameOver && (
              <button className="startGameBtn"
                onClick={startGame}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                  borderRadius: "5px"
                }}
              >
                Restart Game
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Snake;