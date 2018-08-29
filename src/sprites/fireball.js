import Phaser from "phaser";

import {
    FIRE_VELOCITY
  } from '../utils/constants';

export default class Fireball extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene);
        console.log(scene);

        this.scene.physics.world.enable(this);

        this.body.setSize(8, 8);
        this.body.offset.set(12, 12);

        this.on('animationcomplete', () => {
          this.setActive(false);
          this.setVisible(false);
        }, this);
    }

    fire(x, y, flipX) {
        this.setActive(true);
        this.setVisible(true);
         
        this.flipX = flipX;
        this.setPosition(x, y);
        this.body.setAllowGravity(false);
        this.body.setVelocityX( FIRE_VELOCITY * (flipX ? -1 : 1));
        this.play("fire");

        console.log(this.scene.physics.world.collide);
    }

    update() {
        if(!this.active){
            return;
        }
    }
};