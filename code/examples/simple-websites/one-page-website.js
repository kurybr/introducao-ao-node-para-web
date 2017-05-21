(() => {

	'use strict';

	/** Comente aqui */
	const http = require('http');

	/** Comente aqui */
	const filesystem = require('fs');

	/** Comente aqui */
	const path = require('path');

	/** Comente aqui .. */
	const server = http.createServer((request, response) => {

		/** Comente aqui .. */
		response.statusCode = 200;

		/** Comente aqui .. */
		response.setHeader("Content-Type", "text/html");

		/** Comente aqui */
		// __dirname é o caminho fisico da aplicação !! 
		let file = path.join(__dirname, '../../../files/htmls/hello-world.html');
		/** Comente aqui */
		filesystem.readFile(file, (err, data) => {

			/** Comente aqui */
			if (err) {
				response.write("<h1> Pagina não encontrada </h1>");
				response.end();
				return;
			}

			response.write(data);
			response.end();
		})


	})


	/** Comente aqui */
	let port = 3000;

	/** Comente aqui */
	let address = 'localhost';

	/** Comente aqui */
	server.listen(port, address, () => {
		console.log("rodou.")
	})

})();