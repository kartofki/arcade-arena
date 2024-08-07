import React, { useState, useEffect, useRef } from 'react';
import { AddUserInLeaderboard, GetLeaderboard } from '../../../components/games/snake/leaderboard';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import NavBar from '../../NavBar';
import { StyledTetris, StyledTetrisWrapper } from './StyledTetris';
import { usePlayer } from '../../../hooks/usePlayer';
import { useStage } from '../../../hooks/useStage';
import { createStage, checkCollision } from './tetrisUtils';
import { useInterval } from '../../../hooks/useInterval';
import { useGameStatus } from '../../../hooks/useGameStatus';
import useAuthStore from '../../../store/authStore'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(); 
  const [stage, setStage, rowsCleared, resetRowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel, resetGameStatus] = useGameStatus(rowsCleared);

  const gameWrapperRef = useRef(null);

  const user = useAuthStore((state) => state.user); // Use Zustand to get the current user

  const move = (e) => {
    e.preventDefault();
    if (!gameOver) {
      if (e.keyCode === 37) {
        movePlayer(-1);
      } else if (e.keyCode === 39) {
        movePlayer(1);
      } else if (e.keyCode === 40) {
        dropPlayer();
      } else if (e.keyCode === 32) {
        hardDrop();
      } else if (e.keyCode === 38) {
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
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('start')) {
      autoStartGame();
      if (gameWrapperRef.current) {
        gameWrapperRef.current.focus();
      }
    }
  }, []);

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        if (user && user.username) {
          AddUserInLeaderboard(user.username, 'Tetris', score).then(() => {
            GetLeaderboard('Tetris').then(setLeaderboard);
          });
        }
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
          <div className="tetrisPage">
            <div className="tetrisWrap">
            
              <StyledTetrisWrapper ref={gameWrapperRef} role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
                <StyledTetris>
                  <Stage stage={stage} />
                  <aside>
                    {gameOver ? (
                      <>
                      <div className="gameInfo infoTetris">
                        <div>Game Over!</div>
                        <div>Score: {score}</div>
                        </div>
                      </>
                    ) : (
                      <div className="gameInfo infoTetris">
                        <div>Score: {score}</div>
                        <div>Rows: {rows}</div>
                        <div>Level: {level}</div>
                      </div>
                    )}
                    <StartButton callback={startGame} />
                  </aside>
                </StyledTetris>
              </StyledTetrisWrapper>
              </div>
           
          </div>
        </>
      );
};

export default Tetris;
