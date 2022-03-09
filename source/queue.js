var canvas = null
var ctx = null

var current_time = 0
var play = true

var dt = 1 // Change in time

function loadCanvas() {
	
	canvas = document.getElementById("ui")
	ctx = canvas.getContext('2d')
	
	ctx.font = '48px serif'
	setInterval(draw, 50)
	setInterval(tick, 1000)
	
	ctx.canvas.width  = window.innerWidth / 2;
	ctx.canvas.height = window.innerHeight / 2;

}

function draw() {
	
	// Clear for next frame
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "grey"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "black"
	
	// Drawing stuff goes here
	
	ctx.fillText("t="+current_time.toString(), 0, 10)
	
}

function tick(){
	
	if(play){
		
		current_time += dt
		
		
		
		
	}
	
	
}
	




