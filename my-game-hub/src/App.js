import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameList from "./pages/GameList";
import About from "./pages/About";
import SnakeGame from "./games/snake/Snake";
import FlappyBird from "./games/flappyBird/FlappyBird";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/snake" element={<SnakeGame />} />
        <Route path="/games/flappybird" element={<FlappyBird />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;