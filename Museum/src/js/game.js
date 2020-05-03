var game;
var config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 500,
    backgroundColor: 0x000000,
    preventDefault: true,
    plugins: {
        global: [ NineSlice.Plugin.DefaultCfg ],
      },
    scene: [Entrance, Theater, Awards,UI]
};
var bowtieFlags = [];
var roomsDetails = [{
    name: 'Entrance',
    visited: true,
    notes: 'You can refer to your brochure to see your progress'
},
{
    name: 'Theater',
    visited: false,
    notes: 'Chevrolet values include Dependability, Performance and Value'
},
{
    name: 'Racing',
    visited: false,
    notes: ''
},
{
    name: 'Advertising',
    visited: false,
    notes: ''
},
{
    name: 'Values',
    visited: false,
    notes: ''
},
{
    name: 'Key Vehicles',
    visited: false,
    notes: ''
},
];
var bowties = ['1913','1936','1955','1957','1960','1974','1977','1982','1985','1995','2004','2013'];
var globals = {
    dialogueIndex:0,
    inDialogue:false,
    room: 0,
    collisionAlpha: 0.25
}
var dialogues = {
    guideIntro:{
        image:"src/img/Objects/iStock-167604181_portrait.png",
        text: [
        "Steeped in a rich history and bold innovation, Chevrolet entered the automotive scene more than 100 years ago. A lot has happened since then. But the company’s founding principles of dependability, performance and value remain the same.",
        "Leveraging Chevrolet’s century of heritage and core principles are valuable sales tools. Sharing your enthusiasm and knowledge with customers reaffirms their purchase decision and creates a profound sense of pride and satisfaction in owning a Chevrolet vehicle. And they will share that emotion with others.",
        "This course guides you through an interactive museum environment. Explore movies and topics such as  awards, racing and ad campaigns. A brochure is provided to help you navigate. Click on each topic to learn how you can turn your customers into enthusiasts.",
        "Of course, no brand is complete without a logo. By successfully completing activities in each room, you will be able to earn 10 historic Chevrolet bowtie logos. Bowties will be hidden, so be sure to fully explore the different areas of the museum to complete your collection.",
        "You can view your brochure by clicking on the 'i' icon in the upper right corner of the screen."
    ]
}
}

window.onload = function () {
    game = new Phaser.Game(config);
}
function handleDialogue(dialogue){
    if(!globals.inDialogue){
        globals.dialogueIndex=0;
        globals.inDialogue = true;
        document.getElementById('dialogueText').innerHTML=dialogue.text[globals.dialogueIndex];
        document.getElementById('profileImage').src=dialogue.image;
        togglePopup('dialogue');
    }else if(globals.dialogueIndex < dialogue.text.length-1){
        globals.dialogueIndex++;
        document.getElementById('dialogueText').innerHTML=dialogue.text[globals.dialogueIndex];
        
    }else{
        togglePopup('dialogue');
        globals.inDialogue = false;
        return;
    }
}
