; (function () {
	'use strict';

	const db = require('../../database/db');

	const mysql = require('mysql');


	const onPublish = (data, callback) => {

		let sql = 'insert into post set ?';
		let query = data;

		db.query(sql, query, (err, result) => {

			if (err) {

				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar uma nova postagem, tente novamente mais tarde'
					, data: {}
				})

			}

			return callback(null, {
				error: false
				, msg: 'Postagem cadastrada com sucesso.'
				, data: {
					id: result.insertId
				}
			});

		})
	}

	const onList = (post, callback) => {

		let sql = 'select * from post where user_code = ' + db.escape(post.user_code);
		let query = post;

		if (post.code) {

			sql += ' and code = ' + db.escape(post.code);

		}



		db.query(sql, (err, result) => {


			if (err) {

				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar uma nova postagem, tente novamente mais tarde'
					, data: {}
				})
			}

			return callback(null, {
				msg: 'Lista de postagens carregada com sucesso.'
				, data: result
			});

		});

	}

	function Editar(usuario, dados, cb) {

		let sql = {
			sql: 'update postagem set texto = ? where cod = ? and cod_usuario = ?'
			, values: [dados.texto, dados.cod, usuario]
		}

		db.query(sql, (err, resultado) => {

			if (err) {

				return cb({
					status: 500
					, msg: 'Houve um problema ao atualizar sua postagem, tente novamente mais tarde'
					, data: {}
				})

			}


			if (resultado.affectedRows === 0) {

				return cb(null, {
					msg: "Você não possui permissão para atualizar essa postagem."
					, data: {}
				});

			}

			return cb(null, {
				msg: "Postagem atualizada com sucesso."
				, data: {}
			});

		})

	}


	const onRemove = (user, data, cb) => {


		let sql = {
			sql: 'delete from post where code = ? and user_code = ?'
			, values: [data.code, user]
		}

		db.query(sql, (err, result) => {


			if (err) {

				return cb({
					status: 500
					, msg: 'Houve um problema ao remover sua postagem, tente novamente mais tarde'
					, data: {}
				});

			}


			if (result.affectedRows === 0) {

				return cb(null, {
					msg: "Você não possui permissão para remover essa postagem."
					, data: {}
				});

			}

			return cb(null, {
				msg: "Postagem removida com sucesso."
				, data: {}
			})


		})

	}

	module.exports = {
		Publish: onPublish,
		List: onList,
		Remove: onRemove
	};


}());