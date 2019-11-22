class Scene2 extends Phaser.Scene {
  constructor(handle, parent) {
    super(handle);
    this.WIDTH = 700;
    this.HEIGHT = 600;
    this.parent = parent;
    this.handle = handle;
  }
  create() {
    this.cameras.main.setViewport(this.parent.x, this.parent.y, this.WIDTH, this.HEIGHT);
    var startDegrees = -90;

    var graphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    });

    //container to group wheel and text
    this.wheelContainer = this.add.container(config.width / 2, config.height / 2);

    for (var i = 0; i < gameOptions.slices.length; i++) {
      var startColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].startColor);
      var endColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].endColor);
      for (var j = gameOptions.slices[i].rings; j >= 0; j--) {
        //setup the ring colors
        var ringColor = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, gameOptions.slices[i].rings, j);
        //convert that color to a string for the fillstyle
        var ringColorString = Phaser.Display.Color.RGBToString(Math.round(ringColor.r), Math.round(ringColor.g), Math.round(ringColor.b), 0, "0x");
        graphics.fillStyle(ringColorString, 1);

        //draw that shit
        graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, j * gameOptions.wheelRadius / gameOptions.slices[i].rings, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false);

        //fill that shit
        graphics.fillPath();
      }
      //get that lineStyle
      graphics.lineStyle(gameOptions.strokeWidth, gameOptions.strokeColor, 1);

      // drawing the biggest slice
      graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false);

      // stroking the slice
      graphics.strokePath();
      var prizeText = this.add.text(0, 0, gameOptions.slices[i].text);
      prizeText.setOrigin(.5);
      prizeText.setAlign('center');
      prizeText.rotation = Phaser.Math.DegToRad(startDegrees);
      prizeText.x = Math.cos(Phaser.Math.DegToRad(startDegrees + (gameOptions.slices[i].degrees / 2))) * 200;
      prizeText.y = Math.sin(Phaser.Math.DegToRad(startDegrees + (gameOptions.slices[i].degrees / 2))) * 200;
      this.wheelContainer.add(prizeText);
      startDegrees += gameOptions.slices[i].degrees;

    }
    graphics.generateTexture("wheel", (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2, (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2);

    var wheel = this.add.sprite(0, 0, "wheel");
    this.wheelContainer.add(wheel);
    this.wheelContainer.sendToBack(wheel);
    this.canSpin = true;
    this.input.on('pointerdown', this.spinWheel, this);
    console.log("0.0.3");
  }

  spinWheel() {
    if (this.canSpin && gameOptions.canSpin) {

      var rounds = Phaser.Math.Between(gameOptions.wheelRounds.min, gameOptions.wheelRounds.max);
      var degrees = Phaser.Math.Between(0, 360);
      var backDegrees = Phaser.Math.Between(gameOptions.backSpin.min, gameOptions.backSpin.max);
      var prizeDegree = 0;

      for (var i = gameOptions.slices.length - 1; i >= 0; i--) {
        prizeDegree += gameOptions.slices[i].degrees;
        if (prizeDegree >= degrees - backDegrees) {
          gameOptions.scoreMultiplier = gameOptions.slices[i].score;
          break;
        }
      }

      this.canSpin = false;
      gameOptions.canSpin = false;
      gameOptions.isSpinning = true;
      //tween that animation for the spin
      this.tweens.add({
        //add the wheel container
        targets: [this.wheelContainer],

        //angle destination
        angle: 360 * rounds + degrees,

        //tween duration
        duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max),

        //ease that tween
        ease: "Cubic.easeOut",

        //callback scope
        callbackScope: this,

        //execute this when tween is done
        onComplete: function (tween) {

          //this tween goes backwards
          this.tweens.add({
            targets: [this.wheelContainer],
            angle: this.wheelContainer.angle - backDegrees,
            duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max),
            ease: "Cubic.easeIn",
            callbackScope: this,
            onComplete: function (tween) {
              this.canSpin = true;
              gameOptions.isSpinning = false;

            }
          })
        }
      });
    }
  }
  refresh() {
    this.cameras.main.setPosition(this.parent.x, this.parent.y);
    this.scene.bringToTop();
  }
  setTextOrientationVertical(text) {
    for (var i = 0; i < text.length; i++) {
      console.log(text[i]);
      text = text.substr(0, i) + "\n" + text.substr(i);
    }
    return text;
  }

}