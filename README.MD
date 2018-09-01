# Demon's Crest Phaser
#### Phaser 3 + ES6 + Webpack

This repository is a sandbox inspired in one of my favorite childhood games Demon's Crest for testing out Phaser 3. It's based on the Bootstrap project https://github.com/nkholski/phaser3-es6-webpack.

**Disclaimer**: This project is intended for non-commercial educational purposes. It's not an attempt to recreate any copyrighted game, and it will not become a playable game. 

# References:

**Sources**
- https://www.mikewesthad.com/blog.html
- https://github.com/nkholski/phaser3-es6-webpack

**Audio**
- https://downloads.khinsider.com/game-soundtracks/album/demon-s-crest-snes

**Tilemaps**
- Tiled (https://www.mapeditor.org/)
- Animated tiles (Plugin: https://github.com/nkholski/phaser-animated-tiles)

**Sprites**
- https://www.spriters-resource.com/snes/demonscrest/
- https://www.leshylabs.com/apps/sstool/

# Setup
You’ll need to install a few things before you have a working copy of the project.

## 1. Clone this repo:

Navigate into your workspace directory.

Run:

```git clone https://github.com/vitormakino/demons-crest-phaser.git```

## 2. Install node.js and npm:

https://nodejs.org/en/


## 3. Install dependencies (optionally you could install [yarn](https://yarnpkg.com/)):

Navigate to the cloned repo’s directory.

Run:

```npm install```

or if you choose yarn, just run ```yarn```

## 4. Run the development server:

Run:

```npm run start``` or ```yarn start```

This will run a server so you can run the game in a browser.

Open your browser and enter localhost:8080 into the address bar.

Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser.


## Build for deployment:

Run:

```npm run deploy``` or ```yarn deploy```

This will optimize and minimize the compiled bundle.