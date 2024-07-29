import { HStack, Image, Text } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import React from 'react'
import ColorModeSwitch from './ColorModeSwitch';
import LoginPage from './LoginPage';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar'

const Home = () => {
    return (
        <>
      <NavBar />
      <Outlet />
    </>
      )
    }

export default Home