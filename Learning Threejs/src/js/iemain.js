//"use strict";

var video = document.getElementById("video");
var mousePrevDown = false;
var isMouseDown = false;
var mouseXOnDown = 0;
var mouseYOnDown = 0;
var targetXRotOnDown = 0;
var targetYRotOnDown = 0;
var targetXRot = Math.PI;
var targetYRot = 0;
var finalYRot = 0;
var textureLoader = new THREE.TextureLoader();
var hotspots = [];
var map = textureLoader.load("src/img/boltEV.jpg");
var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
cam.position.z = 0;
cam.rotation.order = "YXZ";
var rend = new THREE.WebGLRenderer({
    antialias: true
});
rend.setClearColor("#4b4b4b");
rend.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(rend.domElement);
window.addEventListener("resize", function () {
    rend.setSize(window.innerWidth, window.innerHeight);
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
});
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var light = new THREE.PointLight(0xffffff, 1, 5000);
light.position.set(0, 0, 0);
scene.add(light);
makeVideoPlane();
var invertSphere;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("./src/models/sphere.mtl", function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("./src/models/sphere.obj", function (object) {
        object.traverse(function (node) {
            if (node.isMesh)
                node.material = new THREE.MeshBasicMaterial({
                    map: map
                });
        });
        object.scale.x = 15;
        object.scale.z = 15;
        object.scale.y = 15;
        object.name = "bill";
        scene.add(object);
    });
});
var hotspot1 = spawnSimpleGeo();
scene.add(hotspot1);
hotspot1.position.z = 10;
hotspot1.position.x = 9.5;
hotspot1.position.y = -4;
hotspot1.name = "tom";
hotspot1.tag = "Clickable";
hotspot1.mouseOver = false;
hotspots[0] = hotspot1;

var render = function render() {
    requestAnimationFrame(render);
    rotateCam();
    updateHotspots();
    rend.render(scene, cam);
};

function onMouseClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, cam);
    var intersects = raycaster.intersectObjects(hotspots, true);

    for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object.tag == "Clickable") {
            console.log(intersects[i].object.tag);
            video.play();
        }
    }
}

function onMouseDown(event) {
    event.preventDefault();
    isMouseDown = true;
    document.addEventListener("mouseup", onMouseUp, false);
    document.addEventListener("mouseout", onMouseOut, false);
    mouseXOnDown = (event.clientX / window.innerWidth) * 2 - 1;
    targetXRotOnDown = targetXRot;
    mouseYOnDown = -(event.clientY / window.innerHeight) * 2 + 1;
    targetYRotOnDown = targetYRot;
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (isMouseDown) {
        targetXRot = targetXRotOnDown + (mouse.x - mouseXOnDown) * 2.5;
        targetYRot = targetYRotOnDown - (mouse.y - mouseYOnDown) * 2.5;
    }
}

function onMouseUp(event) {
    isMouseDown = false;
    document.removeEventListener("mouseup", onMouseUp, false);
    document.removeEventListener("mouseout", onMouseOut, false);
}

function onMouseOut(event) {
    isMouseDown = false;
    document.removeEventListener("mouseup", onMouseUp, false);
    document.removeEventListener("mouseout", onMouseOut, false);
}

function rotateCam() {
    cam.rotation.y += (targetXRot - cam.rotation.y) * 0.1;
    finalYRot = targetYRot - cam.rotation.x;

    if (cam.rotation.x <= 1 && cam.rotation.x >= -1) {
        cam.rotation.x += finalYRot * 0.1;
    }

    if (cam.rotation.x > 1) {
        cam.rotation.x = 1;
    } else if (cam.rotation.x < -1) {
        cam.rotation.x = -1;
    }
}

function spawnSimpleGeo() {
    var material = new THREE.MeshBasicMaterial({
        color: 0xaaaaff
    });
    var geometry = new THREE.SphereGeometry(0.25, 64, 64);
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function updateHotspots() {
    for (var i = 0; i < hotspots.length; i++) {
        hotspots[i].mouseOver = false;
    }

    raycaster.setFromCamera(mouse, cam);
    var intersects = raycaster.intersectObjects(hotspots, true);

    for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.mouseOver = true;
    }

    for (var i = 0; i < hotspots.length; i++) {
        if (hotspots[i].mouseOver) {
            this.tl = new TimelineMax();
            this.tl.to(hotspots[i].scale, 1, {
                x: 2,
                y: 2,
                z: 2,
                ease: Expo.easeOut
            });
        } else {
            this.tl = new TimelineMax();
            this.tl.to(hotspots[i].scale, 1, {
                x: 1,
                y: 1,
                z: 1,
                ease: Expo.easeOut
            });
        }
    }
}

function makeVideoPlane() {
    var vidTexture = new THREE.VideoTexture(video);
    vidTexture.minFilter = THREE.LinearFilter;
    vidTexture.magFilter = THREE.LinearFilter;
    vidTexture.format = THREE.RGBFormat;
    var vidGeo = new THREE.PlaneGeometry(8.88, 5, 1, 1);
    var vidMat = new THREE.MeshBasicMaterial({
        map: vidTexture,
        side: THREE.DoubleSide
    });
    var vidPlane = new THREE.Mesh(vidGeo, vidMat);
    vidPlane.position.z = 18;
    vidPlane.position.y = -5.5;
    vidPlane.position.x = 1.5;
    vidPlane.rotation.y = Math.PI;
    vidPlane.rotation.x = Math.PI / 6; //video.play();

    scene.add(vidPlane);
    console.log(video);
}

render();
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onMouseClick);
