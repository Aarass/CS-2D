class T
{
  constructor()
  {
    this.pos = createVector(tSpawn.x, tSpawn.y);
    this.dir = createVector(random(-1, 1), random(-1, 1));
    this.hitbox = new Circle(this.pos.x, this.pos.y, playerRadius);
    this.isAlive = true;
    this.health = 100;
    this.type = "t"
    this.speed = playerNormalSpeed;
    this.seen = [];
  }
  update(group, obs)
  {
    this.moveRandomly(10, obs);
    this.show();
  }
  show()
  {
    imageMode(CENTER);
    if(this.isAlive)
    {
      if(this.dir.x > 0)
        image(tModel[(floor(frameCount/4) % 8) + 18], this.pos.x, this.pos.y);
      else if(this.dir.x < 0)
        image(tModel[(floor(frameCount/4) % 8) + 8], this.pos.x, this.pos.y);
      else if(this.dir.y < 0)
        image(tModel[(floor(frameCount/4) % 8) + 1], this.pos.x, this.pos.y);
      else if(this.dir.y > 0)
        image(tModel[(floor(frameCount/4) % 8) + 28], this.pos.x, this.pos.y);
      else
        image(tModel[0], this.pos.x, this.pos.y);
    }
    else
    {
      image(ctModel[36], this.pos.x, this.pos.y);
    }
  }
  //SHOTING
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  shoot(x, y)
  {
    //sortSeen();
    const ray = {
      shape: "ray",
      a: createVector(this.pox.x, this.pox.y),
      b: createVector(this.pos.x + x, this.pos.y + y)
    }
    for(let i = 0; i < this.seen.length; i++)
    {
      if(this.seen[i].isAlive && this.seen[i].type == "t")
      {
        if(collide(ray, this.seen[i].hitbox))
        {
          this.seen[i].takeDamage(50);
          break;
        }
      }
    }
  }
  //LOOKING
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  look(group, obs)
  {
    this.seen = [];
    const ray = {shape : "line", a:{  x: this.pos.x, y: this.pos.y}}
    loop1:
    for(let i = 0; i < group.arr.length; i++)
    {
      ray.b = (group.arr[i].pos.copy().sub(this.pos)).add(this.pos);
      for(let i = 0; i < obs.arr.length; i++)
        if(collide(ray, obs.arr[i]))
          continue loop1;
      this.seen.push(group.arr[i]);
    }
  }
  //MOVING
  //----------------------------------------------------------------
  moveRandomly(speed, obs)
  {
    this.pos.add(this.dir.setMag(speed));
    this.moveHitbox();
    if(this.collides(obs))
    {
      this.pos.sub(this.dir.setMag(speed));
      this.moveHitbox();
      this.dir = createVector(random(-1, 1), random(-1, 1)).setMag(speed);
    }
  }
  goUp(speed, obs)
  {
    this.moveUp(speed);
    if(this.collides(obs))
    {
      if(!this.tryLeft(speed, obs))
        if(!this.tryRight(speed, obs))
          this.undoUp(speed);
    }
  }
  goDown(speed, obs)
  {
    this.moveDown(speed);
    if(this.collides(obs))
    {
      if(!this.tryLeft(speed, obs))
        if(!this.tryRight(speed, obs))
          this.undoDown(speed);
    }
  }
  goRight(speed, obs)
  {
    this.moveRight(speed);
    if(this.collides(obs))
    {
      if(!this.tryUp(speed, obs))
        if(!this.tryDown(speed, obs))
          this.undoRight(speed);
    }
  }
  goLeft(speed, obs)
  {
    this.moveLeft(speed);
    if(this.collides(obs))
    {
      if(!this.tryUp(speed, obs))
        if(!this.tryDown(speed, obs))
          this.undoLeft(speed);
    }
  }
  tryUp(speed, obs)
  {
    this.moveUp();
    if(this.collides(obs))
    {
      this.undoUp();
      return false;
    }
    return true;
  }
  tryDown(speed, obs)
  {
    this.moveDown();
    if(this.collides(obs))
    {
      this.undoDown();
      return false;
    }
    return true;
  }
  tryLeft(speed, obs)
  {
    this.moveLeft();
    if(this.collides(obs))
    {
      this.undoLeft();
      return false;
    }
    return true;
  }
  tryRight(speed, obs)
  {
    this.moveRight();
    if(this.collides(obs))
    {
      this.undoRight();
      return false;
    }
    return true;
  }
  moveUp(speed)
  {
    this.pos.add(createVector(0, -1).setMag(speed));
    this.moveHitbox();
  }
  moveDown(speed)
  {
    this.pos.add(createVector(0, 1).setMag(speed));
    this.moveHitbox();
  }
  moveLeft(speed)
  {
    this.pos.add(createVector(-1, 0).setMag(speed));
    this.moveHitbox();
  }
  moveRight(speed)
  {
    this.pos.add(createVector(1, 0).setMag(speed));
    this.moveHitbox();
  }
  undoUp(speed)
  {
    this.pos.sub(createVector(0, -1).setMag(speed));
    this.moveHitbox();
  }
  undoDown(speed)
  {
    this.pos.sub(createVector(0, 1).setMag(speed));
    this.moveHitbox();
  }
  undoLeft(speed)
  {
    this.pos.sub(createVector(-1, 0).setMag(speed));
    this.moveHitbox();
  }
  undoRight(speed)
  {
    this.pos.sub(createVector(1, 0).setMag(speed));
    this.moveHitbox();
  }
  takeDamage(amount)
  {
    this.health -= amount;
    startAimation();
    if(this.health <= 0)
    {
      this.isAlive = false;
      return true;
    } else return false;
  }
  collides(obs)
  {
    for(let i = 0; i < obs.arr.length; i++)
    {
      if(collide(this.hitbox, obs.arr[i]))
        return true;
    }
    return false;
  }
  moveHitbox()
  {
    this.hitbox.pos = this.pos.copy();
  }
  sortSeen()
  {
    for(let i = 0; i < this.seen.length-1; i++)
    {
      for(let j = i+1; j < this.seen.length; j++)
      {
        if(dist(this.pos.x, this.pos.y, this.seen[i].pos.x, this.seen[i].pos.y) >
          dist(this.pos.x, this.pos.y, this.seen[j].pos.x, this.seen[j].pos.y) )
        {
            let temp = this.seen[i];
            this.seen[i] = this.seen[j];
            this.seen[j] = temp;
        }
      }
    }
  }
}
