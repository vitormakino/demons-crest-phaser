import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.js';
import Player from "../sprites/player";

export class SimpleScene extends Phaser.Scene {

  preload() {
    this.load.tilemapTiledJSON("map", "assets/demons_crest_map.json");
    this.load.image("background", "assets/fundo.png");
    this.load.atlas('demons_crest', 'assets/demons_crest_sprites.png', 'assets/demons_crest_sprites.json');
    
    this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
  }

  create() {
    const map = this.make.tilemap({ key: 'map'});
  
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    this.tileset = map.addTilesetImage("fundo", "background");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const groundLayer = map.createDynamicLayer("chao", this.tileset, 0, 0);
    const paredeLayer = map.createDynamicLayer("parede", this.tileset, 0, 0);
    const fundoLayer = map.createDynamicLayer("fundo", this.tileset, 0, 0);    
    const fundoSpriteLayer = map.createDynamicLayer("Sprites", this.tileset, 0, 0);  
    
    this.camadas = {
      groundLayer, paredeLayer, fundoLayer, fundoSpriteLayer
    };
     //To initilize the plugin you just need to pass the tilemap you want to animate to the plugin.
    //The plugin requires a dynamic layers to work.
    this.sys.animatedTiles.init(map);

    groundLayer.setCollisionByProperty({ collides: true });
    paredeLayer.setCollisionByProperty({ collides: true });

    // Turn on physics debugging to show player's hitbox
    window.enableDebugsPlayerHitbox = () => this.physics.world.createDebugGraphic();
    window.enableDebugsCollides = () => {
      const debugGraphics = this.add.graphics().setAlpha(0.75);
      groundLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    
      paredeLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    };

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    // This will watch the player and worldLayer every frame to check for collisions
    this.physics.add.collider(this.player.sprite, groundLayer);
    this.physics.add.collider(this.player.sprite, paredeLayer);

     //cria cursor
    this.cursors = this.input.keyboard.createCursorKeys();
    
    const cam = this.cameras.main;
    cam.startFollow(this.player.sprite, true);
    cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    cam.setDeadzone(60, 20);

    window.enableDebugsCamDeadZone = () => {
      if (cam.deadzone) {
          var graphics = this.add.graphics().setScrollFactor(0);
          graphics.lineStyle(2, 0x00ff00, 1);
          graphics.strokeRect(spawnPoint.x - cam.deadzone.width, spawnPoint.y - cam.deadzone.height, cam.deadzone.width, cam.deadzone.height);
      }
    };


    //
    this.inicializarCena();
  }

  /**
   * Inicializa a Cena
   */
  inicializarCena() {
    const  {
      groundLayer, paredeLayer, fundoLayer, fundoSpriteLayer
    } = this.camadas;

    //Remove a visibilidade das camadas
    //para que sejam mostradas por interpolação
    //através dos teweens
    groundLayer.setAlpha(0);
    paredeLayer.setAlpha(0);
    fundoLayer.setAlpha(0);
    fundoSpriteLayer.setAlpha(0);
    this.player.sprite.setAlpha(0);

    this.tweens.add({
      targets: [this.player.sprite, fundoSpriteLayer],
      alpha: 1,
      duration: 1000,
      ease: 'Linear',
      delay: 1000
    });
    this.tweens.add({
      targets: [groundLayer,fundoLayer, paredeLayer],
      alpha: 1,
      duration: 3000,
      ease: 'Quint.easeIn',
      delay: 2000
    });

    this.player.sprite.setFlipX(true);
  }
  
  update(time, delta) {
    this.player.update(time,delta);
  }
}
