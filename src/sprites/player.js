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
      .setSize(27, 40)
      .setOffset(24, -27)
      .setOrigin(0.5,1)
     ;

     // An emitter for fireball.
     this.fireEmitter = scene.add.particles('demons_crest');

     this.fireEmitter.createEmitter({
       frame: {
          frames: ['faisca1','faisca2','faisca3'],
          cycle: true
        },
        gravity: 0,
        angle: 0,
        lifespan: 100,
        speedX: 60,
        
        frequency: -1,

        emitCallback: (t) => {
          t.velocityX *= (this.sprite.flipX ? -1 : 1);
        }
     });



    // Track the arrow keys & WASD
    const { LEFT, RIGHT, UP, W, A, D, Z, X} = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      w: W,
      a: A,
      d: D,
      fire: Z
    });

    this.attacking = false;
    this.flying = false;
    this.dead = false;
    this.fireCoolDown = 0;
    this.flyingTimer = 0;

    this.sprite.on('animationcomplete', this.animationcomplete, this);
  }

  animationcomplete(animation, frame) {
    if(animation.key === 'attack' || animation.key === 'fly-attack') {
      this.attacking = false;
    }
  }

  mouthPosition() {
    const { sprite } = this;

    if(this.flying) {
      var mouthY = sprite.y - 23;
      var mouthX = sprite.x + 20 * (sprite.flipX ? -1 : 1);
    } else {
      var mouthY = sprite.y - 28;
      var mouthX = sprite.x + 18 * (sprite.flipX ? -1 : 1);
    }

    return { x: mouthX, y: mouthY };
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update(time, delta) {
    if(this.dead) return;

    const { keys, sprite } = this;
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? PLAYER_ACCELERATION_GROUND : PLAYER_ACCELERATION_AIR;

   this.fireCoolDown -= delta;
   if(keys.fire.isDown && this.fireCoolDown < 0) {
    let fireball = this.scene.fireballs.get(this);
    if (fireball) {
      var pos = this.mouthPosition();
      
      this.fireEmitter.emitParticle(1, pos.x, pos.y);

      fireball.fire(pos.x, pos.y, sprite.flipX);
      this.fireCoolDown = FIRE_COOLDOWN_DEFAULT;
      this.attacking = true;
    }
   }

   if(this.attacking) {
    sprite.setAccelerationX(0);
   } else {
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
      //Attack!
      if (this.attacking) {
        sprite.anims.play("attack", true);
      } else if (sprite.body.velocity.x !== 0) {
        sprite.anims.play("walk", true);
      } else { 
        sprite.anims.play("idle", true);
      }
    } else {
      if (sprite.body.velocity.y !== 0) {
        if (this.attacking) {
          sprite.anims.play("fly-attack", true);
        } else {
          sprite.anims.play("jump", true);
        }        
      } else if(this.flying) {
        //Flying Attack!
        if (this.attacking) {
          sprite.anims.play("fly-attack", true);
        } else if (sprite.body.velocity.x !== 0) {
          sprite.anims.play("fly", true);
        } else { 
          sprite.anims.play("hover", true);
        }
      }
    }  
  }

  die() {
    this.dead = true;
    this.sprite.anims.play("death", true);
    this.sprite.body.stop();
    this.sprite.body.setAllowGravity(true);
    this.sprite.setSize(40, 13);
    this.sprite.setOffset(20, -3);
  }

  destroy() {
    this.sprite.destroy();
  }
}