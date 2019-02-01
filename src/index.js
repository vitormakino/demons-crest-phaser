import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import { BootScene } from './scenes/boot-scene';

const gameConfig = {
  parent: "game-container",
  width: 320,
  height: 200,
  pixelArt: true, // Force the game to scale images up crisply
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 }
    }
  },
  scene: [BootScene, SimpleScene],
  callbacks: {
    postBoot: function (game) {
      // In v3.15, you have to override Phaser's default styles
      game.canvas.style.width = '100%';
      game.canvas.style.height = '100%';
    }
  }
};

new Phaser.Game(gameConfig);
