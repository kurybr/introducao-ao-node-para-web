; (function () {
	'use strict';

	/** Commente aqui !  */
	const db = require('../../database/db');
	const mysql = require('mysql');

	/** Commente aqui !  */
	const onPublish = (data, callback) => {

		/** Commente aqui !  */
		let sql = 'insert into post set ?';
		let query = data;

		/** Commente aqui !  */
		db.query(sql, query, (err, result) => {

			if (err) {

				/** Commente aqui !  */
				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar uma nova postagem, tente novamente mais tarde'
					, data: {}
				})

			}

			/** Commente aqui !  */
			return callback(null, {
				error: false
				, msg: 'Postagem cadastrada com sucesso.'
				, data: {
					id: result.insertId
				}
			});

		})
	}

	/** Commente aqui !  */
	const onList = (post, callback) => {

		/** Commente aqui !  */
		let sql = 'select * from post where user_code = ' + db.escape(post.user_code);
		let query = post;

		/** Commente aqui !  */
		if (post.code) {

			sql += ' and code = ' + db.escape(post.code);

		}


		/** Commente aqui !  */
		db.query(sql, (err, result) => {


			if (err) {
				/** Commente aqui !  */
				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar uma nova postagem, tente novamente mais tarde'
					, data: {}
				})
			}

			/** Commente aqui !  */
			return callback(null, {
				msg: 'Lista de postagens carregada com sucesso.'
				, data: result
			});

		});

	}


	/** Commente aqui !  */
	const onRemove = (user, data, cb) => {

		/** Commente aqui !  */
		let sql = {
			sql: 'delete from post where code = ? and user_code = ?'
			, values: [data.code, user]
		}

		/** Commente aqui !  */
		db.query(sql, (err, result) => {

			/** Commente aqui !  */
			if (err) {

				return cb({
					status: 500
					, msg: 'Houve um problema ao remover sua postagem, tente novamente mais tarde'
					, data: {}
				});

			}

			/** Commente aqui !  */
			if (result.affectedRows === 0) {

				return cb(null, {
					msg: "Você não possui permissão para remover essa postagem."
					, data: {}
				});

			}


			/** Commente aqui !  */
			return cb(null, {
				msg: "Postagem removida com sucesso."
				, data: {}
			})


		})

	}


	/** Commente aqui !  */
	module.exports = {
		Publish: onPublish,
		List: onList,
		Remove: onRemove
	};


}());