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

var Scene2 =
  /*#__PURE__*/
  function (_Phaser$Scene) {
    _inherits(Scene2, _Phaser$Scene);

    function Scene2(handle, parent) {
      var _this;

      _classCallCheck(this, Scene2);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene2).call(this, handle));
      _this.WIDTH = 700;
      _this.HEIGHT = 600;
      _this.parent = parent;
      _this.handle = handle;
      return _this;
    }

    _createClass(Scene2, [{
      key: "create",
      value: function create() {
        this.cameras.main.setViewport(this.parent.x, this.parent.y, this.WIDTH, this.HEIGHT);
        var startDegrees = -90;
        var graphics = this.make.graphics({
          x: 0,
          y: 0,
          add: false
        }); //container to group wheel and text

        this.wheelContainer = this.add.container(config.width / 2, config.height / 2);

        for (var i = 0; i < gameOptions.slices.length; i++) {
          var startColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].startColor);
          var endColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].endColor);

          for (var j = gameOptions.slices[i].rings; j >= 0; j--) {
            //setup the ring colors
            var ringColor = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, gameOptions.slices[i].rings, j); //convert that color to a string for the fillstyle

            var ringColorString = Phaser.Display.Color.RGBToString(Math.round(ringColor.r), Math.round(ringColor.g), Math.round(ringColor.b), 0, "0x");
            graphics.fillStyle(ringColorString, 1); //draw that shit

            graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, j * gameOptions.wheelRadius / gameOptions.slices[i].rings, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false); //fill that shit

            graphics.fillPath();
          } //get that lineStyle


          graphics.lineStyle(gameOptions.strokeWidth, gameOptions.strokeColor, 1); // drawing the biggest slice

          graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false); // stroking the slice

          graphics.strokePath();
          var prizeText = this.add.text(0, 0, gameOptions.slices[i].text);
          prizeText.setOrigin(.5);
          prizeText.setAlign('center');
          prizeText.rotation = Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2 + 90);
          prizeText.x = Math.cos(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)) * 200;
          prizeText.y = Math.sin(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)) * 200;
          this.wheelContainer.add(prizeText);
          startDegrees += gameOptions.slices[i].degrees;
        }

        graphics.generateTexture("wheel", (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2, (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2);
        var wheel = this.add.sprite(0, 0, "wheel");
        this.wheelContainer.add(wheel);
        this.wheelContainer.sendToBack(wheel);
        this.canSpin = true;
        this.input.on('pointerdown', this.spinWheel, this);
        console.log("0.0.3");
      }
    }, {
      key: "spinWheel",
      value: function spinWheel() {
        if (this.canSpin && gameOptions.canSpin) {
          var rounds = Phaser.Math.Between(gameOptions.wheelRounds.min, gameOptions.wheelRounds.max);
          var degrees = Phaser.Math.Between(0, 360);
          var backDegrees = Phaser.Math.Between(gameOptions.backSpin.min, gameOptions.backSpin.max);
          var prizeDegree = 0;

          for (var i = gameOptions.slices.length - 1; i >= 0; i--) {
            prizeDegree += gameOptions.slices[i].degrees;

            if (prizeDegree >= degrees - backDegrees) {
              gameOptions.scoreMultiplier = gameOptions.slices[i].score;
              break;
            }
          }

          this.canSpin = false;
          gameOptions.canSpin = false;
          gameOptions.isSpinning = true; //tween that animation for the spin

          this.tweens.add({
            //add the wheel container
            targets: [this.wheelContainer],
            //angle destination
            angle: 360 * rounds + degrees,
            //tween duration
            duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max),
            //ease that tween
            ease: "Cubic.easeOut",
            //callback scope
            callbackScope: this,
            //execute this when tween is done
            onComplete: function onComplete(tween) {
              //this tween goes backwards
              this.tweens.add({
                targets: [this.wheelContainer],
                angle: this.wheelContainer.angle - backDegrees,
                duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max),
                ease: "Cubic.easeIn",
                callbackScope: this,
                onComplete: function onComplete(tween) {
                  this.canSpin = true;
                  gameOptions.isSpinning = false;
                }
              });
            }
          });
        }
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
      }
    }, {
      key: "setTextOrientationVertical",
      value: function setTextOrientationVertical(text) {
        for (var i = 0; i < text.length; i++) {
          console.log(text[i]);
          text = text.substr(0, i) + "\n" + text.substr(i);
        }

        return text;
      }
    }]);

    return Scene2;
  }(Phaser.Scene);