export const makeAnimations = (scene) => {
    playerAnimations(scene);
    fireballAnimations(scene);
};

const playerAnimations = (scene) => {
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
    anims.create({
      key: "jump",
      frames: anims.generateFrameNames("demons_crest", { prefix: "jump", start: 1, end: 4 }),
      frameRate: 4,
      repeat: -1
    });
    anims.create({
      key: "attack",
      frames: anims.generateFrameNames("demons_crest", { prefix: "attack", start: 1, end: 2 }),
      frameRate: 6,
      repeat: 0
    });
    anims.create({
      key: "fly-attack",
      frames: anims.generateFrameNames("demons_crest", { prefix: "fly-attack", start: 1, end: 3 }),
      frameRate: 12,
      repeat: 0
    });
    anims.create({
      key: "fly",
      frames: anims.generateFrameNames("demons_crest", { prefix: "fly", start: 1, end: 7 }),
      frameRate: 12,
      repeat: -1
    });
    anims.create({
      key: "hover",
      frames: anims.generateFrameNames("demons_crest", { prefix: "hover", start: 1, end: 4 }),
      frameRate: 6,
      repeat: -1
    });
    anims.create({
      key: "death",
      frames: anims.generateFrameNames("demons_crest", { prefix: "death", start: 1, end: 7 }),
      frameRate: 4,
      repeat: 0
    });
}

const fireballAnimations = (scene) => {
    const anims = scene.anims;
    anims.create({
      key: "fire",
      frames: anims.generateFrameNames("demons_crest", { prefix: "fire", start: 1, end: 4 }),
      frameRate: 3,
      repeat: -1
    });
    anims.create({
      key: "faisca",
      frames: anims.generateFrameNames("demons_crest", { prefix: "faisca", start: 1, end: 3 }),
      frameRate: 12,
      repeat: 0
    });
    anims.create({
      key: "explode",
      frames: anims.generateFrameNames("demons_crest", { prefix: "explode", start: 1, end: 4 }),
      frameRate: 12,
      repeat: 0
    });
};
