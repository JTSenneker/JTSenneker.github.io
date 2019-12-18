var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    //create new scene space
    var scene = new BABYLON.Scene(engine);

    //add a camera and attach it to the canvas
    var cam = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), scene);
    cam.attachControl(canvas, true);

    //add some lights
    var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);

    //add and manipulate meshes in scene
    var environment = new BABYLON.PhotoDome('BoltEV', './src/img/boltEV.jpg', {}, scene);
    return scene;
}
/************ END OF CREATE SCENE FUNCTION ***************/
var scene = createScene();//call the scene create function

//register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

//watch for browser/canvas resize events
window.addEventListener('resize', function () {
    engine.resize();
});
