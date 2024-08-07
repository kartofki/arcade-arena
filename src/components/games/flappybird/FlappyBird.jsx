import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../NavBar";
import { AddUserInLeaderboard, GetUserHighestScore } from "../../../components/games/snake/leaderboard";
import useAuthStore from '../../../store/authStore'; // Adjust the path to your auth store

const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;

function FlappyBird() {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0); // New state for highest score

  const user = useAuthStore((state) => state.user); // Use Zustand to get the current user

  useEffect(() => {
    const fetchHighestScore = async () => {
      if (user && user.username) {
        const highestScore = await GetUserHighestScore(user.username, 'FlappyBird');
        setHighestScore(highestScore);
      }
    };

    fetchHighestScore();
  }, [user]);

  useEffect(() => {
    let intVal;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos]);

  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >=
        WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsStart(false);
      setBirspos(300);
      if (user && user.username) {
        AddUserInLeaderboard(user.username, 'FlappyBird', score).then(() => {
          GetUserHighestScore(user.username, 'FlappyBird').then(setHighestScore);
        });
      }
      setScore(0);
    }
  }, [isStart, birdpos, objHeight, objPos, score, user]);

  const handler = () => {
    if (!isStart) setIsStart(true);
    else if (birdpos < BIRD_HEIGHT) setBirspos(0);
    else setBirspos((birdpos) => birdpos - 50);
  };

  return (
    <>
      <NavBar />
      <div className="snakeScreen">
        <div className="flappyAll">
          <div className="snakeContainer">
            <Home onClick={handler}>
              <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
                <Obj
                  height={objHeight}
                  width={OBJ_WIDTH}
                  left={objPos}
                  top={0}
                  deg={180}
                />
                <Bird
                  height={BIRD_HEIGHT}
                  width={BIRD_WIDTH}
                  top={birdpos}
                  left={100}
                />
                <Obj
                  height={WALL_HEIGHT - OBJ_GAP - objHeight}
                  width={OBJ_WIDTH}
                  left={objPos}
                  top={
                    WALL_HEIGHT -
                    (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))
                  }
                  deg={0}
                />
              </Background>
              <div className="gameButtons">
                <div className="gameinfo">
                  <ScoreShow>Score: {score}</ScoreShow>
                  <ScoreShow>Your Best: {highestScore}</ScoreShow>
                  {!isStart ? (
                    <button className="startGameBtn">Start</button>
                  ) : null}
                </div>
              </div>
            </Home>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlappyBird;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Background = styled.div`
  background-image: url("../public/assets/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("../public/assets/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("../public/assets/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const ScoreShow = styled.div`
  text-align: center;
  background: transparent;
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
`;
