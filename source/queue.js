var canvas = null
var ctx = null

var current_time = 0
var play = false

var dt = 0.01 // Change in time

var jobRate = 7
var nextArrival = 0

var servers = [new Server(2)]
var queue = []

function addServer(){
	
	servers.push(new Server(parseFloat(document.getElementById("mu").value)))
	
}

function setArrivalRate(){
	
	jobRate = parseFloat(document.getElementById("labda").value)
	
}

function playPause(){
	
	if(play){
		play = false
	}else{
		play = true
	}
	
}

function restart(){
	
	queue = []
	current_time = 0
	for(i = 0; i<servers.length; i++){
	
		servers[i].available = true
	
	}
	play = false
	nextArrival= 0
}

function loadCanvas() {
	
	canvas = document.getElementById("ui")
	ctx = canvas.getContext('2d')
	
	ctx.font = '48px serif'
	setInterval(draw, 50)
	setInterval(tick, 10)
	
	ctx.canvas.width  = window.innerWidth / 2;
	ctx.canvas.height = window.innerHeight / 2;

}

function removeServer(){
	
	servers.splice(servers.length-1, 1)
	
}

function draw() {
	
	// Clear for next frame
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "grey"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "black"
	
	// Drawing stuff goes here
	
	ctx.fillText("t="+current_time.toString(), 0, 10)
	ctx.fillText("Next job at t= " + nextArrival.toString(), 0, 20)
	
	ctx.fillText("Arrival Rate = "+ jobRate.toString(), canvas.width - 100, 35)
	// Draw servers
	
	if(!play){
		
		ctx.fillText("PAUSED", canvas.width/2, canvas.height/2)
		
	}
	
	for(i = 0; i<servers.length; i++){
		
		// Check if server is available
		
		if(servers[i].available){
			//Server is available take in next job in queue
			if(queue.length != 0){
				
				servers[i].doService(queue[0], current_time)
				queue.splice(0, 1)
				
				
			}
			
		}
		
		
		
		locX = 10 + 30*i
		locY = canvas.height - 20
		
		if(servers[i].available){ctx.fillStyle = "green"} else {ctx.fillStyle = "red"}
		ctx.fillRect(locX, locY, 20, 20)
		
		if(! servers[i].available){
			
			ctx.fillStyle = "blue"
			ctx.fillRect(locX, locY-25, 20, 20)
			
		}
		
		ctx.fillStyle = "black"
		
		ctx.fillText("mu="+servers[i].rate.toString(), locX, locY)
		
	}
	
	// Draw queue
	
	for(i = 0; i<queue.length; i++){
		
		locX = canvas.width - 20 - 7*i
		locY = 20
		
		ctx.fillStyle = "blue"
		ctx.fillRect(locX, locY, 5, 5)
		
	
		
	}
	
}

function tick(){
	
	if(play){
		
		current_time += dt
		if(current_time >= nextArrival){
			
			queue.push(new Job(current_time))
			nextArrival = current_time + randomExponential(jobRate)
			
		}
		
		for(i = 0; i < servers.length; i++){
			
			if(current_time > servers[i].availableAt){
				
				servers[i].available = true
				
			}
			
		}
		
		
		
		
	}
	
	
}
	




