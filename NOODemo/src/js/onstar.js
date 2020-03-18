class Onstar extends Phaser.Scene {
    constructor() {
        super('onstar');
    }

    preload() {
        this.load.image('enjoy', 'src/img/screens/Picture16.png');
        this.load.image('remote', 'src/img/screens/Picture17.png');
        this.load.image('status', 'src/img/screens/Picture18.png');
        this.load.image('locate', 'src/img/screens/Picture19.png');
        this.load.image('safety', 'src/img/screens/Picture20.png');
        this.load.image('4GLTE', 'src/img/screens/Picture21.png');
        this.load.image('plans', 'src/img/screens/Picture23.png');
        this.load.image('allSet', 'src/img/screens/Picture24.png');
    }

    create() {
        this.enjoyBG = this.add.image(0, 0, 'enjoy').setOrigin(0, 0);
        this.remoteBG = this.add.image(0, 0, 'remote').setOrigin(0, 0);
        this.statusBG = this.add.image(0, 0, 'status').setOrigin(0, 0);
        this.locateBG = this.add.image(0, 0, 'locate').setOrigin(0, 0);
        this.safetyBG = this.add.image(0, 0, 'safety').setOrigin(0, 0);
        this.fourGBG = this.add.image(0, 0, '4GLTE').setOrigin(0, 0);
        this.plansBG = this.add.image(0, 0, 'plans').setOrigin(0, 0);
        this.allsetBG = this.add.image(0, 0, 'allSet').setOrigin(0, 0);

        this.enjoy = this.add.container(0, 0);
        this.remote = this.add.container(0, 0);
        this.status = this.add.container(0, 0);
        this.locate = this.add.container(0, 0);
        this.safety = this.add.container(0, 0);
        this.fourG = this.add.container(0, 0);
        this.plans = this.add.container(0, 0);
        this.allset = this.add.container(0, 0);

        this.containers = [this.enjoy, this.remote, this.status, this.locate, this.safety, this.fourG, this.plans, this.allset];
        for (var i = 1; i < this.containers.length; i++) {
            this.containers[i].x = 492;
        }

        this.button1 = this.makeButton(168, 578, 165, 42, 'screenChange', 'remote');
        this.button2 = this.makeButton(168, 578, 165, 42, 'screenChange', 'status');
        this.button3 = this.makeButton(168, 578, 165, 42, 'screenChange', 'locate');
        this.button4 = this.makeButton(168, 578, 165, 42, 'screenChange', 'safety');
        this.button5 = this.makeButton(168, 578, 165, 42, 'screenChange', 'fourG');
        this.button6 = this.makeButton(168, 595, 165, 42, 'screenChange', 'plans');

        this.index = 0;


        //enjoy content
        this.enjoy.add(this.enjoyBG);

        //remote content
        this.remote.add(this.remoteBG);
        this.remote.add(this.button1);
        //status content
        this.status.add(this.statusBG);
        this.status.add(this.button2);
        //locate content
        this.locate.add(this.locateBG);
        this.locate.add(this.button3);
        //safety content
        this.safety.add(this.safetyBG);
        this.safety.add(this.button4);
        //4G content
        this.fourG.add(this.fourGBG);
        this.fourG.add(this.button5);
        //plans content
        this.plans.add(this.plansBG);
        this.plans.add(this.button6);

        //all set content
        this.allset.add(this.allsetBG);

        this.input.on('gameobjectdown', function (pointer, button) { this.onClick(); }, this);
        this.time.addEvent({
            delay: 3000,
            callback: this.onClick,
            args: [],
            callbackScope: this
        });

    }

    onClick() {
        this.index++;
        this.tweens.add({
            targets: [this.containers[this.index - 1], this.containers[this.index]],
            x: '-=492',
            duration: 500,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function (tween) { }
        });
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