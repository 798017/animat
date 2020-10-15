/// global variables for canvas and context
var game;
//canvas, ctx;
window.onload = init;

function init(){
  game = new Game();
  animate();

  //canvas = document.createElement('canvas');
  //canvas.style.border = 'solid black 2px';
  // canvas.style.backgroundColor = 'rgba(0,0,0 .95)';
  //
  // //context
  // canvas.width = 1096;
  // canvas.height = 696;
  // ctx = canvas.getContext('2d');
  // var bubbles = loadBubbles(150)
  // game = new Game(bubbles);
  // animate ();
}

function animate(){
  game.ctx.fillStyle = 'rgba (0,0,0, .05)';
  game.ctx.fillRect (0, 0, canvas.width, canvas.height);
  game.run()
  requestAnimationFrame(animate);
}
  // array of ball objects
  function loadMovers(numMovers){
    var movers = [];
    for(var i = 0; i < numMovers; i++){
      var x, y, dx, dy, diam, clr, r, g, b;
      x = Math.random()*canvas.width;
      y = Math.random()*canvas.height;
      dx = Math.random()*6-3;
      dy = Math.random()*6-3;
      diam = 15;
      r = 255;
      g = 255;
      b = 255;
      clr = "rgba(" + r + "," + g + "," + b + ")"
      movers[i] = new mover (x, y, dx, dy, diam, clr);
  }
      //return bubbles;
}
