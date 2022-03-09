class Server {

	available = true
	availableAt = 0
	
	constructor(rate){
		
		this.rate = rate
		this.availableAt = 0
		
	}
	
	doService(job, t0){
		
		this.available = false
		job.served = true
		this.availableAt = t0 + randomExponential(this.rate)
		
	}
	
	
	
}