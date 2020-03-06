var config = {
    width: 1024,
    height: 516,
    backgroundColor: 0xffffff,
    scene: [Spinner]
}
const wheelOptions = {
    slices: [{
        degrees: 90,
        color: 0xaabb00,
        text: "Customer 1",
        id: "one"
    },
    {
        degrees: 90,
        color: 0x00aabb,
        text: "Customer 2",
        id: "one"
    },
    {
        degrees: 90,
        color: 0xaa00bb,
        text: "Customer 3",
        id: "one"
    },
    {
        degrees: 90,
        color: 0xa0b0c0,
        text: "Customer 4",
        id: "one"
    }],
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
    remainingDegrees: [0, 1, 2, 3]
}
window.onload = function () {
    var game = new Phaser.Game(config);
}