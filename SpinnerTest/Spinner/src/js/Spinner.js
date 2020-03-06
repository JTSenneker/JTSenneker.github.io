class Spinner extends Phaser.Scene {
    constructor() {
        super("spinner");
    }
    preload() {
        this.load.image('bg', 'src/img/bg.png');
        this.load.image('marker', 'src/img/icons/Marker.png');
    }
    create() {
        var startDegrees = 0;
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        var graphics = this.make.graphics({
            x: 0,
            y: 0,
            add: false
        });
        this.wheelContainer = this.add.container(config.width / 4.75, config.height / 1.6);

        for (let i = 0; i < wheelOptions.slices.length; i++) {
            let color = Phaser.Display.Color.ValueToColor(wheelOptions.slices[i].color);
            let colorString = Phaser.Display.Color.RGBToString(Math.round(color.r), Math.round(color.g), Math.round(color.b), 0, "0x");
            graphics.fillStyle(colorString, 1);
            graphics.slice(wheelOptions.wheelRadius + wheelOptions.strokeWidth, wheelOptions.wheelRadius + wheelOptions.strokeWidth, wheelOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + wheelOptions.slices[i].degrees), false);
            graphics.fillPath();
            graphics.lineStyle(wheelOptions.strokeWidth, wheelOptions.strokeColor, 1);
            graphics.slice(wheelOptions.wheelRadius + wheelOptions.strokeWidth, wheelOptions.wheelRadius + wheelOptions.strokeWidth, wheelOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + wheelOptions.slices[i].degrees), false);
            graphics.strokePath();
            /*let wedgeText = this.add.text(0, 0, wheelOptions.slices[i].text, { fontFamily: '"Arial"' });
            wedgeText.setOrigin(.5);
            wedgeText.setAlign('center');
            wedgeText.rotation = Phaser.Math.DegToRad(startDegrees + (wheelOptions.slices[i].degrees / 2) + 90);
            wedgeText.x = Math.cos(Phaser.Math.DegToRad(startDegrees + (wheelOptions.slices[i].degrees / 2))) * 100;
            wedgeText.y = Math.sin(Phaser.Math.DegToRad(startDegrees + (wheelOptions.slices[i].degrees / 2))) * 100;
            this.wheelContainer.add(wedgeText);*/
            startDegrees += wheelOptions.slices[i].degrees;

        }
        graphics.generateTexture("wheel", (wheelOptions.wheelRadius + wheelOptions.strokeWidth) * 2, (wheelOptions.wheelRadius + wheelOptions.strokeWidth) * 2);
        var wheel = this.add.sprite(0, 0, "wheel");
        wheel.setInteractive();
        this.wheelContainer.add(wheel);
        this.wheelContainer.sendToBack(wheel);
        var marker = this.add.sprite(config.width / 18, config.height / 1.6, 'marker');
        //this.wheelContainer.add(marker);
        this.input.on('gameobjectdown', this.spinWheel, this);
        this.add.rectangle(0, 20, 400, 40, 0x138f9c).setOrigin(0, 0);
        this.add.text(30, 32, "Customer Reactions", { fontFamily: '"Arial"' });
        this.add.text(30, 90, "Spin the wheel below to see \nsome potential customer reactions", { fontFamily: '"Arial"', color: '#4b4b4b' });

    }

    spinWheel() {
        let rounds = Phaser.Math.Between(wheelOptions.wheelRounds.min, wheelOptions.wheelRounds.max);
        let degreesIndex = Phaser.Math.Between(0, wheelOptions.remainingDegrees.length - 1);
        let degrees = wheelOptions.remainingDegrees[degreesIndex] * 90 + 45;
        let resultDegree = 0;
        for (var i = wheelOptions.slices.length - 1; i >= 0; i--) {
            resultDegree += wheelOptions.slices[i].degrees;
            if (resultDegree >= degrees) {
                break;
            }
        }
        this.tweens.add({
            //add the wheel container
            targets: [this.wheelContainer],

            //angle destination
            angle: 360 * rounds + degrees,

            //tween duration
            duration: Phaser.Math.Between(wheelOptions.rotationTimeRange.min, wheelOptions.rotationTimeRange.max),

            //ease that tween
            ease: "Cubic.easeOut",

            //callback scope
            callbackScope: this,

            //execute this when tween is done
            onComplete: function (tween) {
                switch (wheelOptions.remainingDegrees[degreesIndex]) {
                    case 0:
                        togglePopup('one');
                        break;
                    case 1:
                        togglePopup('two');
                        break;
                    case 2:
                        togglePopup('three');
                        break;
                    case 3:
                        togglePopup('four');
                        break;
                }
                if (wheelOptions.remainingDegrees.length > 1) wheelOptions.remainingDegrees.splice(degreesIndex, 1);
                else {
                    toggleHide("prompt");
                    setVariable("SpinCount", "4");
                    wheelOptions.remainingDegrees = [0, 1, 2, 3];
                }
            }
        });
    }
}