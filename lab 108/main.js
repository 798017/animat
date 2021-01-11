var game;   // game object



window.onload = init;

function init(){
    game = new Game();
    animate();
}


function animate(){
    game.run();
    requestAnimationFrame(animate);
    game.context1.clearRect(0, 0, canvas1.width, canvas.height);
    game.context1.fillStyle = 'rgba(0, 0, 0)'
    game.context1.fillRect(0, 0, game.canvas.width, game.canvas.height);
    game.run();
    requestAnimationFrame(animate);
}
