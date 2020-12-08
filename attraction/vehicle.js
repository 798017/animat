function Vehicle(loc){
  this.loc = new JSVector(loc.x, loc.y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0, 0);
  this.scl = 9;
}

Vehicle.prototype.run = function(vehicles){
  this.update();
  this.checkEdges();
  this.render();
}

Vehicle.prototype.render = function(){
  let ctx = game.ctx;
  ctx.strokeStyle = this.clr;
  if(this === game.vehicles[0]){
    ctx.fillStyle = 'rgba(255, 0, 0)' //this.clr;
  }else{
    ctx.fillStyle = 'rgba(0, 0, 255)' //this.clr;
  }

  ctx.save();
  ctx.beginPath();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.velocity.getDirection()+Math.PI/2);
  ctx.moveTo(0, -this.scl);
  // drawing the triangle
  ctx.lineTo(-this.scl, +this.scl);
  ctx.lineTo(0, 0);
  ctx.lineTo(this.scl, this.scl);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

}

Vehicle.prototype.update = function(){
  if(this !== game.vehicles[0]){
    let d = this.loc.distance(game.vehicles[0].loc);
    if(d < 50){
      this.acceleration = JSVector.subGetNew(this.loc, game.vehicles[0].loc);
      this.acceleration.normalize();
      this.acceleration.multiply(0.05);
    }
  }
  this.velocity.add(this.acceleration);
  this.velocity.limit(game.slider2.value);
  this.loc.add(this.velocity);
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
