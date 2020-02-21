var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var clicks = 0;
var renderedScene = 0;
var advancedTexture;
var img;
var turntableFrames = [];
var hotspotPanel;
var hotspotImage;
var hotspotTitleGUI;
var hotspotDescriptionGUI;
var hotspotExitButton;
var showHotspot = false;
var music;
var frameHotspots = [
    [{//Frame 0
        title: "A Hotspot",
        description: "These hotspots are placed in various areas and hold information about the vehicle.",
        imagePath: "",
        x: "-.75%",
        y: 0,
        callback: function () { showHotspotDetails(this); },
        image: null
    }],//End Frame 0
    [{//Frame 1
        title: "A Hotspot",
        description: "These hotspots are placed in various areas and hold information about the vehicle.",
        imagePath: "",
        x: "-5%",
        y: 0,
        callback: function () { showHotspotDetails(this); },
        image: null
    }],//End Frame 1
    [{//Frame 2
        title: "A Hotspot",
        description: "These hotspots are placed in various areas and hold information about the vehicle.",
        imagePath: "",
        x: "-8%",
        y: 0,
        callback: function () { showHotspotDetails(this); },
        image: null
    }],//
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
];
var hotspotButtons = [];
var interiorHotspots = [{
    title: "Audio Clips",
    description: "Audio clips can be used as well. This is done using WebAudio. Unfortunately if you're using Internet Explorer, you won't be able to hear it, as it does not support WebAudio. If you'd like to hear the audio, please use Firefox, Chrome or Safari.",
    imagePath: "",
    x: -105,
    y: -40,
    z: 100,
    callback: function () {
        showHotspotDetails(this);
        music.play();
    },
    image: null
}];
var frame = 0;



var createInterior = function () {
    //create new scene space
    var scene = new BABYLON.Scene(engine);
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    //add a camera and attach it to the canvas
    var cam = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 4, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), scene);
    cam.attachControl(canvas, true);

    //add some lights
    var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);

    //add and manipulate meshes in scene
    var environment = new BABYLON.PhotoDome('BoltEV', './src/img/boltEV.jpg', {}, scene);

    for (let i = 0; i < interiorHotspots.length; i++) {
        var sphere = BABYLON.Mesh.CreateSphere("sphere" + i, 16, 0.1, scene);
        sphere.position.x = interiorHotspots[i].x;
        sphere.position.y = interiorHotspots[i].y;
        sphere.position.z = interiorHotspots[i].z;
        interiorHotspots[i].image = new BABYLON.GUI.Image("hotspotIcon", 'src/img/1x/hotspot.png');
        let hotspot = BABYLON.GUI.Button.CreateHotspotButton("hotSpot" + i, "", interiorHotspots[i].image);
        advancedTexture.addControl(hotspot);
        hotspot.linkWithMesh(sphere);
        hotspot.width = "32px";
        hotspot.height = "32px";
        hotspot.thickness = 0;
        hotspot.onPointerDownObservable.add(function () {

            interiorHotspots[i].callback();
        });
    }

    music = new BABYLON.Sound("Music", "src/snd/voice00.mp3", scene);
    return scene;
}
/************ END OF CREATE INTERIOR FUNCTION ***************/

var createExterior = function () {
    var scene = new BABYLON.Scene(engine);
    hotspotTitleGUI = new BABYLON.GUI.TextBlock();
    hotspotPanel = new BABYLON.GUI.Rectangle();
    hotspotDescriptionGUI = new BABYLON.GUI.TextBlock();
    for (var i = 0; i < 59; i++) {
        if (i < 9) turntableFrames[i] = new BABYLON.GUI.Image("img", "src/img/turnaround/BOLT_New_00" + (i + 1) + ".jpg");
        else turntableFrames[i] = new BABYLON.GUI.Image("img", "src/img/turnaround/BOLT_New_0" + (i + 1) + ".jpg");
        turntableFrames[i].stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
        //turntableFrames[i].width = '100%';
        //turntableFrames[i].height = '56.25%';
        console.log(turntableFrames[i].width);

        for (var j = 0; j < frameHotspots[i].length; j++) {
            frameHotspots[i][j].image = new BABYLON.GUI.Image("hotspotIcon", 'src/img/1x/hotspot.png');
        }
    }

    img = turntableFrames[frame];

    scene.clearColor = new BABYLON.Color3(.84, .84, .84);
    //add a camera and attach it to the canvas
    var cam = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), scene);
    //cam.attachControl(canvas, true);

    //add some lights
    var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);

    //add and manipulate meshes in scene
    // var environment = new BABYLON.PhotoDome('BoltEV', './src/img/boltEV.jpg', {}, scene);


    //createGUI(scene, renderedScene);

    return scene;
}
/************ END OF CREATE EXTERIOR FUNCTION ***************/

var createGUI = function (scene, renderedScene) {

    switch (renderedScene) {
        case 1:
            advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene0);
            break;
        case 0:
            advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene1);

            img = turntableFrames[frame];


            advancedTexture.addControl(img);
            for (var j = 0; j < frameHotspots[frame].length; j++) {
                var hotspot = BABYLON.GUI.Button.CreateHotspotButton("hotSpot" + frame + "_" + j, "", frameHotspots[frame][j].image);
                hotspot.image = hotspotImage;

                hotspot.spot = frameHotspots[frame][j];
                //console.log(hotspot.spot);
                hotspot.top = frameHotspots[frame][j].y;
                hotspot.left = frameHotspots[frame][j].x;
                hotspot.width = "32px";
                hotspot.height = "32px";
                hotspot.thickness = 0;
                // hotspot.color = "white";
                // hotspot.background = "green";
                hotspotButtons[j] = hotspot;
                advancedTexture.addControl(hotspot);
            }
            for (let i = 0; i < hotspotButtons.length; i++) {
                hotspotButtons[i].onPointerDownObservable.add(function () {
                    // console.log(hotspotButtons[i].image);
                    hotspotButtons[i].spot.callback();
                });
            }

            break;
    }
    var button = BABYLON.GUI.Button.CreateSimpleButton('button', (renderedScene == 0) ? "Interior" : "Exterior");
    button.width = 0.2;
    button.height = "40px";
    button.color = "white";
    button.background = "green";
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP

    hotspotExitButton = BABYLON.GUI.Button.CreateSimpleButton('button', 'close');
    hotspotExitButton.width = 0.2;
    hotspotExitButton.height = "40px";
    hotspotExitButton.color = "white";
    hotspotExitButton.background = "green";
    hotspotExitButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    hotspotExitButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT

    hotspotExitButton.onPointerDownObservable.add(function () {
        showHotspot = false;
        if (music != null) music.stop();
    });


    hotspotPanel.width = "80%";
    hotspotPanel.height = "80%";
    hotspotPanel.cornerRadius = 5;
    hotspotPanel.background = "grey";


    hotspotTitleGUI.textWrapping = true;
    hotspotTitleGUI.color = "white";
    hotspotTitleGUI.width = "95%";
    hotspotTitleGUI.height = "95%";
    hotspotTitleGUI.fontSize = 36;
    hotspotTitleGUI.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    hotspotTitleGUI.textHorizontalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_LEFT


    hotspotDescriptionGUI.textWrapping = true;
    hotspotDescriptionGUI.color = "white";
    hotspotDescriptionGUI.width = "95%";
    hotspotDescriptionGUI.height = "75%";
    //hotspotDescriptionGUI.top = "-25%";
    hotspotDescriptionGUI.fontSize = 24;
    hotspotDescriptionGUI.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
    hotspotDescriptionGUI.textHorizontalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_LEFT
    hotspotPanel.addControl(hotspotTitleGUI);
    hotspotPanel.addControl(hotspotDescriptionGUI);
    hotspotPanel.addControl(hotspotExitButton);

    advancedTexture.addControl(button);

    if (showHotspot) advancedTexture.addControl(hotspotPanel);



    button.onPointerDownObservable.add(function () {
        clicks++;
        console.log("button clicked");
    });
}

var scene0 = createInterior();//call the scene create function
var scene1 = createExterior();
createGUI(scene1, renderedScene);

//register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    if (renderedScene != (clicks % 2)) renderedScene = clicks % 2;
    switch (renderedScene) {
        case 0:
            advancedTexture.dispose();
            createGUI(scene1, renderedScene);
            scene1.render();
            break
        case 1:
            advancedTexture.dispose();
            createGUI(scene0, renderedScene);
            scene0.render();
            break
    }
});

//watch for browser/canvas resize events
window.addEventListener('resize', function () {
    engine.resize();
    scene1 = createExterior();
});


var isMouseDown = false;
var mouseXOnDown = 0;
var mouseX = 0;
var startFrame = 0;
//Event Listener Callbacks
function onMouseDown(event) {
    event.preventDefault();

    mouseXOnDown = scene1.pointerX;
    mouseX = mouseXOnDown;
    isMouseDown = true;
    document.addEventListener('pointerup', onMouseUp, false);

}

function onMouseUp(event) {
    isMouseDown = false;
    document.removeEventListener('pointerup', onMouseUp, false);
    startFrame = frame;

}

function onMouseMove(event) {
    if (renderedScene == 1) return;
    mouseX = scene1.pointerX;
    if (isMouseDown) {

        changeImg(mouseXOnDown - mouseX);
        //else changeImg(mouseX - mouseXOnDown);
    }
}

function changeImg(imageNumber) {

    hotspotButtons.length = 0;//clear buttons array;

    imageNumber = Math.floor(imageNumber / 8);
    console.log(imageNumber);
    if (imageNumber < -58) {
        imageNumber = 0;
        mouseXOnDown = scene1.pointerX;
    }
    else if (imageNumber > 58) {
        imageNumber = 0;
        mouseXOnDown = scene1.pointerX;
    }
    frame = startFrame + (imageNumber);
    if (frame < 0) {
        frame += 58;
        //mouseXOnDown = scene1.pointerX;
    }
    if (frame > 58) frame -= 58;
    img = turntableFrames[frame];
    //advancedTexture.dispose();
    //createGUI(scene1, renderedScene);
}

function showHotspotDetails(hotspot) {
    console.log(hotspot.description)
    hotspotDescriptionGUI.text = hotspot.description;
    hotspotTitleGUI.text = hotspot.title;

    showHotspot = true;
}

window.addEventListener('pointerdown', onMouseDown, false);
window.addEventListener('pointermove', onMouseMove, false);
