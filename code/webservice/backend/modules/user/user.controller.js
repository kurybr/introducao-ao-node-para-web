; (() => {

	'use strict';

	const express = require('express');


	const Utils = require('../utils/utils.hash');
	const Log = require('../utils/utils.log');
	const model = require('./user.model');

	const routes = express.Router();




	/** Comente aqui */
	const onRegister = (data, callback) => {

		if (!data) {
			return callback({
				status: 400,
				msg: 'Informe os parametros necessários, para cadastrar um usuário.',
				data: null
			});
		}

		if (!data.name) {
			return callback({ status: 400, msg: 'É Obrigatório informar o e-mail' });
		}
		if (!data.password) {
			return callback({ status: 400, msg: 'É Obrigatório informar uma password' });
		}
		if (data.password.length < 5 && data.password.length > 80) {
			return callback({ status: 400, msg: 'A password deve conter entre 5 e 80 caracteres' });
		}

		let keys = ['name', 'password', 'email'];

		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				if (keys.indexOf(key) < 0) {
					delete data[key]; // Remove qualquer parametro enviado, que está fora do pedido.
				}
			}
		}

		data.createdAt = new Date();

		let GenerateTokenRecovery = (token) => {

			data.token_recovery = token;

			return model.Register(data, (err, result) => {

				if (err) {
					Log.error(err);
					return callback(err, null);
				}

				return callback(null, {
					msg: result.msg,
					data: result.data
				});

			})

		}

		let GeneratePassword = (hash) => {

			data.password = hash;

			let token = data.email + Date.now();
			Utils.GenerateHash(token)
				.then(GenerateTokenRecovery, (err) => {
					Log.error(err);
					callback();
				})

		}

		model.VerifyEmail(data.email).then((exist) => {

			console.log(exist);

			if (exist) {
				return callback({
					status: 401,
					msg: 'Houve algum problema no sistema, tente novamente mais tarde.',
					data: {}
				})
			}

			Utils.GenerateHash(data.password)
				.then(GeneratePassword, (err) => {
					Log.error(err);
					callback();
				})


		}, (err) => {
			callback(err);
		})



	};

	const onEdit = (token, data, callback) => {


		const onValid = (user) => {


			if (!data) {
				return callback({
					status: 400
					, msg: 'Informe os parametros necessários, para atualizar o usuário.'
					, data: null
				}, null)
			} // Não houve parametros.


			if (data.password) {

				if (data.password.length < 5 && data.password.length > 80) {
					return callback({ status: 400, msg: 'A password deve conter entre 5 e 80 caracteres' });
				}

			}

			let keys = ['name', 'password', 'email', 'code'];

			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					if (keys.indexOf(key) < 0) {
						delete data[key]; // Remove qualquer parametro enviado, que está fora do pedido.
					}
				}
			}

			for (let key in user) {
				if (user.hasOwnProperty(key)) {
					if (keys.indexOf(key) < 0) {
						delete user[key]; // Remove qualquer parametro que está fora do pedido.
					}
				}
			}

			data.code = user.code;



			let onEditSuccess = (err, result) => {

				if (err) {
					return callback(err);
				}

				callback(null, {
					msg: result.msg
					, data: {}
				})

			}

			let GeneratePassword = (hash) => {

				data.password = hash;
				model.Edit(data, onEditSuccess);

			}


			if (data.password) {

				Utils.GenerateHash(data.password) // Criptografa a password.
					.then(GeneratePassword, (err) => {
						console.warn(err);
						callback();
					});

			} else {

				model.Edit(data, onEditSuccess);

			}





		}


		Utils.ValidToken(token)
			.then(onValid, (err) => {
				callback({
					status: 401
					, msg: "Token de segurança invalido, faça login novamente para regularizar."
					, data: {
						expirado_em: err.expiredAt
					}
				})
			})
	};

	const onLogin = (data, callback) => {

		if (!data) {
			return callback({
				status: 400 /// códigos que informam ao cliente, qual foi o resultado da operação realizada.
				, msg: 'Informe os parametros necessários, para fazer o login.'
				, data: null
			}, null)
		} // Não houve parametros.

		if (!data.email) {
			return callback({ status: 400, msg: 'É Obrigatório informar o e-mail' });
		}

		if (!data.password) {
			return callback({ status: 400, msg: 'É Obrigatório informar uma senha' });
		}

		let keys = ['password', 'email'];

		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				if (keys.indexOf(key) < 0) {
					delete data[key]; // Remove qualquer parametro enviado, que está fora do pedido.
				}
			}
		}


		let GenerateToken = (err, result) => {

			if (err) {
				return callback(err);
			}

			function onSuccessGenerate(token) {

				result.data.token = token;

				return callback(null, {
					msg: result.msg
					, data: result.data
				});

			}

			Utils.GenerateToken(result.data)
				.then(onSuccessGenerate, (err) => {
					console.warn(err);
					callback();
				})

		}

		let GeneratePassword = (hash) => {

			data.password = hash;
			model.Login(data, GenerateToken);

		}



		Utils.GenerateHash(data.password) // Criptografa a senha.
			.then(GeneratePassword, (err) => {
				console.warn(err);
				callback();
			})
			;



	};

	const onFindById = (code, callback) => {

		model.FindById(code, callback);
	};


	module.exports = {
		Register: onRegister,
		Edit: onEdit,
		Login: onLogin,
		FindById: onFindById
	};


})()