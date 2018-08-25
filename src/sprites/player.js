import Phaser from "phaser";

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const anims = scene.anims;
    anims.create({
      key: "idle",
      frames: anims.generateFrameNames("demons_crest", { prefix: "idle", start: 1, end: 4 }),
      frameRate: 4,
      repeat: -1
    });
    anims.create({
      key: "walk",
      frames: anims.generateFrameNames("demons_crest", { prefix: "walk", start: 1, end: 6 }),
      frameRate: 4,
      repeat: -1
    });

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, 'demons_crest')
      .setDrag(1000, 0)
      .setMaxVelocity(100, 300)
      .setSize(27, 45);
   
    // Track the arrow keys & WASD
    const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      w: W,
      a: A,
      d: D
    });
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const { keys, sprite } = this;
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? 400 : 200;

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown || keys.a.isDown) {
      sprite.setAccelerationX(-acceleration);
      // No need to have a separate set of graphics for running to the left & to the right. Instead
      // we can just mirror the sprite.
      sprite.setFlipX(true);
    } else if (keys.right.isDown || keys.d.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    // Only allow the player to jump if they are on the ground
    if (onGround && (keys.up.isDown || keys.w.isDown)) {
      sprite.setVelocityY(-500);
    }

    // Update the animation/texture based on the state of the player
    if (onGround) {
      if (sprite.body.velocity.x !== 0) {
        sprite.anims.play("walk", true);
      } else { 
        sprite.anims.play("idle", true);
      }
    } else {
      sprite.anims.stop();
      //sprite.setTexture("idle", 10);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}