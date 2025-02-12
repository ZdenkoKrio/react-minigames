import { useEffect } from "react";

const usePlayerControls = (playerX, setPlayerX) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && playerX > 0) {
        setPlayerX((prev) => prev - 20);
      } else if (event.key === "ArrowRight" && playerX < 360) {
        setPlayerX((prev) => prev + 20);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerX, setPlayerX]);
};

export default usePlayerControls;