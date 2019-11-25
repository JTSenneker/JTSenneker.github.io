
var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000025,
    scene: [Scene1]
}
const puzzles = [
    {
        category: "Phrase",
        row1: "learning",
        row2: "wheels in",
        row3: "motion",
        row4: ""

    }
];
const vowels = ['A', 'E', 'I', 'O', 'U'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
let row1 = [];
let row2 = [];
let row3 = [];
let row4 = [];
let consonantButtons = [];
let vowelButtons = [];
let category = "";
const gameOptions = {
    //configure slices
    //array of JSON objects
    slices: [
        {
            degrees: 60,
            startColor: 0xff0000,
            endColor: 0xff8800,
            rings: 3,
            text: "200",
            score: 200
        },
        {
            degrees: 60,
            startColor: 0x000000,
            endColor: 0x008800,
            rings: 4,
            text: "300",
            score: 300
        },
        {
            degrees: 60,
            startColor: 0x0000ff,
            endColor: 0x0088ff,
            rings: 5,
            text: "400",
            score: 400
        },
        {
            degrees: 60,
            startColor: 0x0000ff,
            endColor: 0x8800ff,
            rings: 6,
            text: "100",
            score: 100
        },
        {
            degrees: 60,
            startColor: 0xff0000,
            endColor: 0xff0088,
            rings: 7,
            text: "500",
            score: 500
        },
        {
            degrees: 60,
            startColor: 0x002200,
            endColor: 0x00ee22,
            rings: 8,
            text: "600",
            score: 600
        }
    ],
    canSpin: false,
    canSelect: false,
    atWheel: false,
    buyingVowel: false,
    scoreMultiplier: 0,
    score: 0,
    //wheel rotation duration (ms)
    rotationTimeRange: {
        min: 3000,
        max: 4500
    },
    //how many rounds before it stops
    wheelRounds: {
        min: 2,
        max: 10
    },
    //degrees the wheel spins back before it stops
    backSpin: {
        min: 1,
        max: 4
    },
    wheelRadius: 240,
    strokeColor: 0xffffff,
    strokeWidth: 5
}

window.onload = function () {
    var game = new Phaser.Game(config);

}
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}



