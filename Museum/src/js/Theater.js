class Theater extends Phaser.Scene {
    constructor() {
        super("theater");
    }
    preload() {
        this.load.image('theaterBG', 'src/img/Rooms/Theater.png');
       this.load.image('videoShot', 'src/img/Objects/VideoScreenshot.PNG');
    }
    create() {
        this.add.image(65, 0, 'theaterBG').setOrigin(0);
        var image = this.add.image(111,90,'videoShot').setOrigin(0);
        image.displayWidth = 666;
        image.displayHeight = 337;

        this.makeButton('playButton', 111, 90, 666, 338);
        this.makeButton('awards', 825, 0, 75, 500);
        this.makeButton('entrance', 0, 0, 65, 500);
        this.input.on('gameobjectdown', function (pointer, button) {
            switch (button.name) {
                case 'playButton':
                    document.getElementById('video').src = 'https://www.youtube.com/embed/wK8nHn095I8';
                    togglePopup('webTest');
                    break;
                case 'entrance':
                case 'awards':
                    this.events.emit('getNotes');
                    if (button.name == 'entrance') this.scene.start('entrance');
                    if (button.name == 'awards') this.scene.start('awards');
                    this.game.canvas.style.cursor = "default";
                    break;
            }
        }, this);


        this.input.on('gameobjectover', function (pointer, button) {
            switch (button.name) {
                case 'entrance':
                case 'awards':
                    this.game.canvas.style.cursor = "alias";
                    break;
                case 'playButton':
                    this.game.canvas.style.cursor = "pointer";
                    break;
            }
        }, this);

        this.input.on('gameobjectout', function (pointer, button) {
            this.game.canvas.style.cursor = "default";
        }, this);

    }
    makeButton(name, x, y, w, h) {
        var rect = this.add.rectangle(x, y, w, h, 0x6666ff).setOrigin(0, 0);
        rect.fillAlpha = globals.collisionAlpha;
        rect.setInteractive();
        rect.name = name;
    }
}