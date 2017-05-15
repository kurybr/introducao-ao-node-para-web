; (function () {

	'use strict';

	/** Commente aqui !  */
	const express = require('express');
	const controller = require('./post.controller');

	const routes = express.Router();


	/** Commente aqui !  */
	const onCreate = (request, response) => {

		/** Commente aqui !  */
		const token = request.headers['token-user'];

		/** Commente aqui !  */
		let data = request.body;

		/** Commente aqui !  */
		controller.Publish(token, data, (err, result) => {

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

	}

	/** Commente aqui !  */
	const onList = (request, response) => {

		/** Commente aqui !  */
		const token = request.headers['token-user'];

		/** Commente aqui !  */
		let post = request.params;

		/** Commente aqui !  */
		controller.List(token, post, (err, result) => {

			if (err) {

				/** Commente aqui !  */
				response.status = err.status
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


	}

	/** Commente aqui !  */
	const onRemove = (request, response) => {

		/** Commente aqui !  */
		const token = request.headers['token-user'];

		/** Commente aqui !  */
		let data = request.params;

		/** Commente aqui !  */
		controller.Remove(token, data, (err, result) => {

			if (err) {

				/** Commente aqui !  */
				response.status = err.status
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

	}

	/** Commente aqui !  */
	routes.post('/publish', onCreate);
	routes.get(['/', '/:code'], onList) /// Duas rotas para a mesma função.
	routes.delete('/:code', onRemove)

	/** Commente aqui !  */
	module.exports = routes;

}());