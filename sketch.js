//Create variables here
var dog;
var happyDog;
var db;
var foodS;
var foodStock;
var gameState = 0;
var bedroomImg;
var gardenImg;
var bathroomImg;

function preload(){
  //load images here
  dogImage = loadImage("Dog.png");
  dog1Image = loadImage("happydog.png");
  bathroomImg = loadImage("Wash Room.png");
  bedroomImg = loadImage("Bed Room.png");
  gardenImg = loadImage("Garden.png");
}

function setup() {
  createCanvas(500, 500);
  var dog = createSprite(250,250);
  dog.addImage( dogImage)
  db = firebase.database()
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value",function data(){
   gameState = data.val();
  });
}


function draw() {  
backGround(46,139,87);

display(foodStock);

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed = data.val();
});

text("foodstock:" + foodStock,150,100);
textSize(50);
fill(red);
stroke();

text("NOTE: Press UP_ARROW KEY to feed Drago Milk!",150,150);
textSize(50);
fill(blue);
stroke();

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage("happydog.png");
}

if(lastFed>=12){
text("lastFeed:" + lastFed%12 + "PM",350,30);
}
else if(lastFed==0){
text("lastFeed:12 AM",350,30)
}
else{
text("lastFeed:" + lastFed + "AM",350,30);
}

currentTime = hour();

if(currentTime==(lastFed+1)){
update("playing");
foodObj.garden();
}

else if(currentTime==(lastFed+2)){
update("sleeping");
foodObj.bedroom();
}

else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
update("bathing");
foodObj.bathroom();
}
else{
update("Hungry");
foodObj.display();
}

if(gameState!=="Hungry"){
feed.hide();
addFood.hide();
dog.remove();
}
else{
feed.show();
addFood.show();
dog.addImage(sadDog);
}

  drawSprites();
  //add styles here
} 

function redStock(data){
   foodS = data.val();
}

function writeStock(x){
   
  if(x<=0){
    x=0;
  }
 else{
   x=x-1;
 }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage = (happydog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
database.ref('/').update({
  gameState:State
})
}