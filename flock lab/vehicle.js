function Vehicle(loc){
  this.loc = new JSVector(loc.x, loc.y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0,0);
  this.desiredSep = 20; //desired separation between vehicles
  this.neighborDist = 100;
  this.clr = "rgba(253, 253, 150, 1)";
  this.maxSpeed = game.slider2.value;
  this.maxForce = game.slider1.value;
}

Vehicle.prototype.run = function(vehicles){
  this.flock(vehicles);
  this.update();
  this.checkEdges();
  this.render();
}

Vehicle.prototype.render = function(){
  let ctx = game.ctx;
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;

  ctx.save();
  ctx.beginPath();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.velocity.getDirection()-Math.PI/2);
  ctx.moveTo(-9, -9);
  // drawing the triangle
  ctx.lineTo(0, -5);
  ctx.lineTo(0, 5);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

}

Vehicle.prototype.update = function(){
  if(!game.gamePaused){
    this.velocity.add(this.acceleration);
    this.velocity.limit(game.slider2.value);
    this.loc.add(this.velocity);

  }

}

Vehicle.prototype.checkEdges = function(){
  let canvas = game.canvas;
  if (this.loc.x > canvas.width){
    this.loc.x = 0;
  }
  else if(this.loc.x < 0){
    this.loc.x = canvas.width;
  }
  if (this.loc.y > canvas.height){
    this.loc.y = 0;
  }
  else if(this.loc.y < 0){
    this.loc.y = canvas.height;
  }
  }

Vehicle.prototype.flock = function(vehicles){
  //flock force is the accumulation of all forces
  let flockForce = new JSVector(0, 0);
  //set up force vectors to be added to acceleration
  let sep = this.separate(vehicles);
  let ali = this.align(vehicles);
  let coh = this.cohesion(vehicles);
  //set multiples via sliders
  let sepMult = document.getElementById("slider3").value;
  let aliMult = document.getElementById("slider4").value;
  let cohMult = document.getElementById("slider5").value;
  //calculate 3 forces
  sep.multiply(sepMult);
  ali.multiply(aliMult);
  coh.multiply(cohMult);
  //add forces to flockForce
  flockForce.add(sep);
  flockForce.add(ali);
  flockForce.add(coh);
  let maxForce = game.slider1.value
  flockForce.limit(maxForce);//limiting by maxForce
  this.acceleration.add(flockForce);
}

Vehicle.prototype.separate = function(vehicles){
  let sepForce = new JSVector(0,0);
  // let sum = new JSVector(0,0);
  // let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let diff = JSVector.subGetNew(this.loc, vehicles[i].loc);
    let d = diff.getMagnitude();
    if((d>0) && (d<this.desiredSep)){
        diff.normalize();
        sepForce.add(diff);
    }
  }
  return sepForce;
}

Vehicle.prototype.align = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = this.loc.distance(vehicles[i].loc);
    if((d>0) && (d<this.neighborDist)){
      sum.add(vehicles[i].velocity);
      count++;
      //keep track of number of vehicles within distance
    }
  }
  if(count>0){
    sum.divide(count);
    sum.normalize();
    //maxSpeed
    sum.multiply(game.slider2.value);
    let steer = sum.sub(this.velocity);
    //maxForce
    steer.limit(game.slider1.value);
    return steer;
  }
  else{
    return new JSVector(0,0);
  }
}

Vehicle.prototype.cohesion = function(vehicles){
  let sum = new JSVector(0,0);
  let count = 0;
  for(var i=0; i<vehicles.length;i++){
    let d = this.loc.distance(vehicles[i].loc);
    if((d>0) && (d<this.neighborDist)){
      sum.add(vehicles[i].loc);
      count++;//keep track of number of vehicles within distance
    }
  }
  if(count>0){
    sum.divide(count);
    return this.seek(sum);
  }
  else{
    return new JSVector(0,0);
  }
}

Vehicle.prototype.seek = function(target){
  let desired = target.sub(this.loc);
  desired.normalize();
  desired.multiply(game.slider2.value);
  let steer = desired.sub(this.velocity);
  steer.limit(game.slider1.value);
  return steer;
}
