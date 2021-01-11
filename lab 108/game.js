function Game(){

    this.canvas1 = document.getElementById('cnv1');
    this.context1 = this.canvas1.getContext('2d');
    this.canvas2 = document.getElementById('cnv2');
    this.context2 = this.canvas2.getContext('2d');

    this.canvas1Loc = new JSVector();

    this.world = {
        top: -1500,
        left: -2000,
        bottom: 1500,
        right: 2000,
        width: 4000,
        height: 3000

    this.ps = new ParticleSystem();

    setInterval(createParticle, 200);     // use a timer to create 5 particles per second
    this.movers = [];
    this.createMovers(this.canvas, 10);
    }
    // canvas2 is scaled according to the ratio of its
    // height and width to the height and width of the world
    // so that the entire world fits within canvas2
    this.scaleX = this.canvas2.width/this.world.width;
    this.scaleY = this.canvas2.height/this.world.height;

    // add an event handler such that the a, s, w, d keys
    // will reposition the canvas1within the world.
    window.addEventListener("keypress", function(event){
        switch(event.code){
            case "KeyW":
                if(game.canvas1Loc.y+100 > game.world.top)
                    game.canvas1Loc.y -= 20;
                break;
            case "KeyS":
                if(game.canvas1Loc.y + game.canvas1.height -100 < game.world.bottom)
                    game.canvas1Loc.y += 20;
                break;
            case "KeyA":
                if(game.canvas1Loc.x+100 > game.world.left)
                    game.canvas1Loc.x -= 20;
                break;
            case "KeyD":
                if(game.canvas1Loc.x + game.canvas1.width -100 < game.world.right)
                    game.canvas1Loc.x += 20;
                break;
            break;
            }
    }, false);

}//++++++++++++++++++++++  end game constructor


// function to run the game each animation cycle
Game.prototype.run = function(){
    let context11 = this.context1;
    let cnv1 = this.canvas1;
    let context12 = this.context2;
    let cnv2 = this.canvas2;
    context11.fillStyle =  "#505050";
    context11.fillRect(0,0,cnv1.width,cnv1.height);
    context12.fillStyle =  "#505050";
    context12.fillRect(0,0,cnv2.width,cnv2.height);

    // translate canvas1 according to the location of the canvas1in the world
    context11.save();
    context11.translate(this.canvas1Loc.x*(-1), this.canvas1Loc.y*(-1));

    // draw the bounds of the world in canvas1
    context11.strokeStyle = "rgba(0, 230, 64, 1)"
    context11.beginPath();
    context11.lineWidth = 3;
    context11.strokeRect(this.world.left, this.world.top, this.world.width, this.world.height);

    // draw the x and y axes of the world in canvas1
    context11.strokeStyle = "rgba(240, 52, 52, 1)"
    context11.beginPath();
    context11.moveTo(0, this.world.top);
    context11.lineTo(0, this.world.bottom);
    context11.stroke();
    context11.moveTo(this.world.left, 0);
    context11.lineTo(this.world.right, 0);
    context11.stroke();

    // scale canvas2 to contain the entire world
    context12.save();
    context12.beginPath();
    context12.lineWidth = 30;
    context12.strokeStyle = "rgba(240, 52, 52, 1)"
    context12.scale(this.scaleX, this.scaleY);

    //center canvas2 in world
    context12.translate(this.world.width/2, this.world.height/2);

    //draw outline in canvas2
    context12.strokeStyle = "rgba(255, 255, 255, 1)"
    context12.strokeRect(this.canvas1Loc.x, this.canvas1Loc.y, this.canvas1.width, this.canvas1.height);

    //draw x and y axes
    context12.strokeStyle = "rgba(240, 52, 52, 1)"
    context12.moveTo(0, this.world.top);
    context12.lineTo(0, this.world.bottom);
    context12.stroke();
    context12.moveTo(this.world.left, 0);
    context12.lineTo(this.world.right, 0);
    context12.stroke();

    context11.restore();
    context12.restore();

    // run all the actors

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
    x = Math.random()*this.canvas1.width;
    y = Math.random()*this.canvas1.height;
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
