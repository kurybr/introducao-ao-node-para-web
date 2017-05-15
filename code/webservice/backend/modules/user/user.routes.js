; (() => {

	'use strict';

	const express = require('express');

	const controller = require('./user.controller');

	const routes = express.Router();




	/** Comente aqui */
	const onRegister = (request, response) => {

		/** Comente aqui */
		let data = request.body;

		/** Comente aqui */
		controller.Register(data, (err, result) => {

			if (err) {

				/** Comente aqui */
				response.status = err.status;

				/** Comente aqui */
				return response.json({
					error: true,
					msg: err.msg,
					data: err.data
				});

			}

			/** Comente aqui */
			return response.json({
				error: false,
				msg: result.msg,
				data: result.data
			})

		});

	};

	/** Comente aqui */
	const onEdit = (request, response) => {

		/** Comente aqui */
		const token = request.headers['token-user']

		/** Comente aqui */
		let data = request.body;

		/** Comente aqui */
		controller.Edit(token, data, (err, result) => {

			if (err) {

				/** Comente aqui */
				return response.status(err.status)
					.json({
						error: true
						, msg: err.msg
						, data: err.data
					});

			}

			/** Comente aqui */
			return response.json({
				error: false
				, msg: result.msg
				, data: result.data
			});

		});


	};

	/** Commente aqui !  */
	const onLogin = (request, response) => {

		let data = request.body;

		/** Commente aqui !  */
		controller.Login(data, (err, result) => {

			if (err) {

				/** Commente aqui !  */
				response.status = err.status;

				/** Commente aqui !  */
				return response.json({
					error: true
					, msg: err.msg
					, data: err.data
				});

			}

			/** Commente aqui !  */
			return response.json({
				error: false
				, msg: result.msg
				, data: result.data
			});

		});

	};

	/** Commente aqui !  */
	const onFindById = (request, response) => {

		/** Commente aqui !  */
		let data = request.params.id;

		/** Commente aqui !  */
		controller.FindById(data, (err, result) => {


			if (err) {

				/** Commente aqui !  */
				response.status = err.status;

				return response.json({
					error: true
					, msg: err.msg
					, data: err.data
				});

			}

			/** Commente aqui !  */
			return response.json({
				error: false
				, msg: result.msg
				, data: result.data
			});

		})

	};


	/** Commente aqui !  */
	routes.post('/login', onLogin);
	routes.post('/register', onRegister);
	routes.put('/edit', onEdit);
	routes.get('/:id', onFindById);


	module.exports = routes;


})()