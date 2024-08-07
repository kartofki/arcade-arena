import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar'


const Home = () => {
    return (
        <>
      <NavBar />
      <div className='frontPage'>
        <div className="bgText">
        <img className="frontText" src="/assets/textt.png"/>
        <div className="buttonsContainer">
        <Link to="/signup"><button>Sign Up</button></Link>
        <Link to="/login"><button>Log In</button></Link>
        </div>
        </div>
      </div>
      
      <Outlet />
    </>
      )
    }

export default Home