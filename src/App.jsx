import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Snake from './components/games/snake/Snake'
import Tetris from "./components/games/tetris/Tetris";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar"
import Signup from "./components/Signup";
import AuthPage from "./components/AuthPage";
import Login from "./components/Login";
import useAuthStore from "./store/authStore";



function App() {
  const authUser = useAuthStore(state => state.user);

  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/auth"/> } />
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/"/>} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/"/>} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/"/>} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/tetris" element={<Tetris />} />
        </Routes>
      </BrowserRouter>
      
        
    </>
  )
}

export default App