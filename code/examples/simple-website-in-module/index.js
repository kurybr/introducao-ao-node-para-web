(() => {

	'use strict';

	const server = require('./server');


	/** Comente aqui */
	let port = 3000;

	/** Comente aqui */
	let address = 'localhost';

	/** Comente aqui */
	const onStarted = () => { console.info(`Rodando em ${address} porta ${port} `); }

	/** Comente aqui */
	server.listen(port, address, onStarted)




})();