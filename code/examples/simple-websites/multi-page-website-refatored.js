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
		const onReadFile = (err, data) => {
			if (err) {
				response.statusCode = 500;
				response.write("Erro Interno");
			} else {
				response.write(data);
			}

			response.end();
		}


		/** Comente aqui */
		let page = request.url;

		let file = null;

		/** Comente aqui */
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#textcss
		if (page.indexOf(".css") > 0) {
			response.setHeader("Content-Type", "text/css");
		}
		if (page.indexOf(".js") > 0) {
			response.setHeader("Content-Type", "application/javascript");
		}

		/** Comente aqui */
		switch (page) {
			case "/":
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/hello-world.html');
				filesystem.readFile(file, onReadFile)
				break;
			case "/hello":
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/hello-world.html');
				filesystem.readFile(file, onReadFile)
				break;
			case "/other":
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/other.html');
				filesystem.readFile(file, onReadFile)
				break;
			case "/style.css":
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/style.css');
				filesystem.readFile(file, onReadFile)
				break;
			case "/scripts.js":
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/scripts.js');
				filesystem.readFile(file, onReadFile)
				break;
			default:
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/404.html');
				filesystem.readFile(file, onReadFile);
				break;

		}




	})


	/** Comente aqui */
	let port = 3000;

	/** Comente aqui */
	let address = 'localhost';


	const onStarted = () => {
		console.info(`Rodando em ${address} porta ${port} `);
	}


	/** Comente aqui */
	server.listen(port, address, onStarted)







})();