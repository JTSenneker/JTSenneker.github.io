class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
    this.count = 0;
    this.scene2 = null;
  }
  preload() {
    this.load.image("background", "src/WoFIE/src/assets/images/Board.png");
    this.load.image("playButton", "src/WoFIE/src/assets/images/Play Button.png");
    this.load.image("spinButton", "src/WoFIE/src/assets/images/SpinButton.png");
    this.load.image("vowelButton", "src/WoFIE/src/assets/images/VowelButton.png");
    this.load.image("solveButton", "src/WoFIE/src/assets/images/SolveButton.png");
    this.load.image("scoreUI", "src/WoFIE/src/assets/images/ScoreUI.png");
    this.load.spritesheet("wordTile", 'src/WoFIE/src/assets/images/wordTile.png', { frameWidth: 32, frameHeight: 64 });

  }
  create() {
    //this.scoreContainer.x = 400;
    this.add.text(20, 20, "Loading game...");
    //this.cameras.main.setViewport(0,0,800,600);

    this.scene2 = this.createWindow(Scene2, 800, 0);
    this.scene3 = this.createWindow(Scene3, 0, 0);

    this.spinButton = this.scene3.add.image(600, 450, 'spinButton');
    this.vowelButton = this.scene3.add.image(670, 480, 'vowelButton');
    this.solveButton = this.scene3.add.image(740, 450, 'solveButton');

    this.vowelButton.setInteractive();
    this.solveButton.setInteractive();
    this.spinButton.setInteractive();

    this.scoreContainer = this.add.container(0, 0);
    this.scoreUI = this.add.image(0, 0, 'scoreUI').setOrigin(0);
    this.score = this.add.text(34, 48, "$100", { fontSize: '12px', fill: '#FFF' });
    this.scoreContainer.add([this.scoreUI, this.score]);
    this.scoreContainer.x = 550;
    this.scoreContainer.y = 0;


    var scene = this;

    this.spinButton.on('pointerup', function () {
      if (!gameOptions.atWheel && !gameOptions.canSelect) {
        gameOptions.buyingVowel = false;
        gameOptions.canSelect = false;
        scene.switchToWheel();
      }
    });

    this.vowelButton.on('pointerup', function () {
      if (!gameOptions.atWheel) {
        gameOptions.buyingVowel = true;
      }
    });

    this.input.on('pointerdown', function () {
      if (gameOptions.atWheel && !gameOptions.isSpinning) {
        this.scene.switchToBoard();
      }
    });

    gameOptions.camTarget = { x: 0, y: 0 };
  }
  createWindow(func, x, y) {
    var handle = 'window' + this.count++;
    var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setOrigin(0.5);
    var demo = new func(handle, win);
    this.scene.add(handle, demo, true);
    return demo;
  }
  update() {
    //this.cameras.main.centerOn(gameOptions.camTarget.x,gameOptions.camTarget.y);
    this.scene2.refresh();
    this.scene3.refresh();
    this.score.text = "$" + gameOptions.score;
  }

  switchToWheel() {
    this.tweens.add({
      targets: [this.scene3.parent],
      x: -800,
      druation: 5,
      ease: "Cubic.easeOut",
      callbackScope: this,
      onComplete: function (tween) {
        this.tweens.add({
          targets: [this.scene2.parent],
          x: 0,
          druation: 5,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function (tween) {
            gameOptions.canSpin = true;
            gameOptions.atWheel = true;
          }
        });
      }
    });

  }
  switchToBoard() {

    this.tweens.add({
      targets: [this.scene2.parent],
      x: 800,
      druation: 5,
      ease: "Cubic.easeOut",
      callbackScope: this,
      onComplete: function (tween) {
        this.tweens.add({
          targets: [this.scene3.parent],
          x: 0,
          druation: 5,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function (tween) {
            gameOptions.canSelect = true;
            gameOptions.atWheel = false;
          }
        });
      }
    });

  }
}