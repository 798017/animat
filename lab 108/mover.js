function Mover(x, y, dx, dy, radius, clr, numOrbs){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0, 0);
  this.radius = radius;
  this.orbitAngle = Math.random()*Math.PI;
  this.clr = clr;
  this.c = clr;
  this.orbiters = [];

  for(let i = 0; i<numOrbs; i++){
    let a = i*(Math.PI*2)/numOrbs + this.orbitAngle;
    let angleVel = numOrbs*.01;
    this.orbiters.push(new Orbiter(this, 4, 25, a, angleVel, this.clr));
  }
}canvas1
context1
Mover.prototype.run = function(){
  let part = game.ps.particles;
  for(let i = 0; i<part.length; i++){
    let d = this.location.distance(part[i].loc);
    let r = this.location.distance(game.ps.loc);
    if(d<10){
      this.clr = "rgba(255, 255, 255, 255)";

    }

    if(r >= 200 && this.clr == "rgba(255, 255, 255, 255)"){
      this.clr = this.c;
    }
  }

  this.checkEdges();
  this.update();
  this.render();

  for(let i = 0; i<this.orbiters.length; i++){
    let orb = this.orbiters[i];
    orb.update();
    orb.render();
  }
}

Mover.prototype.render = function(){
  let context1 = game.context1;
  let b = game.movers;

  context1.strokeStyle = "rgba(255, 255, 255, 255)";
  context1.fillStyle = this.clr;
  context1.beginPath();
  context1.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
  context1.stroke();
  context1.fill();
}



Mover.prototype.update = function(){
  //repulsion code
  // if(this !== game.vehicles[0]){
  //   let d = this.loc.distance(game.vehicles[0].loc);
  //   if(d < 50){
  //     this.acceleration = JSVector.subGetNew(this.loc, game.vehicles[0].loc);
  //     this.acceleration.normalize();
  //     this.acceleration.multiply(0.05);
  //   }
  // }
  // this.velocity.add(this.acceleration);
  // this.velocity.limit(game.slider2.value);
  // this.loc.add(this.velocity);
  let particles = game.ps;

  for(let i = 0; i < particles.length; i++){
    let d = this.loc.distance(particles[i].loc);
    if (d < 50){
      this.acceleration = JSVector.subGetNew(this.loc, particles[i].loc);
      this.acceleration.normalize();
      this.acceleration.multiply(0.05);
    }
  }

  if(!game.gamePaused){
    this.velocity.add(this.acceleration);
    this.velocity.limit(3);
    this.location.add(this.velocity);
  }
}

Mover.prototype.checkEdges = function(){
  let canvas1= game.canvas;
  if (this.location.x > canvas.width){
    this.location.x = 0;
  }

  else if (this.location.x < 0){
    this.location.x = canvas.width;
  }

  if (this.location.y > canvas.height){
    this.location.y = 0;
  }

  else if (this.location.y < 0){
    this.location.y = canvas.height;
  }
}
