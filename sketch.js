var cloud, cloudimage, cloud1, cloudimage1, cloudgroup;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4;
var obstacle5, obstacle6, obstaclegroup;
var gameOver,restart,gameOverImg;
var jumpSound,dieSound,checkPointSound;
var score;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
score = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  cloudimage1 = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png"); 
  gameOverImg = loadImage("gameOver.png");
jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {

  createCanvas(600, 200)

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
            
  //create a ground sprite ha[]
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  //creating invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  //generate random numbers
  var rand = Math.round(random(1, 100))
  //console.log(rand) 

  trex.setCollider("circle", 0, 0, 40);
 // trex.debug = true;

  gameOver = createSprite(300,100); 
  gameOver.addImage(gameOverImg);
  restart = createSprite(300,140); 
  restart.addImage(restartImg); 
  gameOver.scale = 0.5;
  restart.scale = 0.4;
  cloudgroup = new Group();
  cloudgroup1 = new Group();
  obstaclegroup = new Group();
}

function draw() {
  //set background color
  background(180,45,88);
  //console.log(trex.y)






  //stop trex from falling down
  trex.collide(invisibleGround);

  text("Score: " + score, 500, 50);


  if (gamestate === PLAY) {
    ground.velocityX = -4;
    gameOver.visible=false;
    restart.visible=false;
    // jump when the space key is pressed
    if (keyDown("space") && trex.y >= 130) {
      trex.velocityY = -10;
      jumpSound.play();
    }
    ground.velocityX = -(4 + 1.5* score/500);
    trex.velocityY = trex.velocityY + 0.6

    if (ground.x < 0) {

      ground.x = ground.width / 2;

    }

    score = score + Math.round(frameCount / 300);
    
    if (obstaclegroup.isTouching(trex) ) {
      //trex.velocityY = -10;
      //jumpSound.play();
      gamestate = END;
    console.log("gamestate")
     dieSound.play();
    }
    spawnClouds();
    spawnobstacle();
    
   if(score>0 && score%100 === 0)   {
     checkPointSound.play() 
   }
  }

  if (gamestate === END) {
    trex.changeAnimation("collided", trex_collided);
    ground.velocityX = 0;
     
    gameOver.visible=true;
    restart.visible=true;
    
    obstaclegroup.setLifetimeEach(-1);     
    cloudgroup.setLifetimeEach(-1 );
    cloudgroup1.setLifetimeEach(-1);
    
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    cloudgroup1.setVelocityXEach(0); 

    
    if(mousePressedOver(restart)) { 
      reset();
      }
  }



 // reset();
  drawSprites();
}

//function to spawn the clouds
function spawnClouds() {
  // write your code here 

  if (frameCount % 90 === 0) {
    cloud = createSprite(600, 80, 40, 20);
    cloud.addImage(cloudimage);
    cloud.velocityX = -2;
    cloud.y = Math.round(random(10, 90));
    cloud.scale = 0.8;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 300;
    cloudgroup.add(cloud);
  }


  if (frameCount % 110 === 0) {
    cloud1 = createSprite(600, 80, 40, 20);
    cloud1.addImage(cloudimage1);
    cloud1.velocityX = -2;
    cloud1.y = Math.round(random(0, 90));
    cloud1.scale = 0.4;
    cloud1.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud1.lifetime = 300;
    cloudgroup1.add(cloud1);
  }

}


function spawnobstacle() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 170, 20, 80);
    //obstacle.velocityX = -4;
    obstacle.velocityX = -(4 + 1.5* score/500);  
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    var rand = Math.round(random(1, 6));
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;

    }
    obstaclegroup.add(obstacle);
  }

}

function reset(){
  
  gamestate=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;
  
  score=0;
  trex.changeAnimation("running", trex_running);


  obstaclegroup.destroyEach();
  cloudgroup1.destroyEach();
  cloudgroup.destroyEach();
}