var Kevin = (function Alpha() {
	console.log("a");
	return function Beta() {
		console.log("b");
		
		
		return function Delta() {
			c = "c";
			console.log(c);
		}
	}
	
})();
