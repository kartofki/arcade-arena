import React from 'react'
import LoginPage from './LoginPage';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar'

const Home = () => {
    return (
        <>
      <NavBar />
      <div className='frontPage'>
        <div className="bgText">
        <h1>Join the biggest Arcade Games platform</h1>
        <button>Sign Up</button>
        <button>Log In</button>
        </div>
      </div>

      
      <Outlet />
    </>
      )
    }

export default Home