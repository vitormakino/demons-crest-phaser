export const configControlDisableMusic = (music) => {
    window.disableMusic = (enable) => enable ? music.play() : music.stop();
};

export const configControlEnableDebugsPlayerHitbox = (scene) => {
    var createdDebugGraphic = false;
    // Turn on physics debugging to show player's hitbox
    window.enableDebugsPlayerHitbox = (enable) => {
        if(createdDebugGraphic) return;

        createdDebugGraphic = true;
        scene.physics.world.createDebugGraphic();
    }
};

export const configControlEnableDebugsCollides = (scene, layers) => {
    var createdDebugGraphic = false;
    window.enableDebugsCollides = (enable) => {
        if(createdDebugGraphic) return;
        
        createdDebugGraphic = true;
        const debugGraphics = scene.add.graphics().setAlpha(0.75);
        layers.forEach(layer => {
            layer.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
              });    
        });
    }   
};

export const configControlEnableDebugsCamDeadZone = (scene, cam, x, y) => {
    var createdDebugGraphic = false;
    window.enableDebugsCamDeadZone = (enable) => {
        if(createdDebugGraphic) return;
        
        createdDebugGraphic = true;
        if (cam.deadzone) {
            var graphics = scene.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(x - cam.deadzone.width, y - cam.deadzone.height, cam.deadzone.width, cam.deadzone.height);
        }
      };
};