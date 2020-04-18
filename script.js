let population;
let player;
let index = 0;
let cam;
let mapGraphics;
let mapHitboxes;
let ui;
let isScreenLocked = false;
let ctModel = [];
let tModel = [];
let mX = 0;
let mY = 0;
let sensitivity = 1;
function preload()
{
  mapGraphics = loadImage("Assets/map.png");
  for(let i = 0 ; i < 37; i++)
    ctModel.push(loadImage("Assets/Animation/ct/tile" + i + ".png"));
  for(let i = 0 ; i < 37; i++)
    tModel.push(loadImage("Assets/Animation/t/tile" + i + ".png"));
}
function setup()
{
  //frameRate(60);
  createCanvas(1280, 720);
  population = new Players();
  population.add(new Player("ct", true));
  population.add(new Player("ct", false));
  population.add(new Player("ct", false));
  population.add(new Player("t", false));
  population.add(new Player("t", false));
  population.add(new Player("t", false));
  cam = new Camera(population.arr[index].pos);
  mapHitboxes = new Obstacles("de_dust2x2");
  player = population.arr[index];
  cameraTarget = player;
}
function draw()
{
  background(200, 129, 82);

  push();
  cam.follow(cameraTarget.pos);
  image(mapGraphics, 0, 0);
  population.update(mapHitboxes);
  cameraTarget.showSeen();
  pointer();
  pop();
  textSize(56);
  fill(255);
  textAlign(RIGHT, TOP);
  text("FPS: " + floor(frameRate()), width, 0);
  textAlign(RIGHT, CENTER);
  text(player.killCount, width, height/2);
  textAlign(RIGHT, BOTTOM);
  text(player.health, width, height);

}
function pointer()
{
  if(isScreenLocked)
  {
    const xDifr = cam.pos.x - player.pos.x;
    const yDifr = cam.pos.y - player.pos.y;
    if(mX + movedX * sensitivity < width/2 + xDifr && mX + movedX * sensitivity > -width/2 + xDifr)
      mX += movedX * sensitivity;
    if(mY + movedY * sensitivity < height/2 + yDifr && mY + movedY * sensitivity > -height/2 + yDifr)
      mY += movedY * sensitivity;
  }
  strokeWeight(1);
  stroke(255);
  noFill();
  ellipse(player.pos.x + mX, player.pos.y + mY, 16, 16);
}
function mousePressed()
{
  if(!isScreenLocked)
    requestPointerLock();
  else if(player.isAlive)
    player.fire(mX, mY);
}
function keyPressed()
{
  if(key == 'a' || key == 'A' || keyCode === LEFT_ARROW)
    player.left = true;
  if(key == 'd' || key == 'D' || keyCode === RIGHT_ARROW)
    player.right = true;
  if(key == 'w' || key == 'W' || keyCode === UP_ARROW)
    player.up = true;
  if(key == 's' || key == 'S' || keyCode === DOWN_ARROW)
    player.down = true;
}
function keyReleased()
{
  if(key == 'a' || key == 'A' || keyCode === LEFT_ARROW)
    player.left = false;
  if(key == 'd' || key == 'D' || keyCode === RIGHT_ARROW)
    player.right = false;
  if(key == 'w' || key == 'W' || keyCode === UP_ARROW)
    player.up = false;
  if(key == 's' || key == 'S' || keyCode === DOWN_ARROW)
    player.down = false;
}

document.addEventListener('pointerlockchange', toggle);
document.addEventListener('mozpointerlockchange', toggle);
function toggle()
{
  isScreenLocked = !isScreenLocked;
}
