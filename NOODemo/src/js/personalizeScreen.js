class PersonalizeScreen extends Phaser.Scene {
    constructor() {
        super('personalize');
    }
    preload() {
        this.load.image('personalizeMain', 'src/img/screens/Picture12.png');
        this.load.image('personalizeHotSpot', 'src/img/screens/Picture13.png');
        this.load.image('perosnalizeApps', 'src/img/screens/Picture14.png');
        this.load.image('personalizeStations', 'src/img/screens/Picture15.png');
    }

    create() {
        this.mainBG = this.add.image(0, 0, 'personalizeMain').setOrigin(0, 0);
        this.hotSpotBG = this.add.image(0, 0, 'personalizeHotSpot').setOrigin(0, 0);
        this.appBG = this.add.image(0, 0, 'perosnalizeApps').setOrigin(0, 0);
        this.stationsBG = this.add.image(0, 0, 'personalizeStations').setOrigin(0, 0);

        this.main = this.add.container(0, 0);
        this.hotSpot = this.add.container(0, 0);
        this.apps = this.add.container(0, 0);
        this.stations = this.add.container(0, 0);

        //Main Container Content
        this.wifiButton = this.makeButton(132, 286, 232, 44, 'screenChange', 'wifi');
        this.appsButton = this.makeButton(132, 340, 232, 44, 'screenChange', 'apps');
        this.stationButton = this.makeButton(132, 394, 232, 44, 'screenChange', 'station');
        this.continueButton = this.makeButton(170, 620, 158, 42, 'transition', 'continue');
        this.main.add(this.mainBG);
        this.main.add(this.wifiButton);
        this.main.add(this.appsButton);
        this.main.add(this.stationButton);
        this.main.add(this.continueButton);

        //HotSpot Container Content
        this.hotSpot.add(this.hotSpotBG);
        this.saveWiFiButton = this.makeButton(173, 584, 152, 42, 'screenChange', 'wifiSave');

        this.hotSpot.add(this.saveWiFiButton);

        this.hotSpot.x = 494;
        //Apps Container Content
        this.saveAppsButton = this.makeButton(136, 645, 219, 42, 'screenChange', 'appsSave');
        this.apps.add(this.appBG);
        this.apps.add(this.saveAppsButton);

        this.apps.x = 494;
        //Stations Container Content
        this.saveStationsButton = this.makeButton(136, 645, 219, 42, 'screenChange', 'stationSave');
        this.stations.add(this.stationsBG);
        this.stations.add(this.saveStationsButton);

        this.stations.x = 494;

        this.input.on('gameobjectdown', function (pointer, button) {
            this.onClick(pointer, button);
        }, this);
    }

    makeButton(x, y, w, h, type, name) {
        var rect = this.add.rectangle(x, y, w, h, 0x333333).setOrigin(0, 0);
        rect.fillAlpha = global.alpha;
        rect.setInteractive();
        rect.name = name;
        rect.type = type;
        return rect;
    }

    onClick(pointer, button) {
        switch (button.type) {
            case 'screenChange':
                if (button.name == 'wifi') this.transitionScreen(this.hotSpot, true);
                if (button.name == 'apps') this.transitionScreen(this.apps, true);
                if (button.name == 'station') this.transitionScreen(this.stations, true);
                if (button.name == 'wifiSave') this.transitionScreen(this.hotSpot, false);
                if (button.name == 'appsSave') this.transitionScreen(this.apps, false);
                if (button.name == 'stationSave') this.transitionScreen(this.stations, false);
                break;
            case 'transition':
                if (button.name == 'continue') this.scene.start('onstar');
                break;
        }
    }

    transitionScreen(targetObject, fromMain) {
        if (fromMain) {
            this.tweens.add({
                targets: [targetObject, this.main],
                x: '-=492',
                duration: 500,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function (tween) { }
            });
        } else {
            this.tweens.add({
                targets: [targetObject, this.main],
                x: '+=492',
                duration: 500,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function (tween) { }
            });
        }
    }
}