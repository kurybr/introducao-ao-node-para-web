; (() => {

	'use strict';

	const express = require('express');

	/** Commente aqui !  */
	const Utils = require('../utils/utils.hash');
	const Log = require('../utils/utils.log');
	const model = require('./post.model');

	const routes = express.Router();



	/** Commente aqui !  */
	const onPublish = (token, data, callback) => {

		const onValid = (user) => {

			/** Commente aqui !  */
			if (!data) {

				return callback({
					status: 400
					, msg: 'Informe os parametros necessários, para cadastrar um usuário.'
					, data: null
				}, null)

			}

			/** Commente aqui !  */
			if (!data.text) {
				return callback({ status: 400, msg: 'A Postagem não pode ser vázia' });
			}

			/** Commente aqui !  */
			let keys = ['text'];

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
			data.user_code = user.code;

			/** Commente aqui !  */
			model.Publish(data, (err, result) => {

				if (err) {

					return callback(err);

				}


				return callback(null, result)

			});

		}

		/** Commente aqui !  */
		Utils.ValidToken(token)
			.then(onValid, (err) => {

				/** Commente aqui !  */
				return callback({
					status: 401
					, msg: "Token de segurança invalido, faça login novamente para regularizar."
					, data: {
						expirado_em: err.expiredAt
					}
				})
			})
	}



	/** Commente aqui !  */
	const onList = (token, post, cb) => {


		/** Commente aqui !  */
		const onValid = (user) => {

			/** Commente aqui !  */
			if (post.code) {

				post.code = Number(post.code);

			} else {

				/** Commente aqui !  */
				post = {};

			}

			/** Commente aqui !  */
			post.user_code = user.code;

			/** Commente aqui !  */
			model.List(post, (err, result) => {

				if (err) {
					return cb(err);
				}

				return cb(null, {
					msg: result.msg
					, data: result.data
				})

			})

		}

		/** Commente aqui !  */
		Utils.ValidToken(token)
			.then(onValid, (err) => {
				return cb({
					status: 401
					, msg: "Token de segurança invalido, faça login novamente para regularizar."
					, data: {
						expirado_em: err.expiredAt
					}
				})
			})
	}



	/** Commente aqui !  */
	const onRemove = (token, data, callback) => {

		/** Commente aqui !  */
		const onValid = (user) => {

			/** Commente aqui !  */
			if (!data.code) {
				return callback({
					status: 400
					, msg: "Não foi possível realizar essa operação, tente novamente mais tarde"
					, data: {}
				});
			}

			/** Commente aqui !  */
			data.code = Number(data.code);

			/** Commente aqui !  */
			model.Remove(user.code, data, (err, result) => {

				/** Commente aqui !  */
				if (err) {
					return callback(err);
				}

				/** Commente aqui !  */
				return callback(null, {
					msg: result.msg
					, data: result.data
				})

			})

		}

		/** Commente aqui !  */
		Utils.ValidToken(token)
			.then(onValid, (err) => {
				return callback({
					status: 401
					, msg: "Token de segurança invalido, faça login novamente para regularizar."
					, data: {
						expirado_em: err.expiredAt
					}
				})
			})
	}


	const onEdit = (token, post_code, data, callback) => {


		const onValid = (user) => {

			data.user_code = user.code;

		}


		Utils.ValidToken(token).then(onValid).catch((err) => {
			callback(err);
		})

	}

	/** Commente aqui !  */
	module.exports = {
		Remove: onRemove,
		Publish: onPublish,
		List: onList,
		Edit: onEdit
	};

})();