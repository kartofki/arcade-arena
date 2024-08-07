import {Container, Flex, Input, Button, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';


const AuthPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
  <>
  {isLoggedIn ? <Login /> : <Signup />}
  </>
  )
}

export default AuthPage