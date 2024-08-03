import React, { useState, useRef, useEffect, useCallback } from "react";
import { useInterval } from "../../../hooks/useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./constants";
import NavBar from '../../NavBar'

const App = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null); 
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [directionChanged, setDirectionChanged] = useState(false);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    new Audio("/assets/gameover.mp3").play();
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
    setDirectionChanged(false); // 

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
    if (score > 0 && score < 20 && score % 5 === 0) {
      setSpeed(speed => Math.max(speed - 10, 300));
    }
    if (score >= 20 && score % 10 === 0) {
      setSpeed(speed => Math.max(speed - 10, 100));
    }

    console.log(speed)
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(500); 
    setGameOver(false);
    setScore(0);
    setDirectionChanged(false);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);

    // Draw background
    context.fillStyle = "#3d3d3d"; 
    context.fillRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

    // Draw grid
    context.strokeStyle = "#1f1e1e"; 
    context.lineWidth = 0.01;
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
        <div className="snakeContainer">
    <div
      role="button"
      tabIndex="0"
      onKeyDown={e => moveSnake(e)}
      style={{ textAlign: "center" }}
    >
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Score: {score}
        </span>
      </div>
      {gameOver && <div style={{ fontSize: "30px", color: "red" }}>GAME OVER!</div>}
      {!gameOver && <button
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
      </button>}
      {gameOver && <button
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
      </button>}
    </div>
    </div>
    </div>
    </>
  );
};

export default App;
