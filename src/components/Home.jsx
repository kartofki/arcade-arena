import React from 'react'
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