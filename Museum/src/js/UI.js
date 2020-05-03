class UI extends Phaser.Scene{
    constructor(){
        super({key:'UserInterface',active:true});
    }
    preload(){
        this.load.image('info','src/img/Icons/information.png');
        this.load.image('brochureBG','src/img/Objects/grey_panel.png');
        this.load.image('silhohuette','src/img/bowties/silhohuettes/2013.png');
        for(let i = 0; i<bowties.length;i++){
            this.load.image(bowties[i],'src/img/bowties/'+bowties[i]+'.png');
        }
        this.load.image('downArrow','src/img/Objects/grey_arrowDownGrey.png');
        this.load.image('blankBox','src/img/Objects/grey_box.png');
        this.load.image('checkBox','src/img/Objects/yellow_boxCheckmark.png');
    }
    create(){
        
        this.infoButton = this.add.sprite(900,0,'info').setOrigin(1,0);

        this.infoButton.setInteractive();
        this.infoButton.name = 'info';
        this.infoButton.scale = .5;
        

        this.brochureBG = this.add.nineslice(10,10,880,400,'brochureBG',12,12);
        this.brochureContainer = this.add.container(0,0);     
        this.brochureContainer.add(this.brochureBG);
        for(let i = 0;i<bowties.length;i++){
            var silohuette = this.add.sprite(70*i+31,325,'silhohuette').setOrigin(0,0);
            silohuette.scale = .15;
            let bowtie = this.add.sprite(70*i+31,325,bowties[i]).setOrigin(0,0);
            bowtie.scale = .15;
            bowtie.visible = false;
            bowtieFlags.push(bowtie);
            this.brochureContainer.add(silohuette);
            this.brochureContainer.add(bowtie);
        }

        for(let i = 0; i<roomsDetails.length;i++){
            this.brochureContainer.add(this.add.text(25,50*i+30,roomsDetails[i].name,{fontSize: 12, color:'#000000'}));
            roomsDetails[i].notes = this.add.text(400,50*i+30,'',{fontSize: 12, color:'#000000', wordWrap:{width:500}})
            this.brochureContainer.add(roomsDetails[i].notes);
            var blankBox = this.add.sprite(225,50*i+30,'blankBox').setOrigin(0,0);
            blankBox.scale = .75;
            var checkBox = this.add.sprite(225,50*i+30,'checkBox').setOrigin(0,0);
            checkBox.scale = .75;
            roomsDetails[i].visited = checkBox;
            checkBox.visible = false;
            this.brochureContainer.add(blankBox);
            this.brochureContainer.add(checkBox);
        }
        this.downArrow = this.add.sprite(450,395,'downArrow');
        this.downArrow.setInteractive();
        this.downArrow.name = 'downArrow';
        this.brochureContainer.add(this.downArrow);
       
        
        this.brochureContainer.y = 1000;
        
        this.input.on('gameobjectdown', function (pointer, button) {
           //Show Brochure
           if(button.name == 'downArrow'){
               this.brochureContainer.y = 1000;
           }
           if(button.name == 'info'){
               this.brochureContainer.y = 0;
           }
        }, this);

        this.input.on('gameobjectover', function (pointer, button) {
            this.game.canvas.style.cursor = "pointer";
            
        }, this);
        this.input.on('gameobjectout', function (pointer, button) {
            this.game.canvas.style.cursor = "default";
        }, this);


        var entrance = this.scene.get('entrance');
        entrance.events.on('getNotes',function(){
            roomsDetails[0].visited.visible = true;
            roomsDetails[0].notes.text = 'You can refer to your brochure to see your progress';
        })
        var theater = this.scene.get('theater');
        theater.events.on('getNotes',function(){
            roomsDetails[1].visited.visible = true;
            roomsDetails[1].notes.text = 'Chevrolet values include Dependability, Performance and Value';
        })
    }
}