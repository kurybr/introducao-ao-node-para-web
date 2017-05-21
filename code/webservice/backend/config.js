(() => {

	/** Commente aqui !  */
	const express = require("express");

	/** Commente aqui !  */
	const path = require('path');

	/** EJS será a Engine usada para o HTML   */
	const ejs = require('ejs');

	/* 
		Cookie Parse e o Cookie Session ficam responsáveis
		pelo controle de cookie e sessão da aplicação
	*/
	const cookieParse = require('cookie-parser');

	/** Commente aqui !  */
	const cookieSession = require('cookie-session');

	/** Modulo responsável por fazer o servidor entender submissões por POST !  */
	const bodyParser = require('body-parser');

	/** Para Upload !  */
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


		/** Faz com que o servidor entenda submissões por POST
		 alem de os Verbos do HTTP (rest full)
		 e JSON   */
		app.use(bodyParser.urlencoded({ extended: true }));
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