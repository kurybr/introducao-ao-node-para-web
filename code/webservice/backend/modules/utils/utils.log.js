; (() => {
	'use strict';

	/** Comente aqui */
	const crypto = require('crypto');

	/** Comente aqui */
	const jwt = require('jsonwebtoken');

	/** Comente aqui */
	const onLogError = (data) => {
		console.warn(data);
	}

	const onLogSuccess = (data) => {
		console.info(data);
	}


	/** Comente aqui */
	module.exports = {
		error: onLogError,
		action: onLogSuccess
	};


})()