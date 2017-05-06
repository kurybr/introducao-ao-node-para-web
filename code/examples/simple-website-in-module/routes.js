(() => {

	'use strict';

	const filesystem = require('fs');
	const path = require('path');


	const onLoad = (page, callback) => {

		var result = {}

		/** Comente aqui */
		const onReadFile = (err, data) => {

			if (err) {
				return callback(err, null)
			}

			result.data = data;

			return callback(null, result);
		}

		let file = null;

		/** Comente aqui */
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#textcss
		result.content_type = "text/html";

		/** Comente aqui */
		if (page.indexOf(".css") > 0) {
			result.content_type = "text/css";
		}

		/** Comente aqui */
		if (page.indexOf(".js") > 0) {
			result.content_type = "text/html";
		}

		/** Comente aqui */
		result.status = 200;

		/** Comente aqui */
		switch (page) {

			case "/":
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/hello-world.html');
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
				result.status = 404;
				/** Comente aqui */
				file = path.join(__dirname, '../../../files/htmls/404.html');
				filesystem.readFile(file, onReadFile);
				break;

		}


	}

	/** Comente aqui */
	module.exports = {
		Load: onLoad
	}

})();