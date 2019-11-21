class Room extends Phaser.Scene {
    constructor(handle) {
        super(handle);

    }
    preload() {
        this.load.image('scanline', 'src/imgs/Scanline.png');
        this.load.image('vignette', 'src/imgs/Vignette.png');
    }
    create() {
        gameState.currentRoom = this;
        this.outputText = "";
        this.output = this.add.text(70, 400, this.outputText, { font: "16px", fontFamily: "Terminal" }).setOrigin(0, 0);
        this.output.tint = 0x007200;
        this.output.setOrigin(0);
        this.output.y = 0;
        this.inputField = this.add.text(70, 465, "INPUT > " + inputText, { font: "16px", fontFamily: "Terminal" });
        this.inputField.tint = 0x007200;
        this.input.keyboard.on('keydown', function (key) {
            key.preventDefault();
            this.scene.addLetter(key);
        });
        this.input.keyboard.addKey(8);
        this.roomLore();
        for (var i = 0; i < 570; i += 3) {
            this.add.image(0, i, 'scanline').setOrigin(0);
        }
        this.add.image(0, 0, 'vignette').setOrigin(0);
        this.commands = [
            'GO NORTH',
            'NORTH',
            'N',
            'WALK NORTH'
        ]
    }

    update() {
        this.input.keyboard.addCapture('BACKSPACE');
        var bufferText = "";
        for (var lines = 0; lines < buffer.length; lines++) {
            bufferText += buffer[lines];
            if (lines < buffer.length - 1) {
                bufferText += "\n";
            }
        }
        this.outputText = bufferText;
        this.output.text = this.outputText;
        this.inputField.text = "INPUT > " + inputText;
        this.inputField.alpha = Phaser.Math.Between(.99, 1);
        this.output.alpha = Phaser.Math.Between(.99, 1);
    }

    addLetter(key) {

        //Keycodes
        var letter = "";
        var found = false;
        var keyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77, 32, 13, 8, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
        var keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", " ", "enter", "backspace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        //Decode letters
        for (var i = 0; i < keyCodes.length; i++) {
            if (keyCodes[i] == key.keyCode) {
                letter = keys[i];
                found = true;
                break;
            }
        }
        if (found) {
            //Backspace
            if (letter == "backspace") {
                if (inputText.length >= 1) {
                    //this.sound.play('click', 0.3 * volume);
                    inputText = inputText.substring(0, inputText.length - 1);
                }
            }
            //Enter (feed text to terminal)
            else if (letter == "enter") {
                if (inputText != "") {
                    textFeed(" ");
                    textFeed("> " + inputText);
                    this.processCommand(inputText);
                    inputText = "";
                }
            }
            //Add letters and spaces, maximum of 30 characters
            else {
                if (inputText.length < 30) {
                    //this.sound.play('click', 0.3 * volume);
                    inputText += letter;
                    console.log(inputText);
                }
            }
        }
    }

    roomLore() {
        textFeed("You are in an empty room. Well, it would be empty if not for this vehicle directly in");
        textFeed("the center of it. There is a man here as well. You aren't sure what you have to do,");
        textFeed("but you know you should probably LOOK at things, or perhaps TALK to people. Maybe even");
        textFeed("WALK or GO somewhere.\n");
        textFeed("\n");
        textFeed("Obvious exits are NORTH, SOUTH, EAST and WEST.");

    }

    processCommand(command) {
        //Split up the command to make things easier
        let first = command.split(" ")[0];
        let second = command.split(" ")[1];
        let thrid = command.split(" ")[2];
        let fourth = command.split(" ")[3];
        if (first == "GO" || first == "WALK") {
            if (command == "GO" || command == "WALK") {
                textFeed("Where are you going?");
            }
            else if (second == "NORTH") {
                textFeed("You go NORTH.");
            }
            else if (second == "SOUTH") {
                textFeed("You go SOUTH.");
            }
            else if (second == "EAST") {
                textFeed("You go EAST.");
            }
            else if (second == "WEST") {
                textFeed("You go WEST.");
            } else {
                textFeed("Wait. where do you want to go?")
            }
        }
        if (first == "LOOK") {
            if (command == "LOOK") {
                this.roomLore();
            }
            else if (second == "MAN") {
                textFeed("He's a normal looking man. Something about him seems familiar.");
            }
        }
    }

}