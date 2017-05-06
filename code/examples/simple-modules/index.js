(() => {




	const myModule = require('./my-module');

	myModule.sayHelloTo("for All"); // Hello for All

	const SUM = require('./my-module-type2.js');

	console.log(SUM(1, 2)); // 3




})();