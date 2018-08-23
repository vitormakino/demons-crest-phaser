export class SimpleScene extends Phaser.Scene {

  preload() {
    this.load.atlas('demons_crest', 'assets/demons_crest_spritesheet.png', 'assets/demons_crest_sprites.json');
  }

  create() {
    this.add.text(100, 100, 'It\'s Demons Crest!', { fill: '#0f0' });

    this.player = this.physics.add.sprite(100, 300, 'demons_crest');

    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const anims = this.anims;
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

    //cria cursor
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.player.anims.play("idle", true);
  }

  update(time, delta) {
    const speed = 90;
    const prevVelocity = this.player.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.anims.play("walk", true);
      this.player.flipX = true;
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("walk", true);
      this.player.flipX = false;
      this.player.body.setVelocityX(speed);
    } else {
      this.player.anims.play("idle", true);
    }
  }
}
