import React from 'react';
import { StyledDisplay } from './StyledDisplay';

const Display = ({ gameOver, text, ...rest }) => {
  return <>
  <StyledDisplay gameOver={gameOver} {...rest}>{text}</StyledDisplay>
  </>;
};

export default Display;
