var Bee;
var BeeImg;
var CookieImg, VenenoImg, VenenoGroup, CookieGroup;
var score = 0;
var gameState = "Play"
var Button1,Button1Img
function preload(){
  BeeImg = loadImage("Bee.png")
  CookieImg = loadImage("Cookie.png")
  VenenoImg = loadImage("Veneno.png")
  Button1Img = loadImage("RestartButton.png")
} 
function setup() {
  createCanvas(800,400);
  Bee = createSprite(600,200);
  Bee.addImage(BeeImg)
  Bee.scale = 0.5
  Bee.debug = true
  Bee.setCollider("rectangle",20,1,200,120)
  CookieGroup = createGroup();
  VenenoGroup = createGroup();
  Button1 = createSprite(400,250)
  Button1.addImage(Button1Img)
  Button1.scale = 0.3
  Button1.visible = false
}

function draw() {
  background(255);  
  if(gameState === "Play"){
    if(keyDown(UP_ARROW)){
      Bee.position.y = Bee.position.y - 5
    }
    if(keyDown(DOWN_ARROW)){
      Bee.position.y = Bee.position.y + 5
    }
    if(Bee.collide(CookieGroup)){
      CookieGroup.destroyEach();
      score += 1
      console.log(score)
    }
    if(Bee.collide(VenenoGroup)){
      gameState = "gameOver"
    }
    SpawnCookies();
    SpawnObstacles();
  }
  if(gameState === "gameOver"){
    if(mousePressedOver(Button1)){
      reset();
    }
    Button1.visible = true
  }
  textSize(50)
  text(score+" Puntos",400,50)
  Bee.position.x = 600
  drawSprites();
}

function SpawnCookies(){
  if(frameCount %100 == 0){
   var Cookie = createSprite(1,Math.round(random(1,400)))
   Cookie.addImage(CookieImg)
   Cookie.scale = 0.1
   Cookie.velocityX = 5
   CookieGroup.add(Cookie)
  }
}
  function SpawnObstacles(){
    if(frameCount %110 == 0){
     var Veneno = createSprite(1,Math.round(random(1,400)))
     Veneno.addImage(VenenoImg)
     Veneno.scale = 0.01
     Veneno.velocityX = 5
     VenenoGroup.add(Veneno)
    }
}
function reset(){
  window.location.reload();
}
