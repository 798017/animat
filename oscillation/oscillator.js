function Oscillator(){
  this.angle = new JSVector(100,0);
  this.velocity = newJSVector(Math.random()*.05, Math.random()*.05);
  this.amplitude = new JSVector(Math.random()*(canvas.width/2), Math.random()
*(canvas.height/2));

}

Oscillator.prototype.run = function(){
  this.osccillate();
  this.display();
}

Oscillator.prototype.oscillate = function(){
  this.angle.add(this.velocity);
}

Oscillatory.prototype.display = function(){
  let ctx = game.ctx;
  this.x = Math.sin(this.angle.x)*this.amplitude.x;
  this.y = Math.sin(this.angle.y)*this.amplitude.y;

  ctx.strokeStyle = 'rgba(0,0,0,1)'
  ctx.save();
  ctx.beginPath();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.lineTo(0, 0);
  ctx.arc(this.x, this.y, 20, Math.PI*2, 0, false);
  ctx.stroke();
  ctx.restore();
}
