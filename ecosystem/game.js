function Game(){
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.ps = new ParticleSystem();

  setInterval(createParticle, 200);     // use a timer to create 5 particles per second
  this.movers = [];
  this.createMovers(this.canvas, 10);
}

function createParticle(){
  game.ps.addParticle();
}


Game.prototype.run = function(){
  this.ps.run();

  for(let i = 0; i< this.movers.length; i++){
    this.movers[i].run();
  }
}

Game.prototype.createMovers = function(canvas, numMovers){
  for(var i = 0; i <numMovers; i++){
    var x, y, dx, dy, radius, clr, r, g, b, numOrbs;
    radius = 20;
    x = Math.random()*this.canvas.width;
    y = Math.random()*this.canvas.height;
    dx = Math.random()*2-1;
    dy = Math.random()*2-1;
    r = Math.random()*200+55;
    g = Math.random()*155;
    b = Math.random()*155;
    clr = "rgba("+r +", "+g+","+b+")"
    numOrbs = Math.floor(Math.random()*10) + 3;

    this.movers.push(new Mover(x, y, dx, dy, radius, clr, numOrbs));
  }
}
