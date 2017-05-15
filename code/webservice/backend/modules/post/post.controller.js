; (() => {

	'use strict';

	const express = require('express');


	const Utils = require('../utils/utils.hash');
	const Log = require('../utils/utils.log');
	const model = require('./post.model');

	const routes = express.Router();



    /*
    Criar - Criar Postagem
    - Função responsável por cadastrar novas postagens.
    @params - dados.texto - String
    @params - Token - String
    return - Id da postagem !
    */

	const onPublish = (token, data, callback) => {

		const onValid = (user) => {


			if (!data) {

				return callback({
					status: 400
					, msg: 'Informe os parametros necessários, para cadastrar um usuário.'
					, data: null
				}, null)

			} // Não houve parametros.

			if (!data.text) {
				return callback({ status: 400, msg: 'A Postagem não pode ser vázia' });
			}

			let keys = ['text'];

			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					if (keys.indexOf(key) < 0) {
						delete data[key]; // Remove qualquer parametro enviado, que está fora do pedido.
					}
				}
			}

			data.createdAt = new Date();
			data.user_code = user.code;


			model.Publish(data, (err, result) => {

				if (err) {

					return callback(err);

				}


				return callback(null, result)

			});

		}


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



    /*
        Listar - Listagem de Postagens
        - Função responsável por listar as postagens do usuário
        @params - post.cod - Int (opcional)
        @params - Token - String
        return - Lista de postagens do usuário ( caso tenha passado o ID retorna apenas uma postagem.)
     */
	const onList = (token, post, cb) => {



		const onValid = (user) => {


			if (post.code) {

				post.code = Number(post.code);

			} else {

				post = {};

			}

			post.user_code = user.code;

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




	const onRemove = (token, data, callback) => {

		const onValid = (user) => {


			if (!data.code) {
				return callback({
					status: 400
					, msg: "Não foi possível realizar essa operação, tente novamente mais tarde"
					, data: {}
				});
			}

			data.code = Number(data.code);

			model.Remove(user.code, data, (err, result) => {

				if (err) {
					return callback(err);
				}

				return callback(null, {
					msg: result.msg
					, data: result.data
				})

			})

		}

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


	module.exports = {
		Remove: onRemove,
		Publish: onPublish,
		List: onList
	};

})();