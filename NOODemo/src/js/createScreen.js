
class CreateAccount extends Phaser.Scene {

    constructor() {
        super('create')
    }
    preload() {
        this.load.image('email', 'src/img/screens/Picture2.png');
        this.load.image('password', 'src/img/screens/Picture3.png');
        this.load.image('confirm', 'src/img/screens/Picture4.png');
    }
    create() {
        var emailPage = this.add.image(0, 0, 'email').setOrigin(0, 0);
        var passwordPage = this.add.image(0, 0, 'password').setOrigin(0, 0);
        var confirmPage = this.add.image(0, 0, 'confirm').setOrigin(0, 0);


        this.emailContainer = this.add.container(0, 0);
        this.emailContainer.add(emailPage);
        this.passwordContainer = this.add.container(0, 0);
        this.passwordContainer.add(passwordPage);
        this.passwordContainer.x = 493;
        this.confirmContainer = this.add.container(0, 0);
        this.confirmContainer.x = 493;
        this.confirmContainer.add(confirmPage);
        this.emailInput = this.add.text(120, 460, "Email", { color: "0x000000", fontFamily: "Arial" }).setOrigin(0, 0);
        this.emailContainer.add(this.emailInput);
        this.passwordInput = this.add.text(110, 410, "|", { color: "0x000000", fontFamily: "Arial" }).setOrigin(0, 0);
        this.passwordContainer.add(this.passwordInput);


        var emailButton = this.makeButton(120, 452, 175, 30, 'tween', 'emailText');
        this.emailContainer.add(emailButton);

        var passwordbutton = this.makeButton(120, 452, 175, 30, 'tween', 'passwordText');
        this.passwordContainer.add(passwordbutton);

        this.input.on('gameobjectdown', function (pointer, button) {
            if (button.type == 'tween') {
                if (button.name == 'emailText') this.transitionScreen('password');
                if (button.name == 'passwordText') this.transitionScreen('confirm');
            }
        }, this);

        this.input.keyboard.on('keydown', function (key) {
            key.preventDefault();
            if (global.enteringEmail) this.addLetterToEmail(key);
            if (global.enteringPass) this.addLetterToPassword(key);
        }, this);

        this.input.keyboard.on('keyup', function (key) {
            if (key.keyCode == 16) global.shift = false;
        }, this);
    }
    update() {
        this.emailInput.text = emailText;
        this.passwordInput.text = passwordText;
    }
    makeButton(x, y, w, h, type, name) {
        var rect = this.add.rectangle(x, y, w, h, 0x333333).setOrigin(0, 0);
        rect.fillAlpha = global.alpha;
        rect.setInteractive();
        rect.name = name;
        rect.type = type;
        return rect;
    }
    transitionScreen(screen) {
        //transition to password screen
        if (screen == 'password') {

            this.tweens.add({
                targets: [this.passwordContainer],
                x: 0,
                druation: 5,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function (tween) {
                    global.enteringPass = true;
                    console.log(global.enteringPass);
                }
            });
        }
        //transition to confirm screen
        if (screen == 'confirm') {
            this.tweens.add({
                targets: [this.confirmContainer],
                x: 0,
                druation: 5,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function (tween) {
                    this.scene.start('login');
                }
            });
        }
    }

    addLetterToEmail(key) {
        //Keycodes
        var letter = "";
        var found = false;
        var keyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77, 32, 13, 8, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 190];
        var keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", " ", "enter", "backspace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

        if (key.keyCode == 16) {
            global.shift = true;
        }
        //Decode letters
        for (var i = 0; i < keyCodes.length; i++) {
            if (keyCodes[i] == key.keyCode) {
                if (!global.shift) letter = keys[i].toLowerCase();
                else letter = keys[i];
                if (letter == "2" && global.shift) letter = "@";
                found = true;
                break;
            }
        }
        if (found) {
            //Backspace
            if (letter == "backspace") {
                if (emailText.length >= 1) {

                    emailText = emailText.substring(0, emailText.length - 1);
                }
            }
            //Enter (feed text to terminal)
            else if (letter == "enter") {
                if (emailText != "") {
                    global.enteringEmail = false;
                    this.transitionScreen('password');
                }
            }
            //Add letters and spaces, maximum of 30 characters
            else {
                if (emailText.length < 30) {

                    emailText += letter;
                    console.log(emailText);
                }
            }
        }
    }
    addLetterToPassword(key) {
        if (key.keyCode == 8) {
            if (passwordText.length >= 1) {

                passwordText = passwordText.substring(0, passwordText.length - 1);
            }
        }
        else if (key.keyCode == 13) {
            global.enteringPass = false;
            this.transitionScreen('confirm');
        }
        else {
            passwordText += "•";
        }
    }
}