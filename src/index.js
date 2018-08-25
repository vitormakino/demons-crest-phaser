import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
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
  scene: SimpleScene
};

new Phaser.Game(gameConfig);
