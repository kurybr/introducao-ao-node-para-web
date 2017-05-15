// Silence is Gold !
// Arrow of Time  >>>> --------------- >
; (function () {

	'use strict';

	/** Comente aqui */
	const CORS = (app) => {

		/** Comente aqui */
		app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

			/** Comente aqui */
			next();
		});

	};

	const ApiRoutes = (app) => {

		/** Comente aqui */
		let api = {
			user: require('./modules/user/user.routes'),
			post: require('./modules/post/post.routes')
		};

		/** Comente aqui */
		app.use('/api/user', api.user);
		app.use('/api/post', api.post);

	};

	const onLoad = (app) => {

		CORS(app);

		/** Comente aqui */
		app.use('/pages/:module/:action', function (req, resp) {
			let fold = req.params.module;
			let page = req.params.action;
			return resp.render('pages/' + fold + '/' + page);
		});

		/** Comente aqui */
		ApiRoutes(app);

		/** Comente aqui */
		app.get('*', (req, resp) => {
			resp.render('index');
		});

	};

	module.exports = {
		Load: onLoad
	};

}());
