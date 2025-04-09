import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import MyGameScene from "./MyGameScene";

const VirtualOffice = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        backgroundColor: "#1d1d1d",
        physics: {
          default: "arcade",
          arcade: { debug: false },
        },
        audio: {
          noAudio: true,
        },
        scene: [MyGameScene],
        parent: "game-container",
      };

      gameRef.current = new Phaser.Game(config);
    }

    const handleResize = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
        gameRef.current.scene.scenes[0].resizeGame({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="game-container" style={{ width: "100%", height: "100vh" }} />;
};

export default VirtualOffice;
