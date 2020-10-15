function Mover(x, y, dx, dy, rad, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.attract = new JSVector(0, 0);
  this.repulse = new JSVector(0, 0);
  this.rad = rad;
  this.clr = clr;
  this.isOverlapping = false;
}

Mover.prototype.run = function(){
  this.checkEdger();
  //this.checkOverlapping()
  this.update();
  this.render();
}

Mover.prototype.render = function(){
  let ctx = game.ctx;
  let b = game.movers;
  if(this == b[0]){
    ctx.strokeStyle = "rgba(13, 255, 30, 18)";
    ctx.fillStyle = "rgba(13, 255, 30, 18)";
  }
  else if(this == b[1]){
    ctx.strokeStyle = "rgba(15, 250, 24, 19)";
    ctx.fillStyle = "rgba(15, 250, 24, 19)";
  }
  else{
      ctx.strokeStyle = this.clr;
  }
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.rad, Math.PI*2, 0, false);
  ctx.stroke();
}

Mover.prototype.update = function(){
  let b = game.movers;
  if(this !== b[0]){
    let d = this.location.distance(b[0].location);
    if(d < 240){
      this.attract = JSVector.subGetNew(b[0].location, this.location);
      this.attract.normalize();
      this.attract.multiply(0.5);
    }
  }
  else if(this !== b[1]){
    let d = this.location.distance(b[0].location);
    if(d < 240){
      this.repulse = JSVector.subGetNew(this.location, b[1].location);
      this.repulse.normalize();
      this.repulse.multiply(0.5);
    }
  }
  if(!game.gamePaused){
    this.velocity.add(this.attract);
    this.velocity.add(this.repulse);
    this.velocity.limit(3);
    this.location.add(this.velocity);
  }
}

Mover.protoype.checkEdges = function(){
  let canvas = game.canvas;
  if(this.location.x > canvas.width) this.location.x = 0;
  if(this.location.x < 0) this.location.x = canvas.width;
  if(this.location.y < canvas.width) this.location.y = 0;
  if(this.location.x < 0) this.location.y = canvas.width;
}
