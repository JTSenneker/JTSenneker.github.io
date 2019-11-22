class Scene3 extends Phaser.Scene{
    

    constructor(handle, parent) {
        super(handle);
        this.handle = handle;
        this.parent = parent;
        this.WIDTH = 800;
        this.HEIGHT = 600;
    }
    create(){
        this.cameras.main.setViewport(this.parent.x,this.parent.y,this.WIDTH,this.HEIGHT);
        this.setupPuzzle(puzzles[0]);
        this.setupButtons();
    }
    refresh(){
        this.cameras.main.setPosition(this.parent.x,this.parent.y);
        this.scene.bringToTop();
      }
    setupPuzzle(puzzle){
        category = puzzle.category;
            for(var i = 0; i < 14; i++){
                row1[i]=this.add.sprite(i*32,0,'wordTile').setOrigin(0,0);
                row2[i]=this.add.sprite(i*32,64,'wordTile').setOrigin(0,0);
                row3[i]=this.add.sprite(i*32,128,'wordTile').setOrigin(0,0);
                row4[i]=this.add.sprite(i*32,192,'wordTile').setOrigin(0,0);
                row1[i].letter = " ";
                row2[i].letter = " ";
                row3[i].letter = " ";
                row4[i].letter = " ";
                this.anims.create({
                    key: 'noLetter',
                    frames: [{key:'wordTile',frame:0}],
                    frameRate: 20
                  });
            
                  this.anims.create({
                    key: 'letter',
                    frames: [{key:'wordTile',frame:1}],
                    frameRate: 20
                  })
            }
            for(var i = 0; i< 14; i++){
                
                if(i > puzzle.row1.length-1)break;
                if(puzzle.row1[i] == " ")continue;
                row1[i].anims.play('letter');
                row1[i].letter = puzzle.row1[i];
                console.log(row1[i].letter);
            }
            for(var i = 0; i< 14; i++){
                
                if(i > puzzle.row2.length-1)break;
                if(puzzle.row2[i] == " ")continue;
                row2[i].anims.play('letter');
                row2[i].letter = puzzle.row2[i];
                console.log(row2[i].letter);
            }
            for(var i = 0; i< 14; i++){
                
                if(i > puzzle.row3.length-1)break;
                if(puzzle.row3[i] == " ")continue;
                row3[i].anims.play('letter');
                row3[i].letter = puzzle.row3[i];
                console.log(row3[i].letter);
            }
            for(var i = 0; i< 14; i++){
                
                if(i > puzzle.row4.length-1)break;
                if(puzzle.row4[i] == " ")continue;
                row4[i].anims.play('letter');
                row4[i].letter = puzzle.row4[i];
                console.log(row4[i].letter);
            }
    }
    
    setupButtons(){
        for(var i = 21; i >=0; i--){
            var button = this.add.text(i*24,300,consonants[i],{fontSize:'24px',fill:'#FFF'});
            consonantButtons[i] = button;  
        }
        for(var i = 5; i >=0; i--){
            var button = this.add.text(i*24,324,vowels[i],{fontSize:'24px',fill:'#FFF'});
            vowelButtons[i] = button;
        }

        for(var i = consonantButtons.length-1; i>=0;i--){
            console.log(consonantButtons[i].text + " : " + consonants[i]);
            var scene = this;
            
            consonantButtons[i].setInteractive();
            consonantButtons[i].on('pointerup',function(){
                if(!gameOptions.canSelect)return;
                console.log(this.text);
                scene.CheckLetter(this.text);
                this.text = " "
                gameOptions.canSelect = false;
            });
        }

        for(var i = vowelButtons.length-1; i>=0;i--){
            console.log(vowelButtons[i].text + " : " + consonants[i]);
            var scene = this;
            
            vowelButtons[i].setInteractive();
            vowelButtons[i].on('pointerup',function(){
                if(!gameOptions.buyingVowel)return;
                console.log(this.text);
                scene.CheckLetter(this.text);
                this.text = " "
                gameOptions.score -= 250;
                gameOptions.canSelect = false;
                gameOptions.buyingVowel = false;
            });
        }
    }

    CheckLetter(letter){
        
        for(var j = row1.length-1;j>=0;j--){
                    
            if(row1[j].letter.toUpperCase() == letter){
                this.add.text(row1[j].x,row1[j].y,letter,{fontSize:'36px',fill:'#4B4B4B'});
                if(!this.isVowel(letter))gameOptions.score += gameOptions.scoreMultiplier;
            }
         }
         for(var j = row2.length-1;j>=0;j--){
                    
            if(row2[j].letter.toUpperCase() == letter){
                this.add.text(row2[j].x,row2[j].y,letter,{fontSize:'36px',fill:'#4B4B4B'});
                if(!this.isVowel(letter))gameOptions.score += gameOptions.scoreMultiplier;
            }
         }
         for(var j = row3.length-1;j>=0;j--){
                    
            if(row3[j].letter.toUpperCase() == letter){
                this.add.text(row3[j].x,row3[j].y,letter,{fontSize:'36px',fill:'#4B4B4B'});
                if(!this.isVowel(letter))gameOptions.score += gameOptions.scoreMultiplier;
            }
         }
         for(var j = row4.length-1;j>=0;j--){
                    
            if(row4[j].letter.toUpperCase() == letter){
                this.add.text(row4[j].x,row4[j].y,letter,{fontSize:'36px',fill:'#4B4B4B'});
                if(!this.isVowel(letter))gameOptions.score += gameOptions.scoreMultiplier;
            }
         }
    }
    update(){
        for(var i = consonantButtons.length-1;i>=0;i--){
            if(!gameOptions.canSelect){
                consonantButtons[i].alpha = .25;
            }else consonantButtons[i].alpha = 1;
        }
        
        for(var i = vowelButtons.length-1;i>=0;i--){
            if(!gameOptions.buyingVowel){
                vowelButtons[i].alpha = .25;
            }else vowelButtons[i].alpha = 1;
        }
     }

     isVowel(letter){
         return (letter == "A"||letter == "E"||letter == "I"||letter == "O"||letter == "U")
     }
}