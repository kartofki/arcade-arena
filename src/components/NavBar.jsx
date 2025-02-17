import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuthStore from '../store/authStore';
import { Flex } from '@chakra-ui/react';


const Home = () => {
  const { handleLogout, isLoggingOut, error } = useLogout();
  const authUser = useAuthStore(state => state.user);


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

     {authUser && <li className="dropdown">
        <span>Games</span>
        <div className="dropdown-content">
          <li>
            <Link to="/snake">Snake</Link>
          </li>
          <li>
            <Link to="/tetris">Tetris</Link>
          </li>
          <li>
            <Link to="/flappybird">Flappy Bird</Link>
          </li>
         
        </div>
        
      </li>
}
  
      <li>
        <Link to="/leaderboard">Leaderboard</Link>
      </li>   
    </ul>
    {/* Authentication Menu */}
    <ul className="authMenu">
    {!authUser && <li>
        <Link to="/signup">Register</Link>
      </li> }
    
      {!authUser && <li>
        <Link to="/login">Login</Link>
      </li>}

      {authUser &&  <Flex align="center">
        <Link to={`/${authUser.username}`}>
      <img className="profile-pic-nav" src={authUser.profilePicURL} /></Link>
      <span >Hello, {authUser.username}!</span>
    </Flex> }

      {authUser && <li>
        <Link to={`/${authUser.username}`}>Profile</Link>
      </li>}

     {authUser && <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </li>}
    </ul>
  </div>
</nav>

      {error && <div className="error">{error.message}</div>}
    </>
  );
};

export default Home;
