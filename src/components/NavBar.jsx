import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import LoginPage from './LoginPage';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Home = () => {
  const { handleLogout, isLoggingOut, error } = useLogout();

  return (
    <>
<nav>
  <div className="navContainer">
    {/* Main Menu */}
    <ul className="main-menu">
        <img className="logo" src="../assets/logo.png"/>
      <li>
        <Link to="/">Home</Link>
      </li>
     {/* Games Dropdown */}
      <li className="dropdown">
        <span>Games</span>
        <div className="dropdown-content">
          <li>
            <Link to="/snake">Snake</Link>
          </li>
          <li>
            <Link to="/tetris">Tetris</Link>
          </li>
         
        </div>
        
      </li>

      <li>
        <Link to="/">Leaderboard</Link>
      </li>
      <li>
        <Link to="/">Forum</Link>
      </li>
      
      
    </ul>
    {/* Authentication Menu */}
    <ul className="authMenu">
    <li>
        <Link to="/signup">Register</Link>
      </li>
      <li>
        <Link to="/auth">Login</Link>
      </li>
      <li>
        <Link to="/auth">Profile</Link>
      </li>
      <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </li>
    </ul>
  </div>
</nav>

      {error && <div className="error">{error.message}</div>}
    </>
  );
};

export default Home;
