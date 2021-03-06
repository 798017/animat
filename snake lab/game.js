function Game(){
  this.gamePaused = false;
  this.ga = new GameArea();
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');

  this.snakes = [];
  this.createSnakes(this.canvas, 69);
}

Game.prototype.run = function(){
  if(!this.gamePaused){
    for(let i = 0; i< this.snakes.length; i++){
      this.snakes[i].run();
    }
  }
}

Game.prototype.createSnakes = function(canvas, numSnakes){
  for(var i = 0; i <numSnakes; i++){
    var x, y, dx, dy, radius, clr, r, g, b, numSegments;
    radius = 7;
    x = Math.random()*this.canvas.width;
    y = Math.random()*this.canvas.height;
    dx = Math.random()*2-1;
    dy = Math.random()*2-1;
    r = Math.random()*200+55;
    g = Math.random()*155;
    b = Math.random()*155;
    clr = "rgba("+r +", "+g+","+b+")"
    numSegments = Math.floor(Math.random()*10) + 3;

    this.snakes.push(new Snake(x, y, dx, dy, radius, clr, numSegments));
  }
}
