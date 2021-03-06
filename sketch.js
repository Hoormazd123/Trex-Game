var Trex,ground,ground2,ground3, cloud, cactus1, score=0, gamestate="play", Cgroup, group,Gameover,Restart, Highscore=0;


function preload(){
 Trex10=loadAnimation("trex1.png") 
  ground10=loadAnimation("ground2.png")
  cloud10=loadAnimation("cloud.png")
  cactus10=loadAnimation("obstacle1.png")
  cactus20=loadAnimation("obstacle2.png")
   cactus30=loadAnimation("obstacle3.png")
   cactus40=loadAnimation("obstacle4.png")
   cactus50=loadAnimation("obstacle5.png")
   cactus60=loadAnimation("obstacle6.png")
  
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkPoint=loadSound("checkPoint.mp3")
  restart=loadImage("restart.png")
  gameover=loadImage("gameOver.png")
}
  
function setup() {
  createCanvas(800, 200);
  Trex=createSprite(50,165,20,20);
  Trex.addAnimation("T",Trex10)
  Trex.scale=0.5
  Trex.debug=false
  Trex.setCollider("rectangle", 0, 0, 40, 100, 30)
  //Trex.setCollider("circle",5,0,50)
  ground=createSprite(200,195,800,10)
  ground.addAnimation("G",ground10);
   ground.velocityX=-5;
  ground2=createSprite(200,203,400,10)
  ground2.visible=false
  ground3=createSprite(1350,195,800,10);
  ground3.velocityX=-5
  ground3.addAnimation("G3",ground10);
 group=new Group();
  Cgroup=new Group();
  Gameover=createSprite(400,100)
  Gameover.scale=0.7;
  Restart=createSprite(400,150)
  Restart.scale=0.5
  Gameover.addImage(gameover)
  Restart.addImage(restart)
  
}


function draw() {
  background("white");
  if(gamestate=="play"){
    
  
    if(ground.x<-1350){
    ground.x=1350
  } //end of ground
  
  if(ground3.x<-1350){
    ground3.x=1350
    
  }//end of ground 3
     
  if(keyDown("SPACE")&& Trex.y>160.5){
     Trex.velocityY=-10
    jump.play()
     }
  Trex.velocityY=Trex.velocityY+0.5
  Trex.collide(ground2)
  
  if(frameCount % 60 == 0){
     cloud=createSprite(850,40);
    cloud.velocityX=-7
   cloud.y=Math.round(random(20,60))
      cloud.addAnimation("C",cloud10);
    cloud.depth=0.5
    cloud.lifetime=250
    Cgroup.add(cloud)
     } // end of clouds
    
    if(frameCount % 100 == 0){
   cactus1=createSprite(900,170);
   cactus1.velocityX=-5
   cactus1.lifetime=250
  generator=Math.round(random(1,6))
  switch(generator){
    case 1:cactus1.addAnimation("CC",cactus10); break;
    case 2:cactus1.addAnimation("CC2",cactus20);break;
    case 3:cactus1.addAnimation("CC3",cactus30);break;
    case 4:cactus1.addAnimation("CC4",cactus40);break;
    case 5:cactus1.addAnimation("CC5",cactus50);break;
    case 6:cactus1.addAnimation("CC6",cactus60);break;
    default:break;
  }
      
    cactus1.scale=0.8
  group.add(cactus1);
  
    
    }//end of if
    if(Trex.isTouching(group)){
      gamestate="end";
      die.play()
    }
    score=score+1

    Restart.visible=false
    Gameover.visible=false
    
    } // end of gamestate PLAY
  
    if(gamestate=="end"){
    
     ground.velocityX=0
    ground2.velocityX=0
        ground3.velocityX=0
    group.setVelocityXEach(0)
      
      group.setLifetimeEach(-1);
      Cgroup.setLifetimeEach(-1);
      
      
      Trex.velocityY=0;
      Cgroup.setVelocityXEach(0);
     
      Restart.visible=true
      Gameover.visible=true
      
      if(mousePressedOver(Restart)){
        rt();
        ground.velocityX=-5;
        ground3.velocityX=-5;
      }
      
  }//end of gamestate end
  
  
  if(score%100==0){
    checkPoint.play()
    ground.velocityX=ground.velocityX+-2
    ground3.velocityX=ground3.velocityX+-2
    group.setVelocityXEach(ground.velocityX)
   // console.log(ground3.velocityX)
  }

  if(score > Highscore){
    
    Highscore=score
    
  }
  fill("red")
  text(Highscore,5,25)
  noFill();
  fill("grey")
  text(score,5,15)
  drawSprites()
}



function rt(){
  
  gamestate="play"
        Cgroup.destroyEach()
        group.destroyEach()
        score=0;

  
}


