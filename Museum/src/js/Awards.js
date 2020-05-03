class Awards extends Phaser.Scene {
    constructor() {
        super("awards");
    }
    preload() {
        this.load.image('awardsBG', 'src/img/Rooms/AwardsRoom.jpg');
        this.load.image('awardsPage', 'src/img/Objects/AwardsWebsite.png');
       
    }
    create() {
        this.add.image(0, -60, 'awardsBG').setOrigin(0);
        this.add.image(32, 210, 'awardsPage').setOrigin(0);
        //this.makeButton('webPopup', 32, 210, 291, 212);
        this.makeButton('theater', 0, 0, 65, 500);
        
        this.input.on('gameobjectdown', function (pointer, button) {
            switch (button.name) {
                case 'webPopup':
                    togglePopup('webTest');
                    break;
                case 'theater':
                    this.scene.start('theater');
                this.game.canvas.style.cursor = "default";
                    break;
            }
        }, this);

        this.input.on('gameobjectover', function (pointer, button) {
            switch (button.name) {
                case 'entrance':
                case 'theater':
                    this.game.canvas.style.cursor = "alias";
                    break;
                case 'webPopup':
                    this.game.canvas.style.cursor = "zoom-in";
                    break;
                case 'tim':
                    this.game.canvas.style.cursor = "help";
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

    makePerson(name, type, x, y) {
        var person = this.add.sprite(x, y, type).setOrigin(0, 0);
        person.setInteractive();
        person.name = name;
        return person;
    }
}