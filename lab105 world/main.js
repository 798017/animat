var game;   // game object



window.onload = init;

function init(){
    game = new Game();
    animate();
}


function animate(){
    game.run();    
    requestAnimationFrame(animate);
}
