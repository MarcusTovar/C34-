var gameball;
var database;
var pos;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    gameball = createSprite(250,250,10,10);
    gameball.shapeColor = "red";

    var gameballPosition = database.ref('ball/position')
    gameballPosition.on("value",readposition,showErrors)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function readposition(data){

    pos = data.val();
    gameball.x = pos.x;
    gameball.y = pos.y;
}

function showErrors(){

console.log("There is an error happening");

}

function changePosition(x,y){
   database.ref('ball/position').set(
       {
           'x' : gameball.x + x, 
           'y' : gameball.y + y
       }
   )
}
