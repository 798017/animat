function Orbiter(mover, orbiterRad, orbitRad, angle, angleVel, clr){
  this.mover = mover;
  this.radius = orbiterRad;
  this.rotator = new JSVector(orbitRad, 0);
  this.rotator.setDirection(angle);
  this.location = JSVector.addGetNew(this.mover.location, this.rotator);
  this.angleVel = angleVel;
  this.clr = clr;
}

Orbiter.prototype.update = function(){
  this.rotator.rotate(this.angleVel);
  this.location = JSVector.addGetNew(this.mover.location, this.rotator);
}

Orbiter.prototype.render = function(){
  let context1 = game.context1;

  context1.strokeStyle = this.clr;
  context1.fillStyle = this.clr;
  context1.lineWidth = 1;
  context1.beginPath();
  context1.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
  context1.stroke();
  context1.fill();


  context1.lineCap = "round";
  context1.lineWidth = 6;
  context1.beginPath();
  context1.moveTo(this.mover.location.x, this.mover.location.y);
  context1.lineTo(this.location.x, this.location.y);
  context1.stroke();
}
