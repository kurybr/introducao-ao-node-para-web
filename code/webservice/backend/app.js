(() => {

	'use strict';

	/** Comente aqui */
	const express = require('express');

	/** Comente aqui */
	const config = require('./config');
	const routes = require('./routes');

	/** Comente aqui */
	const app = express();

	/** Comente aqui */
	config.Load(app);
	routes.Load(app);

	/** Comente aqui */
	module.exports = {
		app
	};

})();
