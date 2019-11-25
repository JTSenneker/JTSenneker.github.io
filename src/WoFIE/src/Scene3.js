"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scene3 =
    /*#__PURE__*/
    function (_Phaser$Scene) {
        _inherits(Scene3, _Phaser$Scene);

        function Scene3(handle, parent) {
            var _this;

            _classCallCheck(this, Scene3);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene3).call(this, handle));
            _this.handle = handle;
            _this.parent = parent;
            _this.WIDTH = 800;
            _this.HEIGHT = 600;
            return _this;
        }

        _createClass(Scene3, [{
            key: "create",
            value: function create() {
                this.cameras.main.setViewport(this.parent.x, this.parent.y, this.WIDTH, this.HEIGHT);
                this.setupPuzzle(puzzles[0]);
                this.setupButtons();
            }
        }, {
            key: "refresh",
            value: function refresh() {
                this.cameras.main.setPosition(this.parent.x, this.parent.y);
                this.scene.bringToTop();
            }
        }, {
            key: "setupPuzzle",
            value: function setupPuzzle(puzzle) {
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
                    this.anims.create({
                        key: 'noLetter',
                        frames: [{
                            key: 'wordTile',
                            frame: 0
                        }],
                        frameRate: 20
                    });
                    this.anims.create({
                        key: 'letter',
                        frames: [{
                            key: 'wordTile',
                            frame: 1
                        }],
                        frameRate: 20
                    });
                }

                for (var i = 0; i < 14; i++) {
                    if (i > puzzle.row1.length - 1) break;
                    if (puzzle.row1[i] == " ") continue;
                    row1[i].anims.play('letter');
                    row1[i].letter = puzzle.row1[i];
                }

                for (var i = 0; i < 14; i++) {
                    if (i > puzzle.row2.length - 1) break;
                    if (puzzle.row2[i] == " ") continue;
                    row2[i].anims.play('letter');
                    row2[i].letter = puzzle.row2[i];
                }

                for (var i = 0; i < 14; i++) {
                    if (i > puzzle.row3.length - 1) break;
                    if (puzzle.row3[i] == " ") continue;
                    row3[i].anims.play('letter');
                    row3[i].letter = puzzle.row3[i];
                }

                for (var i = 0; i < 14; i++) {
                    if (i > puzzle.row4.length - 1) break;
                    if (puzzle.row4[i] == " ") continue;
                    row4[i].anims.play('letter');
                    row4[i].letter = puzzle.row4[i];
                }
            }
        }, {
            key: "setupButtons",
            value: function setupButtons() {
                for (var i = 21; i >= 0; i--) {
                    var button = this.add.text(i * 24, 300, consonants[i], {
                        fontSize: '24px',
                        fill: '#FFF'
                    });
                    consonantButtons[i] = button;
                }

                for (var i = 5; i >= 0; i--) {
                    var button = this.add.text(i * 24, 324, vowels[i], {
                        fontSize: '24px',
                        fill: '#FFF'
                    });
                    vowelButtons[i] = button;
                }

                for (var i = consonantButtons.length - 1; i >= 0; i--) {
                    var scene = this;
                    consonantButtons[i].setInteractive();
                    consonantButtons[i].on('pointerup', function () {
                        if (!gameOptions.canSelect) return;
                        console.log(this.text);
                        scene.CheckLetter(this.text);
                        this.text = " ";
                        gameOptions.canSelect = false;
                    });
                }

                for (var i = vowelButtons.length - 1; i >= 0; i--) {
                    var scene = this;
                    vowelButtons[i].setInteractive();
                    vowelButtons[i].on('pointerup', function () {
                        if (!gameOptions.buyingVowel) return;
                        scene.CheckLetter(this.text);
                        this.text = " ";
                        gameOptions.score -= 250;
                        gameOptions.canSelect = false;
                        gameOptions.buyingVowel = false;
                    });
                }
            }
        }, {
            key: "CheckLetter",
            value: function CheckLetter(letter) {
                for (var j = row1.length - 1; j >= 0; j--) {
                    if (row1[j].letter.toUpperCase() == letter) {
                        this.add.text(row1[j].x, row1[j].y, letter, {
                            fontSize: '36px',
                            fill: '#4B4B4B'
                        });
                        if (!this.isVowel(letter)) gameOptions.score += gameOptions.scoreMultiplier;
                    }
                }

                for (var j = row2.length - 1; j >= 0; j--) {
                    if (row2[j].letter.toUpperCase() == letter) {
                        this.add.text(row2[j].x, row2[j].y, letter, {
                            fontSize: '36px',
                            fill: '#4B4B4B'
                        });
                        if (!this.isVowel(letter)) gameOptions.score += gameOptions.scoreMultiplier;
                    }
                }

                for (var j = row3.length - 1; j >= 0; j--) {
                    if (row3[j].letter.toUpperCase() == letter) {
                        this.add.text(row3[j].x, row3[j].y, letter, {
                            fontSize: '36px',
                            fill: '#4B4B4B'
                        });
                        if (!this.isVowel(letter)) gameOptions.score += gameOptions.scoreMultiplier;
                    }
                }

                for (var j = row4.length - 1; j >= 0; j--) {
                    if (row4[j].letter.toUpperCase() == letter) {
                        this.add.text(row4[j].x, row4[j].y, letter, {
                            fontSize: '36px',
                            fill: '#4B4B4B'
                        });
                        if (!this.isVowel(letter)) gameOptions.score += gameOptions.scoreMultiplier;
                    }
                }
            }
        }, {
            key: "update",
            value: function update() {
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
            }
        }, {
            key: "isVowel",
            value: function isVowel(letter) {
                return letter == "A" || letter == "E" || letter == "I" || letter == "O" || letter == "U";
            }
        }]);

        return Scene3;
    }(Phaser.Scene);