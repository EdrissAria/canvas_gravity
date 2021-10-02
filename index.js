var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// making our context 
var c = canvas.getContext("2d");


// add event to change color of circles 
addEventListener('click', ()=>{
	init();
})
// update screen when resizes 
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
// array of color
var colorArray = [
    	'#ee3311',
	'#33ee11',
	'#e74c6c',
	'#ecf0f1',
	'#3498db',
	'#2980b9'
];

// function random range 
function randomRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
} 
//friction 
var friction = 0.59;
// constructor 
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    // draw method for drawing circle
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
    // update method for update the moving of circles 
    this.update = function () {
        if(this.y + this.radius + this.dy > innerHeight){
            this.dy = -this.dy * friction;
        }else{
            this.dy += friction;
        }
        if(this.x + this.radius + this.dx >= innerWidth || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

// making object of Circle class
var circle;
var circleArray = []; 
function init() {
    circleArray = []
    for(var i = 0; i < 500; i++){
	var radius = randomRange(10, 25);
        var x = randomRange(radius, innerWidth - radius);
        var y = randomRange(0, innerHeight - radius);
        var dx = randomRange(-2, 2);
        var dy = randomRange(-2, 2);;
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}
init();
animate();