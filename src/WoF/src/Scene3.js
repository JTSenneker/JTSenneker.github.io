class Scene3 extends Phaser.Scene {


    constructor(handle, parent) {
        super(handle);
        this.handle = handle;
        this.parent = parent;
        this.WIDTH = 800;
        this.HEIGHT = 600;
        this.puzzleBoxes = [];
    }
    create() {
        this.cameras.main.setViewport(this.parent.x, this.parent.y, this.WIDTH, this.HEIGHT);
        this.setupPuzzle(puzzles[0]);
        this.setupButtons();
    }
    refresh() {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
    }
    setupPuzzle(puzzle) {
        category = puzzle.category;
        for (var i = 0; i < 14; i++) {
            row1[i] = this.add.sprite(i * 32, 0, 'wordTile').setOrigin(0, 0);
            row2[i] = this.add.sprite(i * 32, 64, 'wordTile').setOrigin(0, 0);
            row3[i] = this.add.sprite(i * 32, 128, 'wordTile').setOrigin(0, 0);
            row4[i] = this.add.sprite(i * 32, 192, 'wordTile').setOrigin(0, 0);
            row1[i].letter = " ";
            row2[i].letter = " ";
            row3[i].letter = " ";
            row4[i].letter = " ";
            row1[i].resolved = false;
            row2[i].resolved = false;
            row3[i].resolved = false;
            row4[i].resolved = false;
            this.anims.create({
                key: 'noLetter',
                frames: [{ key: 'wordTile', frame: 0 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'letter',
                frames: [{ key: 'wordTile', frame: 1 }],
                frameRate: 20
            });
        }
        for (var i = 0; i < 14; i++) {

            if (i > puzzle.row1.length - 1) break;
            if (puzzle.row1[i] == " ") {
                row1[i].resolved = true;
                continue;
            }
            row1[i].anims.play('letter');
            row1[i].letter = puzzle.row1[i];
            this.puzzleBoxes.push(row1[i]);

        }
        for (var i = 0; i < 14; i++) {

            if (i > puzzle.row2.length - 1) break;
            if (puzzle.row2[i] == " ") {
                row2[i].resolved = true;
                continue;
            }
            row2[i].anims.play('letter');
            row2[i].letter = puzzle.row2[i];
            this.puzzleBoxes.push(row2[i]);
        }
        for (var i = 0; i < 14; i++) {

            if (i > puzzle.row3.length - 1) break;
            if (puzzle.row3[i] == " ") {
                row3[i].resolved = true;
                continue;
            }
            row3[i].anims.play('letter');
            row3[i].letter = puzzle.row3[i];
            this.puzzleBoxes.push(row3[i]);
        }
        for (var i = 0; i < 14; i++) {

            if (i > puzzle.row4.length - 1) break;
            if (puzzle.row4[i] == " ") {
                row4[i].resolved = true;
                continue;
            }
            row4[i].anims.play('letter');
            row4[i].letter = puzzle.row4[i];
            this.puzzleBoxes.push(row4[i]);
        }
        this.currentLetter = this.puzzleBoxes[0];
    }

    setupButtons() {
        for (var i = 21; i >= 0; i--) {
            var button = this.add.text(i * 24, 300, consonants[i], { fontSize: '24px', fill: '#FFF' });
            consonantButtons[i] = button;
        }
        for (var i = 5; i >= 0; i--) {
            var button = this.add.text(i * 24, 324, vowels[i], { fontSize: '24px', fill: '#FFF' });
            vowelButtons[i] = button;
        }

        for (var i = consonantButtons.length - 1; i >= 0; i--) {
            var scene = this;

            consonantButtons[i].setInteractive();
            consonantButtons[i].on('pointerup', function () {
                if (!gameOptions.canSelect && !gameOptions.solving) return;
                var letter = this.text;
                if (!gameOptions.solving) this.text = " ";
                scene.CheckLetter(letter);
                gameOptions.canSelect = false;
            });
        }

        for (var i = vowelButtons.length - 1; i >= 0; i--) {

            var scene = this;

            vowelButtons[i].setInteractive();
            vowelButtons[i].on('pointerup', function () {
                if (!gameOptions.buyingVowel && !gameOptions.solving) return;
                var letter = this.text;
                if (!gameOptions.solving) this.text = " ";
                if (!gameOptions.solving) gameOptions.score -= 250;
                scene.CheckLetter(letter);
                gameOptions.canSelect = false;
                gameOptions.buyingVowel = false;
            });
        }
    }

    CheckLetter(letter) {
        if (!gameOptions.solving) {
            for (var j = this.puzzleBoxes.length - 1; j >= 0; j--) {

                if (this.puzzleBoxes[j].resolved) continue;

                if (this.puzzleBoxes[j].letter.toUpperCase() == letter) {
                    this.add.text(this.puzzleBoxes[j].x, this.puzzleBoxes[j].y, letter, { fontSize: '36px', fill: '#4B4B4B' });
                    if (!this.isVowel(letter)) gameOptions.score += gameOptions.scoreMultiplier;
                    this.puzzleBoxes[j].resolved = true;
                }
            }
        } else {
            if (this.currentLetter.letter.toUpperCase() == letter) {
                this.add.text(this.currentLetter.x, this.currentLetter.y, letter, { fontSize: '36px', fill: '#4B4B4B' });
                this.currentLetter.resolved = true;
            } else {
                gameOptions.solving = false;
            }
        }
    }
    update() {
        this.currentLetter.tint = 0xffffff;
        for (var i = 0; i < this.puzzleBoxes.length; i++) {
            this.puzzleBoxes[i].tint = 0xffffff;
            if (!this.puzzleBoxes[i].resolved) {
                gameOptions.solved = false;
                break;
            }
        }
        gameOptions.solved = true;
        for (var i = consonantButtons.length - 1; i >= 0; i--) {
            if (!gameOptions.canSelect) {
                consonantButtons[i].alpha = .25;
            } else consonantButtons[i].alpha = 1;
        }

        for (var i = vowelButtons.length - 1; i >= 0; i--) {
            if (!gameOptions.buyingVowel) {
                vowelButtons[i].alpha = .25;
            } else vowelButtons[i].alpha = 1;
        }
        if (gameOptions.solving) {
            for (var i = consonantButtons.length - 1; i >= 0; i--) {
                consonantButtons[i].alpha = 1;
            }

            for (var i = vowelButtons.length - 1; i >= 0; i--) {
                vowelButtons[i].alpha = 1;
            }
            for (var i = 0; i < this.puzzleBoxes.length; i++) {
                this.puzzleBoxes[i].tint = 0xffffff;

                if (!this.puzzleBoxes[i].resolved) {
                    this.currentLetter = this.puzzleBoxes[i];
                    this.currentLetter.tint = 0x0000ff;
                    gameOptions.solved = false;
                    break;
                }
            }
        }
    }
    isVowel(letter) {
        return (letter == "A" || letter == "E" || letter == "I" || letter == "O" || letter == "U")
    }

}