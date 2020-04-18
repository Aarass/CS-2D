class Players
{
  constructor()
  {
    this.arr = [];
  }
  add(obj)
  {
      this.arr.push(obj);
  }
  update(obs)
  {
    for(let i = 0; i < this.arr.length; i++)
      this.arr[i].update(this, obs);
  }
}
