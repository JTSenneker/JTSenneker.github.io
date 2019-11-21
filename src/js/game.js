var buffer = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
var inputText = "";
var game;
var config = {
    width: 970,
    height: 546,
    backgroundColor: 0x001c00,
    scene: [Room],
    preventDefault: true

}
var gameState = {
    currentRoom: 0
}
function addLetter(key) {
    //Keycodes
    var letter = "";
    var found = false;
    var keyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77, 32, 13, 8, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
    var keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", " ", "enter", "backspace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    //Decode letters
    for (i = 0; i < keyCodes.length; i++) {
        if (keyCodes[i] == key) {
            letter = keys[i];
            found = true;
            break;
        }
    }
    if (found) {
        //Backspace
        if (letter == "backspace") {
            if (inputText.length >= 1) {
                this.sound.play('click', 0.3 * volume);
                inputText = inputText.substring(0, inputText.length - 1);
            }
        }
        //Enter (feed text to terminal)
        else if (letter == "enter") {
            if (inputText != "") {
                if (room > 0 && room <= 17) {
                    steps++;
                }
                this.textFeed(" ");
                this.textFeed("> " + inputText);
                //this.process(inputText);
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

function textFeed(phrase) {
    //Add new line to text buffer
    buffer.shift();
    buffer.push(phrase);
}

window.onload = function () {
    game = new Phaser.Game(config);

}

