import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Snake from './components/games/snake/Snake'
import Tetris from "./components/games/tetris/Tetris";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar"
import Signup from "./components/Signup";
import AuthPage from "./components/AuthPage";



function App() {

  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/tetris" element={<Tetris />} />
        </Routes>
      </BrowserRouter>
      
        
    </>
  )
}

export default App