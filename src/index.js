import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import { BootScene } from './scenes/boot-scene';

const gameConfig = {
  parent: "game-container",
  width: 320,
  height: 200,
  zoom: 3,
  pixelArt: true, // Force the game to scale images up crisply
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 }
    }
  },
  scene: [BootScene, SimpleScene]
};

new Phaser.Game(gameConfig);
