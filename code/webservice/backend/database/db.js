; (function () {

	'use strict';

	/** Comente aqui */
	let mysql = require('mysql');

	let config, database;

	/** Comente aqui */
	config = {
		host: 'localhost' // Host do Mysql
		, user: 'root'  // Usuário do banco
		, password: ''  // Senha do banco
		, database: 'courses_infoeste_2017' // Banco de dados
	};

	/** Comente aqui */
	database = mysql.createConnection(config);

	/** Comente aqui */
	module.exports = database;

}());