(() => {


	const onSayHelloTo = (name) => {
		console.log(`Hello ${name}`);
	}


	module.exports = {
		sayHelloTo: onSayHelloTo
	}

})();