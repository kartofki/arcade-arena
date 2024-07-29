import { HStack, Image, Text } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import React from 'react'
import ColorModeSwitch from './ColorModeSwitch';
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
        </ul>
      </nav>

    </>
      )
    }

export default Home