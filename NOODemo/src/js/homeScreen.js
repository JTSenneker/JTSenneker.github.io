class HomeScreen extends Phaser.Scene {
    constructor() {
        super('home');
    }
    preload() {
        this.load.image('main', 'src/img/screens/Picture1.png');
    }
    create() {
        this.add.image(0, 0, 'main').setOrigin(0, 0);
        this.makeButton(166, 590, 160, 45, 'teleport', 'create');
        this.input.on('gameobjectdown', function (pointer, button) {
            switch (button.type) {
                case 'teleport':
                    if (button.name = 'create') this.scene.start('create');
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
}

class LoginScreen extends Phaser.Scene {
    constructor() {
        super('login');
    }
    preload() {
        this.load.image('login', 'src/img/screens/Picture5.png');
    }
    create() {

        this.add.image(0, 0, 'login').setOrigin(0, 0);
        this.emailButton = this.makeButton(120, 350, 255, 30, 'fillText', 'email');
        this.passButton = this.makeButton(120, 415, 255, 30, 'fillText', 'password');

        this.emailText = this.add.text(120, 355, "|", { color: "0xaaaaaa", font: "24px", fontFamily: "Arial" }).setOrigin(0, 0);
        this.passText = this.add.text(120, 420, "|", { color: "0xaaaaaa", font: "24px", fontFamily: "Arial" }).setOrigin(0, 0);
        this.signInButton = this.makeButton(175, 530, 160, 45, 'transition', 'signIn');
        this.input.on('gameobjectdown', function (pointer, button) {
            this.onButtonClick(pointer, button);
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

    onButtonClick(pointer, button) {
        letterIndex = 0;
        switch (button.type) {
            case 'fillText':
                if (button.name == 'email') {
                    this.emailText.text = "";
                    var timer = this.time.addEvent({
                        delay: 100,
                        callback: this.typeText,
                        args: ['email'],
                        callbackScope: this,
                        repeat: global.email.length - 1
                    });

                }
                if (button.name == 'password') {
                    this.passText.text = "";
                    var timer = this.time.addEvent({
                        delay: 180,
                        callback: this.typeText,
                        args: ['pass'],
                        callbackScope: this,
                        repeat: global.pass.length - 1
                    });
                }
                button.destroy();
                break;
            case 'transition':
                if (button.name == 'signIn') this.scene.start('welcome');
                break;
        }
    }

    typeText(textType) {
        if (textType == 'email') {
            this.emailText.text += global.email[letterIndex];
            letterIndex++;
            if (letterIndex === global.email.length - 1) {

                return;
            }

        } else if (textType == 'pass') {
            this.passText.text += global.pass[letterIndex];
            letterIndex++;
            if (letterIndex === global.email.length - 1) {

                return;
            }
        }
    }
}