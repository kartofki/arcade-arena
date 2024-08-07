import React from 'react'
import LoginPage from './LoginPage';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar'
import HomeAuth from './HomeAuth';

const Home = () => {
    return (
        <>
      <NavBar />
      <div className='frontPage'>
        <div className="bgText">
        <img className="frontText" src="../public/assets/textt.png"/>
        <div className="buttonsContainer">
        <Link to="/register"><button>Sign Up</button></Link>
        <Link to="/login"><button>Log In</button></Link>
        </div>
        </div>
      </div>
        <HomeAuth  />
      
      <Outlet />
    </>
      )
    }

export default Home