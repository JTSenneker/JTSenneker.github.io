class WelcomeScreen extends Phaser.Scene {
    constructor() {
        super('welcome');
    }
    preload() {
        this.load.image('welcome', 'src/img/screens/Picture6.png');
        this.load.image('congrats', 'src/img/screens/Picture7.png');
        this.load.image('nameCT5', 'src/img/screens/Picture8.png');
        this.load.image('phoneFrame', 'src/img/screens/PhoneFrame.png');
    }
    create() {
        this.welcomeScreen = this.add.image(0, 0, 'welcome').setOrigin(0, 0);
        this.congratsScreen = this.add.image(0, 0, 'congrats').setOrigin(0, 0);
        this.nameScreen = this.add.image(0, 0, 'nameCT5').setOrigin(0, 0);

        this.nameText = this.add.text(122, 493, "text", { color: "0xaaaaaa", font: "24px", fontFamily: "Arial" }).setOrigin(0, 0);
        this.nameButton = this.makeButton(122, 493, 175, 24, 'typeText', 'nameButton');

        this.welcomeContainer = this.add.container(0, 0);
        this.congratsContainer = this.add.container(0, 0);
        this.nameContainer = this.add.container(0, 0);

        this.welcomeContainer.add(this.welcomeScreen);
        this.congratsContainer.add(this.congratsScreen);
        this.nameContainer.add(this.nameScreen);
        this.nameContainer.add(this.nameText);
        this.nameContainer.add(this.nameButton);

        this.nameContainer.alpha = 0;
        this.congratsContainer.alpha = 0;
        this.add.image(0, 0, 'phoneFrame').setOrigin(0, 0); ''

        this.time.addEvent({
            delay: 2000,//ms
            callback: this.fadeInScreen,
            callbackScope: this,
            args: ['congrats']
        });

        this.input.on('gameobjectdown', function (pointer, button) {
            switch (button.type) {
                case 'typeText':
                    if (button.name == 'nameButton') {
                        this.nameText.text = '';
                        letterIndex = 0;
                        this.time.addEvent({
                            delay: 500,
                            repeat: 6,
                            callback: typeText,
                            args: [this.nameText, "John   ", this.callback, [this]]
                        }
                        );
                    }
                    break;
            }
        }, this);
    }
    makeButton(x, y, w, h, type, name) {
        var rect = this.add.rectangle(x, y, w, h, 0x333333).setOrigin(0, 0);
        rect.fillAlpha = global.alpha;
        rect.setInteractive();
        rect.name = name;
        rect.type = type;
        return rect;
    }

    callback(scene) {

        scene.scene.start('myRewards');
    }

    fadeInScreen(screen) {
        if (screen == 'congrats') {
            this.tweens.add({
                targets: [this.welcomeContainer],
                alpha: 0,
                druation: 500,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function (tween) {
                    this.tweens.add({
                        targets: [this.congratsContainer],
                        alpha: 1,
                        duration: 500,
                        ease: "Cubic.easeIn",
                        callbackScope: this,
                        onComplete: function (tween) {
                            this.time.addEvent({
                                delay: 2000,//ms
                                callback: this.fadeInScreen,
                                callbackScope: this,
                                args: ['name']
                            });
                        }
                    });
                }
            });
        }

        if (screen == 'name') {
            this.tweens.add({
                targets: [this.congratsContainer],
                alpha: 0,
                druation: 500,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function (tween) {
                    this.tweens.add({
                        targets: [this.nameContainer],
                        alpha: 1,
                        duration: 500,
                        ease: "Cubic.easeIn",
                        callbackScope: this,
                        onComplete: function (tween) { }
                    });
                }
            });
        }
    }
}