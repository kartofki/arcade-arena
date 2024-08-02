import React, { useState, useEffect, useRef } from 'react';

//components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import NavBar from '../../NavBar'

//styled components
import { StyledTetris, StyledTetrisWrapper } from './StyledTetris';

//custom hooks
import { usePlayer } from '../../../hooks/usePlayer';
import { useStage } from '../../../hooks/useStage';
import { createStage, checkCollision } from './tetrisUtils';
import { useInterval } from '../../../hooks/useInterval';
import { useGameStatus } from '../../../hooks/useGameStatus';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(); 
  const [stage, setStage, rowsCleared, resetRowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel, resetGameStatus] = useGameStatus(rowsCleared);

  const gameWrapperRef = useRef(null);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 32) {
        hardDrop();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    window.location.search = '?start=true';  
  };

  const autoStartGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);

  };

  useEffect(() => {
    // Check if the page was loaded with the start query parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('start')) {
      autoStartGame();
      if (gameWrapperRef.current) {
        gameWrapperRef.current.focus();  // Set focus to the game wrapper
      }
    }
  }, []);

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Increase the speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
      if (keyCode === 32) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const hardDrop = () => {
    let y = 0;
    while (!checkCollision(player, stage, { x: 0, y: y + 1 })) {
      y++;
    }
    updatePlayerPos({ x: 0, y: y, collided: true });
  };

  return (
    <>
    <NavBar />
    <StyledTetrisWrapper ref={gameWrapperRef} role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
    </>
  );
};

export default Tetris;
