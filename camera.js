class Camera
{
  constructor(pos)
  {
    this.pos = createVector(pos.x, pos.y);
    this.calculateVertices();
  }

  follow(pos)
  {
    const r = playerRadius/2;
    if(pos.x - r < this.x1)
    {
      const left = pos.x - r;
      this.moveX(left - this.x1);
    }
    else if(pos.x + r > this.x2)
    {
      const right = pos.x + r;
      this.moveX(right - this.x2);
    }
    if(pos.y - r < this.y1)
    {
      const top = pos.y - r;
      this.moveY(top - this.y1);
    }
    else if(pos.y + r > this.y2)
    {
      const bottom = pos.y + r;
      this.moveY(bottom - this.y2);
    }
      translate(width/2-this.pos.x, (height/2)-this.pos.y);
  }
  moveX(amount)
  {
    this.pos.x = this.pos.x + amount;
    this.calculateVertices();
  }
  moveY(amount)
  {
    this.pos.y = this.pos.y + amount;
    this.calculateVertices();
  }
  calculateVertices()
  {
    this.x1 = this.pos.x - 100;
    this.y1 = this.pos.y - 75;
    this.x2 = this.pos.x + 100;
    this.y2 = this.pos.y + 75;
  }
  debug()
  {
    line(this.x1, this.y1, this.x2, this.y1);
    line(this.x1, this.y1, this.x1, this.y2);
    line(this.x2, this.y2, this.x2, this.y1);
    line(this.x2, this.y2, this.x1, this.y2);
  }
}
