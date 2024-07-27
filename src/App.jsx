import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, ButtonGroup, Grid, GridItem } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import ColorModeSwitch from './components/ColorModeSwitch'

function App() {
  return <Grid templateAreas={`"nav nav" "aside main" "footer footer"`}>
    <GridItem area='nav'>
      <NavBar />
    </GridItem>
    <GridItem area='aside' bg='gold'>Aside</GridItem>
    <GridItem area='main' bg='dodgerblue'>Main</GridItem>
    <GridItem area='footer' bg='green'>Footer</GridItem>
  </Grid>
  
}

export default App
