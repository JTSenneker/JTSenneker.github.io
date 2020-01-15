BABYLON.GUI.Button.CreateHotspotButton = function (name, text, image) {
    var result = new BABYLON.GUI.Button(name);

    //Adding image
    var iconImage = image;
    iconImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    result.addControl(iconImage);
    return result;
};