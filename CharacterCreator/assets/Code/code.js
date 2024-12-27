var currentTab = 0;
var BodyType = "0";
var Height = "0";
var Hairstyle = "0";
var HairColor = "0";
var Face = "0";
var Skin = "0";
var Eye = "0";
var Vocation = "ARM";
var CharName = "Name"

var CharacterCode = "";

var Gender = "M";

showTab(currentTab);
generateCharacterCode();
generateIcons();

function showTab(n){
    //this will show the specified tab of the form
    var x = document.getElementsByClassName("tab");
   for(let item of x){
    item.style.display = "none";
   }
    x[n].style.display = "block";
    if(n==0){
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("charForm").submit();
        return false;
      }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }
  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
  }

  function SetBodyType(n){
    BodyType = n.toString();
    if(n==0)Gender = "M";
    else Gender = "F";
    generateCharacterCode();
    changeIcons();
    var x = document.getElementsByClassName("BdyTypeBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
  }

  function SetHairstyle(n){
    Hairstyle = n.toString();
    generateCharacterCode();
    var x = document.getElementsByClassName("HairBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
  }

  function SetHairColour(n){
    HairColor = n.toString();
    generateCharacterCode();
    var x = document.getElementsByClassName("HCBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
  }

  function SetFace(n){
    Face = n.toString();
    generateCharacterCode();
    var x = document.getElementsByClassName("FaceBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
  }

  function SetSkin(n){
    Skin = n.toString();
    generateCharacterCode();
    var x = document.getElementsByClassName("SkinBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
  }

  function SetEye(n){
    Eye = n.toString();
    generateCharacterCode();
    var x = document.getElementsByClassName("EyeBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
  }

  function SetVoc(n){
   if (n == 0) Vocation = "ARM";
   if (n == 1) Vocation = "GLD";
   if (n == 2) Vocation = "LMN";
   if (n == 3) Vocation = "MGE";
   if (n == 4) Vocation = "MRT";
   if (n == 5) Vocation = "MIN";
   if (n == 6) Vocation = "PLD";
   if (n == 7) Vocation = "PRI";
   if (n == 8) Vocation = "RNG";
   if (n == 9) Vocation = "SGE";
   if (n == 10) Vocation = "THF";
   if (n == 11) Vocation = "WAR";
  generateCharacterCode();
  var x = document.getElementsByClassName("VocBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
}
  function SetHeight(n){
    Height = n;
    generateCharacterCode();
    var x = document.getElementsByClassName("HeightBtn");
    for(item of x){
        item.style.borderStyle="none";
    }
    x[n].style.borderStyle="solid";
  }

 
  function generateCharacterCode(){
    CharacterCode = BodyType.toString()+Height.toString()+Hairstyle.toString()+HairColor.toString()+Face.toString()+Skin.toString()+Eye.toString()+Vocation.toString();
    var x = document.getElementById("CharacterCode");
    x.innerHTML=CharacterCode;
  }

  function changeIcons(){
    var heights = document.getElementsByClassName("HeightBtn");
    var hairs = document.getElementsByClassName("HairBtn");
    var faces = document.getElementsByClassName("FaceBtn");
    var btnPath = "assets/Images/"+Gender+"/";
    for(item of heights){
        item.style.background = "url("+btnPath+"Body/"+item.id+".png)";
        item.style.backgroundSize = "cover";
    }
    for(item of hairs){
        item.style.background = "url("+btnPath+"Hair/"+item.id+".png)";
        item.style.backgroundSize = "cover";
    }
    for(item of faces){
        item.style.background = "url("+btnPath+"Face/"+item.id+".png)";
        item.style.backgroundSize = "cover";
    }
  }

  function generateIcons(){
    var HCPath = "assets/Images/Color/Hair/";
    var EyePath = "assets/Images/Color/Eye/";
    var SkinPath = "assets/Images/Color/Skin/";

    var HairColors = document.getElementsByClassName("HCBtn");
    for(item of HairColors){
        item.style.background = "url("+HCPath+item.id+".png)";
        item.style.backgroundSize = "cover";
    }

    var EyeColors = document.getElementsByClassName("EyeBtn");
    for(item of EyeColors){
        item.style.background = "url("+EyePath+item.id+".png)";
        item.style.backgroundSize = "cover";
    }

    var SkinColors = document.getElementsByClassName("SkinBtn");
    for(item of SkinColors){
        item.style.background = "url("+SkinPath+item.id+".png)";
        item.style.backgroundSize = "cover";
    }
    changeIcons();


  }