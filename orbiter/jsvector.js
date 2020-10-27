function JSVector (x = 0, y = 0){
  this.x = x;
  this.y = y;
}

JSVector.prototype.setMagnitude = function(mag){
  let dir = this.getDirection();
  this.x = Math.cos(dir)*mag;
  this.y = Math.sin(dir)*mag;
}

JSVector.prototype.getMagnitude = function(){
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

JSVector.prototype.setDirection = function(angle){
  var mag = this.getMagnitude();
  this.x = Math.cos(angle)*mag;
  this.y = Math.sin(angle)*mag;
}


JSVector.prototype.getDirection = function(){
  return(Math.atan2(this.y, this.x));
}

JSVector.prototype.add = function(v2){
  this.x += v2.x;
  this.y += v2.y;
}

JSVector.prototype.sub = function(v2){
  this.x = this.x - v2.x;
  this.y = this.y - v2.y;

}

JSVector.addGetNew = function(v1, v2){
  return new JSVector(v1.x + v2.x, v1.y + v2.y);
  //Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

JSVector.subGetNew = function(v1, v2){
  return new JSVector(v1.x - v2.x, v1.y - v2.y);
  //Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

JSVector.prototype.multiply = function(scalar){
  this.x += scalar;
  this.y += scalar;
  //Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

JSVector.prototype.divide = function(scalar){
  this.x /= scalar;
  this.y /= scalar;
}

JSVector.prototype.normalize = function(){
  this.setMagnitude(1);
}

JSVector.prototype.limit = function(lim){
  this.normalize();
  this.multiply(lim);
}

JSVector.prototype.distance = function(v2){
  return Math.sqrt((v2.x - this.x) * (v2.y - this.y) * (v2.y - this.y));
}

JSVector.prototype.distanceSquared = function(v2){
  return(v2.x - this.x) * (v2.x - this.x) + (v2.y - this.y) * (v2.y - this.y);
}

JSVector.prototype.rotate = function(angle){
  let x = this.x;
  let y = this.y;
  let cos = Math.cos(angle);
  let sin = Math.sin(angle);
  this.x = x*cos-y*sin;
  this.y = x*sin+y*cos;
}
