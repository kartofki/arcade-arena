import {Container, Flex, Input, Button, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import NavBar from "./NavBar"
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth'

const AuthPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
  <>
  {isLoggedIn ? <Login /> : <Signup />}
  <GoogleAuth />
  </>
  )
}

export default AuthPage