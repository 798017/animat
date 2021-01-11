function ParticleSystem(){
  this.particles = [];
  this.loc = new JSVector(500, 100);
}

ParticleSystem.prototype.run = function(){
  for(let i = this.particles.length-1; i >= 0; i--){
    this.particles[i].run();
    //give it a lifespan
    if(this.particles[i].isDead){
      this.particles.splice(i, 1);
    }
  }
  this.addParticle();
}


ParticleSystem.prototype.addParticle = function(){
  var dx, dy, rad, clr;
  dx = Math.random()*1 - 0.5;
  dy = Math.random()*1 - 0.5;
  rad = 10;
  clr = 'rgba(25, 180, 160, .5)';
  //for(let i = 0; i < 100; i++){
    this.particles.push(new Particle(this.loc.x, this.loc.y, dx, dy, rad, clr));
  //}
}
