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
        <img className="frontText" src="../public/assets/textt.png"/>
        <div className="buttonsContainer">
        <Link to="/signup"><button>Sign Up</button></Link>
        <Link to="/auth"><button>Log In</button></Link>
        </div>
        </div>
      </div>

      
      <Outlet />
    </>
      )
    }

export default Home