import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Snake from './components/games/snake/Snake';
import Tetris from './components/games/tetris/Tetris';
import Forum from './components/Forum';
import Profile from './components/Profile';
import useAuthStore from './store/authStore';
import Leaderboard from './components/Leaderboard';
import FlappyBird from './components/games/flappybird/FlappyBird'

const App = () => {
  const authUser = useAuthStore(state => state.user); // Get the authUser from the store

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/auth"/> } />
        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/"/> } />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/"/>  } />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/"/> } />
        <Route path="/snake" element={<Snake />} />
        <Route path="/flappybird" element={<FlappyBird />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/tetris" element={<Tetris />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
