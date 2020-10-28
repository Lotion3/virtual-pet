//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImage,happyDogImage
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(250,350,10,10)
  dog.addImage(dogImage)
  dog.scale=0.3
  foodStock=database.ref('food');
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87)
  drawSprites();
  textSize(20)
  fill("white")
  stroke(strokeWeight=0.1)
  text("Press up arrow to feed Timmy",120,50)
  text("Food Remaining : "+foodS,150,100)
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage)
    if(foodS>0){
    foodS=foodS-1
    }else{
      foodS=foodS
      dog.addImage(dogImage)
    }
  }

}

function readStock(data){
  foodS=data.val()
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}
