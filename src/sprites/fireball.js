import Phaser from "phaser";

import {
    FIRE_VELOCITY
  } from '../utils/constants';

export default class Fireball extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene);

        this.scene.physics.world.enable(this);
        //Assim funcionou
        this.scene.physics.add.collider(this, this.scene.camadas.paredeLayer, () => this.collided());

        this.body.setSize(8, 8);
        this.body.offset.set(12, 12);

        this.on('animationcomplete', (animation, frame) => {
            console.log(animation);

          if (this.anims.currentAnim.key === 'explode') {
            this.setActive(false);
            this.setVisible(false);
        }
        }, this);
    }

    fire(x, y, flipX) {
        this.setActive(true);
        this.setVisible(true);
         
        this.flipX = flipX;
        this.setPosition(x, y);
        this.body.setAllowGravity(false);
        this.body.setVelocityX( FIRE_VELOCITY * (flipX ? -1 : 1));
        this.anims.play("fire");
    }

    update() {
        if(!this.active){
            return;
        }
        //Isso não funcionou. pq?
        //this.scene.physics.world.collide(this, this.scene.camadas.paredeLayer, () => console.log("COLLIEDE"));
    }

    collided(){
      console.log("COLLIEDE");
      if(this.body.velocity.x === 0){
        this.explode();
      }
  }

  explode(){
    this.anims.play("explode", true);
  }
};