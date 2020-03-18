var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    scene: [Spinner]
}
const wheelOptions = {
    ///////////////////////////////////////////////
    ///////CONTROLS THE WEDGES ON THE WHEEL////////
    ///////////////////////////////////////////////
    slices: [{
        degrees: 90,
        color: 0x114d7d,
    },
    {
        degrees: 90,
        color: 0xe6e6e6,
    },
    {
        degrees: 90,
        color: 0x043257,
    },
    {
        degrees: 90,
        color: 0x4d4d4d,
    }],
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    rotationTimeRange: {
        min: 3000,
        max: 4000
    },
    wheelRounds: {
        min: 2,
        max: 5
    },
    strokeColor: 0xffffff,
    strokeWidth: 2,
    wheelRadius: 160,
    remainingDegrees: [0, 1, 2, 3],
    canSpin: true
}
window.onload = function () {
    var game = new Phaser.Game(config);
}