import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react'
import LoginPage from './LoginPage';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/snake">Snake</Link>
          </li>
          <li>
            <Link to="/tetris">Tetris</Link>
          </li>
        </ul>
      </nav>

    </>
      )
    }

export default Home