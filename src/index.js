import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  width: 680,
  height: 400,
  zoom: 2,
  pixelArt: true, // Force the game to scale images up crisply
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: SimpleScene
};

new Phaser.Game(gameConfig);
