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

var Scene1 =
  /*#__PURE__*/
  function (_Phaser$Scene) {
    _inherits(Scene1, _Phaser$Scene);

    function Scene1() {
      var _this;

      _classCallCheck(this, Scene1);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene1).call(this, "bootGame"));
      _this.count = 0;
      _this.scene2 = null;
      return _this;
    }

    _createClass(Scene1, [{
      key: "preload",
      value: function preload() {
        this.load.image("background", "src/WoFIE/src/assets/images/Board.png");
        this.load.image("playButton", "src/WoFIE/src/assets/images/Play Button.png");
        this.load.image("spinButton", "src/WoFIE/src/assets/images/SpinButton.png");
        this.load.image("vowelButton", "src/WoFIE/src/assets/images/VowelButton.png");
        this.load.image("solveButton", "src/WoFIE/src/assets/images/SolveButton.png");
        this.load.image("scoreUI", "src/WoFIE/src/assets/images/ScoreUI.png");
        this.load.spritesheet("wordTile", 'src/WoFIE/src/assets/images/wordTile.png', {
          frameWidth: 32,
          frameHeight: 64
        });
      }
    }, {
      key: "create",
      value: function create() {
        //this.scoreContainer.x = 400;
        this.add.text(20, 20, "Loading game..."); //this.cameras.main.setViewport(0,0,800,600);

        this.scene2 = this.createWindow(Scene2, 800, 0);
        this.scene3 = this.createWindow(Scene3, 0, 0);
        this.spinButton = this.scene3.add.image(600, 450, 'spinButton');
        this.vowelButton = this.scene3.add.image(670, 480, 'vowelButton');
        this.solveButton = this.scene3.add.image(740, 450, 'solveButton');
        this.vowelButton.setInteractive();
        this.solveButton.setInteractive();
        this.spinButton.setInteractive();
        this.scoreContainer = this.add.container(0, 0);
        this.scoreUI = this.add.image(0, 0, 'scoreUI').setOrigin(0);
        this.score = this.add.text(34, 48, "$100", {
          fontSize: '12px',
          fill: '#FFF'
        });
        this.scoreContainer.add([this.scoreUI, this.score]);
        this.scoreContainer.x = 550;
        this.scoreContainer.y = 0;
        var scene = this;
        this.spinButton.on('pointerup', function () {
          if (!gameOptions.atWheel && !gameOptions.canSelect) {
            gameOptions.buyingVowel = false;
            gameOptions.canSelect = false;
            scene.switchToWheel();
          }
        });
        this.vowelButton.on('pointerup', function () {
          if (!gameOptions.atWheel) {
            gameOptions.buyingVowel = true;
          }
        });
        this.input.on('pointerdown', function () {
          if (gameOptions.atWheel && !gameOptions.isSpinning) {
            this.scene.switchToBoard();
          }
        });
        gameOptions.camTarget = {
          x: 0,
          y: 0
        };
      }
    }, {
      key: "createWindow",
      value: function createWindow(func, x, y) {
        var handle = 'window' + this.count++;
        var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setOrigin(0.5);
        var demo = new func(handle, win);
        this.scene.add(handle, demo, true);
        return demo;
      }
    }, {
      key: "update",
      value: function update() {
        //this.cameras.main.centerOn(gameOptions.camTarget.x,gameOptions.camTarget.y);
        this.scene2.refresh();
        this.scene3.refresh();
        this.score.text = "$" + gameOptions.score;
      }
    }, {
      key: "switchToWheel",
      value: function switchToWheel() {
        this.tweens.add({
          targets: [this.scene3.parent],
          x: -800,
          druation: 5,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function onComplete(tween) {
            this.tweens.add({
              targets: [this.scene2.parent],
              x: 0,
              druation: 5,
              ease: "Cubic.easeOut",
              callbackScope: this,
              onComplete: function onComplete(tween) {
                gameOptions.canSpin = true;
                gameOptions.atWheel = true;
              }
            });
          }
        });
      }
    }, {
      key: "switchToBoard",
      value: function switchToBoard() {
        this.tweens.add({
          targets: [this.scene2.parent],
          x: 800,
          druation: 5,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function onComplete(tween) {
            this.tweens.add({
              targets: [this.scene3.parent],
              x: 0,
              druation: 5,
              ease: "Cubic.easeOut",
              callbackScope: this,
              onComplete: function onComplete(tween) {
                gameOptions.canSelect = true;
                gameOptions.atWheel = false;
              }
            });
          }
        });
      }
    }]);

    return Scene1;
  }(Phaser.Scene);