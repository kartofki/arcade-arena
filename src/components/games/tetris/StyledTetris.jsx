import styled from 'styled-components';
import bgImage from '../../../../public/assets/homebg.webp';

export const StyledTetrisWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-attachment: fixed; 
    background-size: cover;
    filter: blur(10px); /* Blurring the background image */
    z-index: -1; /* Ensuring the background image is behind the content */
  }
`;



export const StyledTetris = styled.div`
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  padding: 20px;
  border-radius: 10px; /* Optional styling */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional styling */
  color: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  z-index: 2;
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  margin-right: 0;
  margin-left: 300px;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
