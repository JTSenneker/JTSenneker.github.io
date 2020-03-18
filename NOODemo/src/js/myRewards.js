class MyRewards extends Phaser.Scene {
    constructor() {
        super('myRewards');
    }
    preload() {
        this.load.image('rewards', 'src/img/screens/Picture9.png');
        this.load.image('terms', 'src/img/screens/Picture10.png');
        this.load.image('accepted', 'src/img/screens/Picture11.png');
        this.load.image('phoneFrame', 'src/img/screens/PhoneFrame.png');
    }
    create() {
        this.welcomeScreen = this.add.image(0, 0, 'rewards').setOrigin(0, 0);
        this.congratsScreen = this.add.image(0, 0, 'terms').setOrigin(0, 0);
        this.nameScreen = this.add.image(0, 0, 'accepted').setOrigin(0, 0);

        this.nameButton = this.makeButton(167, 612, 157, 37, 'transition', 'continue');
        this.learnMoreButton = this.makeButton(167, 582, 157, 37, 'screenChange', 'learnMore');
        this.agreeButton = this.makeButton(84, 664, 320, 38, 'screenChange', 'agree');

        this.welcomeContainer = this.add.container(0, 0);
        this.congratsContainer = this.add.container(0, 0);
        this.nameContainer = this.add.container(0, 0);

        this.welcomeContainer.add(this.welcomeScreen);
        this.welcomeContainer.add(this.learnMoreButton);
        this.congratsContainer.add(this.congratsScreen);
        this.congratsContainer.add(this.agreeButton);
        this.nameContainer.add(this.nameScreen);
        this.nameContainer.add(this.nameButton);


        this.add.image(0, 0, 'phoneFrame').setOrigin(0, 0);
        this.nameContainer.alpha = 0;
        this.congratsContainer.alpha = 0;



        this.input.on('gameobjectdown', function (pointer, button) {
            switch (button.type) {
                case 'screenChange':
                    if (button.name == 'learnMore') {
                        this.fadeInScreen('congrats');
                    }
                    if (button.name == 'agree') {
                        this.fadeInScreen('name');
                    }
                    break;
                case 'transition':
                    this.scene.start('personalize')
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

        scene.scene.start('home');
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
                        onComplete: function (tween) { }
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