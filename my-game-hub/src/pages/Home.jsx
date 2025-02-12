import "../styles/styles.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Game Hub 🎮</h1>
      <p>Play and explore different mini-games online.</p>
      <a href="/games" className="home-button">Browse Games</a>
    </div>
  );
}

export default Home;