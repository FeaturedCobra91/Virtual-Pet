//Create variables here
var dog, happyDog;
var dogImg, dogImg2;
var foodS, foodStock;
var database;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS)
     dog.addImage(dogImg2);
  }

  textSize(20);
  fill("orange");
  stroke("orange");
  text("Food Remaining : " + foodS, 20, 20);
  text("Note: Press Up Arrow to feed Drago Milk...", 50, 470); 

  if(foodS===undefined){
    textSize(25);
    text("Loading..........",170,70);
  }
  if(foodS===0){  
    foodS=20;
  }
  if(foodS%3 === 0){
    textSize(24);
    text("Wow! You really are a pet lover...",100,450);
  }
  

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<0){
    x=0;
  } else{
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}
