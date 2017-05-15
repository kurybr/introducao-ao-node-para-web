; (function () {

	'use strict';


	const express = require('express');
	const controller = require('./post.controller');

	const routes = express.Router();



	function onCreate(request, response) {

		// Irá identificar qual usuário está enviando a postagem.
		const token = request.headers['token-user'];

		let data = request.body;

		controller.Publish(token, data, (err, result) => {

			if (err) {

				response.status = err.status;

				return response.json({
					error: true
					, msg: err.msg
					, data: err.data
				});

			}

			return response.json({
				error: false
				, msg: result.msg
				, data: result.data
			});

		});

	}

	function onList(request, response) {

		const token = request.headers['token-user']; // Irá identificar qual usuário está enviando a postagem.
		let post = request.params; // Pega os parametros passados na URL.

		controller.List(token, post, (err, result) => {

			if (err) {

				response.status = err.status
				return response.json({
					error: true
					, msg: err.msg
					, data: err.data
				});

			}

			return response.json({
				error: false
				, msg: result.msg
				, data: result.data
			});

		})


	}


	function onRemove(request, response) {

		// Irá identificar qual usuário está querendo remover a postagem.
		const token = request.headers['token-user'];

		let data = request.params;

		controller.Remove(token, data, (err, result) => {

			if (err) {

				response.status = err.status
				return response.json({
					error: true
					, msg: err.msg
					, data: err.data
				});

			}

			return response.json({
				error: false
				, msg: result.msg
				, data: result.data
			});

		});

	}

	routes.post('/publish', onCreate);
	routes.get(['/', '/:code'], onList) /// Duas rotas para a mesma função.
	routes.delete('/:code', onRemove)

	module.exports = routes;

}());