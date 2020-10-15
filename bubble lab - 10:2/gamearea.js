function GameArea(b){
  let wrapperDiv = document.createElement("div");
  wrapperDiv.id = "wrapperDiv";
  document.body.appendChild(wrapperDiv)

  let tileMenuDiv = document.createElement("div");
  wrapperDiv.appendChild(tileMenuDiv)
  tileMenuDiv.setAttribute("style", "background-color:pink; width:110px; height:700px; float:left;");

  let canvasDiv = document.createElement("div");
  wrapperDiv.appendChild(canvasDiv)
  canvasDiv.setAttribute("style", "background-color:pink; width:110px; height:700px; float:left;");

  let canvas = document.createElement("canvas");
  canvas.id = 'canvas';
  canvas.width = 1096;
  canvas.height = 696;
  canvasDiv.appendChild(canvas);

  this.tiles = [];
  for(let i = 0; i < 6; i++){
    this.tiles[i] = document.createElement("div");
    tileMenuDiv.appendChild(this.tiles[i]);
    this.tiles[i].setAttribute("class", "tile");

    this.tiles[i].appendChild(document.createTextNode("Tile" + (i + 1)));
  }


  this.movers = b;
  this.gamePaused = false;
  this.ga = new GameArea();

  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.movers = [];

  this.movers.push(new Mover(Math.random()*this.canvas.width, Math.random()*canvas.height, Math.random()*6-3), Math.random()*6-3, 15, "rgba(" + 31 + ","+ 228+","+228+")"));
  let numMovers = 150;
    //if(!this.gamePaused){
    for(var i = 1; i < this.numMovers; i++){
      var x, y, dx, dy, diam, clr, r, g, b;

      x = Math.random()*this.canvas.width;
      y = Math.random()*this.canvas.height;
      dx = Math.random()*6-3;
      dy = Math.random()*6-3;
      diam = 15;

      clr = "rgba(210, 173, 255, 10)";
      this.movers.push(new Mover(x, y, dx, dy, diam, clr));

    }

    for(let i = 0; i < this.ga.tiles.length; i++){
      this.ga.tiles[i].addEventListener('mouseover'. funtion(){
        this.style.backgroundColor = "#ac8fe3"
      },
    false);
    this.ga.tiles[i].addEventListener('click', function(){
      this.style.backgroundColor = "#d5dee0"
    }, false);
    this.ga.tiles[i].addEventListener('click', function(){
      game.game.Paused = !game.gamePaused;
      console.log("Mouse Clicked");
    }, false);
  }

    Game.prototype.run = function(){
      if(!this.gamePaused){
        for(let i = 0; i < this.movers.length; i++){
          this.mover[i].run();
        }
      }
    }
  }
  }
}
