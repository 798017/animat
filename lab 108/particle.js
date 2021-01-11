function Particle(x, y, dx, dy, rad, clr){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0,0);
  this.rad = rad;
  this.clr = clr;
  this.lifeSpan = 350;
  this.isDead = false;
}


Particle.prototype.run = function(){
  this.update();
  this.render();

}

Particle.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(3);
  this.loc.add(this.vel);
  this.lifeSpan--
  if(this.lifeSpan == 0){
    this.isDead = true;
  }
}

Particle.prototype.render = function(){
  let context1 = game.context1;

  context1.strokeStyle = 'rgba(255, 255, 255, .5)';
  context1.fillStyle = this.clr;
  context1.beginPath();
  context1.arc(this.loc.x, this.loc.y, this.rad, Math.PI*2, 0, false);
  context1.stroke();
  context1.fill();
}
