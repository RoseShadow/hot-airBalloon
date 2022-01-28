var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg;
var restart,gameOverImg;

var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3

var gameOver, gameOverImg
var restart, restartImg
var score = 0;

var gameState = PLAY;


function preload(){
bgImg = loadImage("assets/Background.png")

balloonImg = loadAnimation("assets/41a18e025cbf3f0448e728be3c212736.png");

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/bird.png")
obsTop3 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")



}

function setup(){

  createCanvas(windowWidth,windowHeight);

//background image
bg = createSprite(windowWidth/2,windowHeight/2,1,1);
bg.addImage(bgImg);
bg.scale = 4.8

//creating top and bottom grounds
//bottomGround = createSprite(windowWidth/2,windowHeight/2,2000,20);
//bottomGround.visible = true;

//topGround = createSprite(windowWidth/2,windowHeight/2,2000,20);
//topGround.visible = true;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.3;

gameOver = createSprite(windowWidth/2,windowHeight/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;

restart = createSprite(windowWidth/2,windowHeight/2-200);
restart.addImage(restartImg);
restart.scale = 0.5;


bottomObstaclesGroup= new Group();
topObstaclesGroup= new Group()

}

function draw() {
  
  background("black");

  if(gameState === PLAY){
        
 //making the hot air balloon jump
    if(keyDown("space")) {
    balloon.velocityY = -6 ;
            
    }

 //adding gravity
   balloon.velocityY = balloon.velocityY + 2;
   
   if (balloon.isTouching(topObstaclesGroup)){
     gameState=END;
   }
   if (balloon.isTouching(bottomObstaclesGroup)){
    gameState=END;
  }

  spawnObstaclesTop();
  spawnObstaclesBottom();
  drawSprites();

  }      
  
  else if (gameState === END) {

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
    }

  }
}

function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(1800,100,40,50);
    
    obstacleTop.scale = 0.1
    obstacleTop.velocityX = -4;

    obstacleTop.y = Math.round(random(10,100));
    var rand = Math.round(random(1,2));
      switch(rand) {
       case 1: obstacleTop.addImage(obsTop1);
              break;
       case 2: obstacleTop.addImage(obsTop2);
               obstacleTop.scale=0.2;
              break;
        case 3: obstacleTop.addImage(obsTop3);
              break;
       default: break;
      }
    obstacleTop.lifetime = 1000;
    balloon.depth = balloon.depth + 1;

    topObstaclesGroup.add(obstacleTop);
   
      }
}

function spawnObstaclesBottom() 
{
      if(World.frameCount % 60 === 0) {
        obstacleBottom = createSprite(1800,650,40,50);
    
    obstacleBottom.addImage(obsBottom1);
    obstacleBottom.debug=false;

    
    obstacleBottom.scale = 0.3;
    obstacleBottom.velocityX = -4;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleBottom.lifetime = 1000;
    
   balloon.depth = balloon.depth + 1;

   bottomObstaclesGroup.add(obstacleBottom);
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}

function reset(){
  gameState=PLAY;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score=0;
}
