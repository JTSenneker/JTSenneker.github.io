var game;
var config = {
    width: 493,
    height: 824,
    backgroundColor: 0xFFFFFF,
    scene: [HomeScreen, PersonalizeScreen, MyRewards, WelcomeScreen, LoginScreen, CreateAccount, Onstar]
}
var global = {
    email: "email@email.com",
    pass: "••••••••",
    code: "",
    name: "",
    alpha: .25,
    enteringEmail: true,
    enteringPass: false,
    shift: false
}
var letterIndex = 0;
var emailText = "email@email.com";
var passwordText = "••••••••";
window.onload = function () {
    game = new Phaser.Game(config);
}
function typeText(textObject, text, callback, args) {
    textObject.text += text[letterIndex];
    letterIndex++;
    if (letterIndex === text.length) {
        callback(args[0]);
        return;
    }
}