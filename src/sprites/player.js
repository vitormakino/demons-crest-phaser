import Phaser from "phaser";

import {
  FIRE_COOLDOWN_DEFAULT,
  FLYING_TIMER_DEFAULT,
  PLAYER_ACCELERATION_AIR,
  PLAYER_ACCELERATION_GROUND
} from '../utils/constants';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene; 

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, 'demons_crest')
      .setDrag(1000, 0)
      .setMaxVelocity(100, 300)
      .setSize(27, 45);
   
    // Track the arrow keys & WASD
    const { LEFT, RIGHT, UP, W, A, D, Z, X } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      w: W,
      a: A,
      d: D,
      fire: Z,
      x: X
    });

    this.attacking = false;
    this.flying = false;
    this.dead = false;
    this.fireCoolDown = 0;
    this.flyingTimer = 0;
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update(time, delta) {
    if(this.dead) return;

    const { keys, sprite } = this;
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? PLAYER_ACCELERATION_GROUND : PLAYER_ACCELERATION_AIR;

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

   this.fireCoolDown -= delta;
   if(keys.fire.isDown && this.fireCoolDown < 0) {
    this.fireCoolDown  = FIRE_COOLDOWN_DEFAULT;
    this.attacking = true;

    let fireball = this.scene.fireballs.get(this);
    if (fireball) {
        fireball.fire(sprite.x, sprite.y, sprite.flipX);
        this.fireCoolDown = FIRE_COOLDOWN_DEFAULT;
    }
   } else {
    this.attacking = false;
   }

   this.flyingTimer -= delta;

    if ((keys.up.isDown || keys.w.isDown) && this.flyingTimer < 0 ) {
      console.log(sprite.body.velocity.y);
      this.flyingTimer  = FLYING_TIMER_DEFAULT;

      if(onGround) {
        // Only allow the player to jump if they are on the ground
        sprite.setVelocityY(-500);
      } else {
        this.flying = !this.flying;
        if(this.flying) {
          sprite.body.stop();
          sprite.body.setAllowGravity(false);
        } else {
          sprite.body.setAllowGravity(true);
        }
      }
    }

    // Update the animation/texture based on the state of the player
    if (onGround) {
      if (sprite.body.velocity.x !== 0) {
        sprite.anims.play("walk", true);
      } else { 
        sprite.anims.play("idle", true);
      }
     
      //Attack!
      if (this.attacking) {
        sprite.anims.play("attack", true);
      }
    } else {
      if (sprite.body.velocity.y !== 0) {
        sprite.anims.play("jump", true);
      } else if(this.flying) {
        if (sprite.body.velocity.x !== 0) {
          sprite.anims.play("fly", true);
        } else { 
          sprite.anims.play("hover", true);
        }

        //Flying Attack!
        if (this.attacking) {
          sprite.anims.play("attack", false);
        }
      }
    }  

    if (keys.x.isDown) {
      this.dead = true;
      sprite.anims.play("death", true);
      sprite.setVelocity(0);
      sprite.setSize(40, 13);
      sprite.setOffset(-40, -13);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}