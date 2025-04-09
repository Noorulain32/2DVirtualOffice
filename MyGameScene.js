import Phaser from "phaser";

class MyGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "MyGameScene" });
  }

  preload() {
    this.load.image("background", "assets/officebg.jpg");
    this.load.image("avatar", "assets/avatar.png");
  }

  create() {
    if (
      !this.textures.exists("background") ||
      !this.textures.exists("avatar")
    ) {
      console.error("Error: Assets failed to load.");
      return;
    }

    // Background Image
    this.bg = this.add.image(0, 0, "background").setOrigin(0, 0);
    this.bg.setScale(
      Math.max(
        this.scale.width / this.bg.width,
        this.scale.height / this.bg.height
      )
    );

    // Enable physics world bounds
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);

    // Avatar
    this.avatar = this.physics.add
      .sprite(this.scale.width / 2, this.scale.height / 2, "avatar")
      .setCollideWorldBounds(true);

    this.avatar.setScale(0.15);

    // Keyboard Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Ensure Input is Registered Properly
    this.input.keyboard.on("keydown", (event) => {
      console.log(`Key pressed: ${event.code}`); // Debugging
    });

    // Ensure Scene is Not Destroyed on Refresh
    this.events.on("shutdown", () => {
      this.input.keyboard.removeAllListeners();
    });

    // Resize Handling
    this.scale.on("resize", this.resizeGame, this);
  }

  update() {
    if (!this.cursors) return;

    let speed = 200;

    // Reset velocity before setting a new one
    this.avatar.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.avatar.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.avatar.setVelocityY(speed);
    }
  }

  resizeGame(gameSize) {
    this.bg.setScale(
      Math.max(gameSize.width / this.bg.width, gameSize.height / this.bg.height)
    );
    this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height);

    // Reposition Avatar
    if (this.avatar) {
      this.avatar.x = gameSize.width / 2;
      this.avatar.y = gameSize.height / 2;
    }
  }
}

export default MyGameScene;
