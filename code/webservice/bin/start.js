#!/usr/bin/env node
; (function () {

	"use strict";

	const app = require('../backend/app').app; // Aplicação !
	const port = process.env.PORT || 3000;  // Porta do Host
	// const address = process.env.NODE_IP || 'localhost'; // IP do Host



	const since = new Date();
	let log = require('../backend/modules/utils/utils.log');

	try {

		app.listen(port, () => {
			log.action(`Servidor levantando as ${since}`);
		});

	} catch (e) {

		log.error(500
			, e.toString()
			, "Erro no arquivo start.js - sessão de iniciar o servidor.");
	}


}());
