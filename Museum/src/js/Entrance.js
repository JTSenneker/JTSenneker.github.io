class Entrance extends Phaser.Scene {
    constructor() {
        super("entrance");
    }
    preload() {
        this.load.image('entranceBG', 'src/img/Rooms/Entrance.png');
        this.load.image('guide','src/img/Objects/iStock-167604181.png');
        this.load.image('poster','src/img/Objects/poster.png');
    }
    create() {
        this.add.image(0, 0, 'entranceBG').setOrigin(0);
        this.add.image(410,200,'poster').setOrigin(0).scale = .8;
        this.guide = this.add.sprite(625,210,'guide').setOrigin(0,0);
        this.guide.scaleX = .35;
        this.guide.scaleY = .35;
        this.guide.setInteractive();
        this.guide.name = 'guide';
        this.makeButton('theater', 125, 175, 100, 250);
        this.input.on('gameobjectdown', function (pointer, button) {
            if(button.name == 'theater'){
                this.events.emit('getNotes');
                this.scene.start('theater');
                this.game.canvas.style.cursor = "default";
            }
            if(button.name == 'guide'){
                handleDialogue(dialogues.guideIntro);
            }
        }, this);

        this.input.on('gameobjectover', function (pointer, button) {
            if (button.name == 'theater') {
                this.game.canvas.style.cursor = "alias";
            }
        }, this);

        this.input.on('gameobjectout', function (pointer, button) {
            this.game.canvas.style.cursor = "default";
        }, this);
        //this.scene.start('UserInterface');
    }
    makeButton(name, x, y, w, h) {
        var rect = this.add.rectangle(x, y, w, h, 0x6666ff).setOrigin(0, 0);
        rect.fillAlpha = globals.collisionAlpha;
        rect.setInteractive();
        rect.name = name;
    }
    
 
}