var balloon, database, position;
var balloonIMG, bgIMG;


function preload() {
  bgIMG = loadImage("images/background.png");
  balloonIMG = loadImage("images/HotAirBalloon1.png");
}


function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1200,600);

  balloon = createSprite(100, 200, 50, 50);
  balloon.addImage("images/HotAirBalloon1.png", balloonIMG);

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}


function draw() {
  background(bgIMG); 
   
  if (position !== undefined) {
    if(keyDown(LEFT_ARROW)){
      balloon.x = balloon.x - 10;
      writePosition(-10,0);
      
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x + 10;
      writePosition(+10,0);
    }
    else if(keyDown(UP_ARROW)){
      balloon.y = balloon.y - 10;
      writePosition(0,-10);
      balloon.scale=balloon.scale+0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.y = balloon.y + 10;
      writePosition(0,+10);
      balloon.scale=balloon.scale-0.01;
    }
  }

  textSize(16);
  stroke("lightgrey");
  fill("darkgrey")
  text("**Use arrow keys to move the hot air balloon**", 80, 50);
  drawSprites();
}


function writePosition(x,y) {
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError() {
  console.log("Error in writing to the database");
}