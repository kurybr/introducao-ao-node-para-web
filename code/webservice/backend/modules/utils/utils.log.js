; (() => {
	'use strict';


	/** Comente aqui */
	const onLogError = (data) => {
		console.warn(data);
	}

	/** Commente aqui !  */
	const onLogSuccess = (data) => {
		console.info(data);
	}


	/** Comente aqui */
	module.exports = {
		error: onLogError,
		action: onLogSuccess
	};


})()