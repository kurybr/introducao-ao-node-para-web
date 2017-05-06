(() => {

	const http = require('http');

	const routes = require('./routes');
	const log = require('./log');


	const server = http.createServer((request, response) => {

		/** Comente aqui .. */
		response.statusCode = 200;

		/** Comente aqui .. */
		response.setHeader("Charset", "UTF-8")

		/** Comente aqui */
		routes.Load(request.url, (err, result) => {

			if (err) {
				response.status = 500;
				response.write("<h1> Error </h1>");
				response.end();
				return;
			}

			/** Comente aqui */
			response.status = result.status;
			response.setHeader("Content-Type", result.content_type);
			response.write(result.data);
			response.end();

		});


		/** Comente aqui */
		if (request.method == 'POST') {

			let body = [];


			const onReadData = (chunk) => {

				/** Comente aqui */
				body.push(chunk);

			}

			const onReadEnd = () => {

				/** Comente aqui */
				body = Buffer.concat(body).toString();
				log.Save(body);

			}

			/** Comente aqui */
			request.on('data', onReadData).on('end', onReadEnd);

		}

	})



	module.exports = server;

})();