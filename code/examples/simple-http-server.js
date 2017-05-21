(() => {

	/** Comente aqui */
	const http = require('http');


	/** Comente aqui */
	const server = http.createServer((request, response) => {

		/** Comente aqui */
		response.write('Hello World');

		/** Comente aqui */
		response.end();

	})


	/** Comente aqui */
	let port = 3000;
	let address = 'localhost';

	/** Comente aqui */
	server.listen(port, address, () => {
		console.log(`Started on `);
	})

})()