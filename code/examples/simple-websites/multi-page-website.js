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
		let page = request.url;

		/** Comente aqui */
		// __dirname é o caminho fisico da aplicação !! 
		let file = path.join(__dirname, '../../../files/htmls' + page);

		let file_not_found = path.join(__dirname, '../../../files/htmls/404.html');


		const onNotFound = () => {

			filesystem.readFile(file_not_found, (err, data) => {
				response.write(data);
				response.end();
			})

		}


		/** Comente aqui */
		filesystem.readFile(file, (err, data) => {

			/** Comente aqui */
			if (err) {
				onNotFound();
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