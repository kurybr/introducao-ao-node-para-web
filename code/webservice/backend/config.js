(() => {

	/** Commente aqui !  */
	const express = require("express");

	/** Commente aqui !  */
	const path = require('path');

	/** Commente aqui !  */
	const ejs = require('ejs');

	/** Commente aqui !  */
	const cookieParse = require('cookie-parser');

	/** Commente aqui !  */
	const cookieSession = require('cookie-session');

	/** Commente aqui !  */
	const bodyParser = require('body-parser');

	/** Commente aqui !  */
	const Middleware = require('connect-multiparty');


	const onLoad = (app) => {

		/** Commente aqui !  */
		app.use(new Middleware());

		/** Commente aqui !  */
		app.use(cookieParse());

		/** Commente aqui !  */
		app.use(cookieSession({
			name: 'project-session',
			keys: ['jorge', 'hugo']
		}));

		/** Commente aqui !  */
		app.use(bodyParser.urlencoded({ extended: true }));

		/** Commente aqui !  */
		app.use(bodyParser.json());

		/** Commente aqui !  */
		app.engine('html', ejs.renderFile);

		/** Commente aqui !  */
		app.set('view engine', 'html');

		/** Commente aqui !  */
		app.set('views', path.join(__dirname, '../frontend/views/'));

		/** Commente aqui !  */
		app.use(express.static(path.join(__dirname, '../frontend/')));


	}


	module.exports = {
		Load: onLoad
	}

})();