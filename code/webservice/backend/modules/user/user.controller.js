; (() => {

	'use strict';

	const express = require('express');


	const Utils = require('../utils/utils.hash');
	const Log = require('../utils/utils.log');
	const model = require('./user.model');

	const routes = express.Router();




	/** Comente aqui */
	const onRegister = (data, callback) => {

		/** Commente aqui !  */
		if (!data) {
			return callback({
				status: 400,
				msg: 'Informe os parametros necessários, para cadastrar um usuário.',
				data: null
			});
		}

		/** Commente aqui !  */
		if (!data.name) {
			return callback({ status: 400, msg: 'É Obrigatório informar o e-mail' });
		}

		/** Commente aqui !  */
		if (!data.password) {
			return callback({ status: 400, msg: 'É Obrigatório informar uma password' });
		}

		/** Commente aqui !  */
		if (data.password.length < 5 && data.password.length > 80) {
			return callback({ status: 400, msg: 'A password deve conter entre 5 e 80 caracteres' });
		}

		/** Commente aqui !  */
		let keys = ['name', 'password', 'email'];


		/** Commente aqui !  */
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				if (keys.indexOf(key) < 0) {
					delete data[key]; // Remove qualquer parametro enviado, que está fora do pedido.
				}
			}
		}

		/** Commente aqui !  */
		data.createdAt = new Date();

		/** Commente aqui !  */
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

		/** Commente aqui !  */
		let GeneratePassword = (hash) => {

			data.password = hash;

			/** Commente aqui !  */
			let token = data.email + Date.now();

			/** Commente aqui !  */
			Utils.GenerateHash(token)
				.then(GenerateTokenRecovery, (err) => {
					Log.error(err);
					callback();
				})

		}


		/** Commente aqui !  */
		model.VerifyEmail(data.email).then((exist) => {

			console.log(exist);
			/** Commente aqui !  */
			if (exist) {
				return callback({
					status: 401,
					msg: 'Houve algum problema no sistema, tente novamente mais tarde.',
					data: {}
				})
			}

			/** Commente aqui !  */
			Utils.GenerateHash(data.password)
				.then(GeneratePassword, (err) => {
					Log.error(err);
					callback();
				})


		}, (err) => {
			callback(err);
		})



	};

	/** Commente aqui !  */
	const onEdit = (token, data, callback) => {

		/** Commente aqui !  */
		const onValid = (user) => {

			/** Commente aqui !  */
			if (!data) {
				return callback({
					status: 400
					, msg: 'Informe os parametros necessários, para atualizar o usuário.'
					, data: null
				}, null)
			}

			/** Commente aqui !  */
			if (data.password) {

				if (data.password.length < 5 && data.password.length > 80) {
					return callback({ status: 400, msg: 'A password deve conter entre 5 e 80 caracteres' });
				}

			}

			/** Commente aqui !  */
			let keys = ['name', 'password', 'email', 'code'];

			/** Commente aqui !  */
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					if (keys.indexOf(key) < 0) {
						delete data[key]; // Remove qualquer parametro enviado, que está fora do pedido.
					}
				}
			}

			/** Commente aqui !  */
			for (let key in user) {
				if (user.hasOwnProperty(key)) {
					if (keys.indexOf(key) < 0) {
						delete user[key]; // Remove qualquer parametro que está fora do pedido.
					}
				}
			}

			/** Commente aqui !  */
			data.code = user.code;

			/** Commente aqui !  */
			let onEditSuccess = (err, result) => {

				if (err) {
					return callback(err);
				}

				callback(null, {
					msg: result.msg
					, data: {}
				})

			}

			/** Commente aqui !  */
			let GeneratePassword = (hash) => {

				data.password = hash;
				model.Edit(data, onEditSuccess);

			}

			/** Commente aqui !  */
			if (data.password) {

				Utils.GenerateHash(data.password) // Criptografa a password.
					.then(GeneratePassword, (err) => {
						console.warn(err);
						callback();
					});

			} else {
				/** Commente aqui !  */
				model.Edit(data, onEditSuccess);

			}





		}

		/** Commente aqui !  */
		Utils.ValidToken(token)
			.then(onValid, (err) => {

				/** Commente aqui !  */
				callback({
					status: 401
					, msg: "Token de segurança invalido, faça login novamente para regularizar."
					, data: {
						expirado_em: err.expiredAt
					}
				})

			})
	};

	/** Commente aqui !  */
	const onLogin = (data, callback) => {

		if (!data) {

			/** Commente aqui !  */
			return callback({
				status: 400
				, msg: 'Informe os parametros necessários, para fazer o login.'
				, data: null
			}, null)
		}

		/** Commente aqui !  */
		if (!data.email) {
			return callback({ status: 400, msg: 'É Obrigatório informar o e-mail' });
		}

		/** Commente aqui !  */
		if (!data.password) {
			return callback({ status: 400, msg: 'É Obrigatório informar uma senha' });
		}

		/** Commente aqui !  */
		let keys = ['password', 'email'];

		/** Commente aqui !  */
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				if (keys.indexOf(key) < 0) {
					delete data[key]; // Remove qualquer parametro enviado, que está fora do pedido.
				}
			}
		}

		/** Commente aqui !  */
		let GenerateToken = (err, result) => {

			if (err) {
				return callback(err);
			}

			/** Commente aqui !  */
			const onSuccessGenerate = (token) => {

				result.data.token = token;

				return callback(null, {
					msg: result.msg
					, data: result.data
				});

			}

			/** Commente aqui !  */
			Utils.GenerateToken(result.data)
				.then(onSuccessGenerate, (err) => {
					console.warn(err);
					callback();
				})

		}

		/** Commente aqui !  */
		let GeneratePassword = (hash) => {

			data.password = hash;
			model.Login(data, GenerateToken);

		}


		/** Commente aqui !  */
		Utils.GenerateHash(data.password) // Criptografa a senha.
			.then(GeneratePassword, (err) => {
				console.warn(err);
				callback();
			})
			;



	};

	/** Commente aqui !  */
	const onFindById = (code, callback) => {

		model.FindById(code, callback);
	};

	/** Commente aqui !  */
	module.exports = {
		Register: onRegister,
		Edit: onEdit,
		Login: onLogin,
		FindById: onFindById
	};


})()