import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Snake from './components/games/snake/Snake'
import Tetris from "./components/games/tetris/Tetris";



function App() {

  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/tetris" element={<Tetris />} />
        </Routes>
      </BrowserRouter>
      
        
    </>
  )
}

export default App