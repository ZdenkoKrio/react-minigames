import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameList from "./pages/GameList";
import About from "./pages/About";
import SnakeGame from "./games/snake/Snake";
import FlappyBird from "./games/flappyBird/FlappyBird";
import Navbar from "./components/Navbar";
import Tetris from "./games/tetris/Tetris";
import SpaceShooter from "./games/spaceShooter/SpaceShooter";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/snake" element={<SnakeGame />} />
        <Route path="/games/flappyBird" element={<FlappyBird />} />
        <Route path="/games/tetris" element={<Tetris />} />
        <Route path="/games/spaceShooter" element={<SpaceShooter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;