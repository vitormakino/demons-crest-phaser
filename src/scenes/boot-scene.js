import { makeAnimations } from '../helpers/animations';

export class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        this.load.tilemapTiledJSON("map", "assets/demons_crest_map.json");
        this.load.image("background", "assets/fundo.png");
        this.load.atlas('demons_crest', 'assets/demons_crest_sprites.png', 'assets/demons_crest_sprites.json');

        this.load.audio('Prelude_to_Horror', [
            'assets/music/Prelude_to_Horror.ogg',
        ]);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        var widthProgressBox = 200;
        var heightProgressBox = 30;
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - widthProgressBox / 2, height / 2 - 20, widthProgressBox, heightProgressBox);

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '10px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '9px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '9px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);


        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', () => {
            //console.log('complete');
            
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy(); 
            assetText.destroy(); 
            
            // prepare all animations, defined in a separate file
            makeAnimations(this);

            this.scene.start('SimpleScene');
        });
    }

    create() {
    }
}  