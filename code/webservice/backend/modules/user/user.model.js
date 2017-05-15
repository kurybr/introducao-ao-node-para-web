; (() => {
	'use strict';

	/** Commente aqui !  */
	const db = require('../../database/db');
	const mysql = require('mysql');

	/** Commente aqui !  */
	const onVerifyEmail = (email, user) => {

		return new Promise((resolve, reject) => {

			/** Commente aqui !  */
			let sql = 'select count(code) as qtd from user where ?';
			let query = { email: email };

			/** Commente aqui !  */
			if (user) {
				sql += ' and code != ' + db.escape(user);
			}

			/** Commente aqui !  */
			db.query(sql, query, (err, result) => {

				if (err) {
					return reject(err)
				}

				/** Commente aqui !  */
				if (result[0].qtd > 0) {

					resolve(true); // E-mail já cadastrado

				} else {

					resolve(false); // E-mail disponível para cadastro.

				}


			})
		})
	}

	/** Commente aqui !  */
	const onRegister = (data, callback) => {

		let sql = 'insert into user set ?'
		let query = data;

		/** Commente aqui !  */
		db.query(sql, query, (err, result) => {

			/** Commente aqui !  */
			if (err) {

				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar o usuário, tente novamente mais tarde'
					, data: {}
				});

			}

			/** Commente aqui !  */
			return callback(null, {
				error: false
				, msg: 'Usuário cadastrado com sucesso.'
				, data: {
					id: result.insertId
				}
			});
		});


	}


	/** Commente aqui !  */
	const onLogin = (data, callback) => {

		/** Commente aqui !  */
		let sql = 'select code, name, email from user where ? and ?';

		/** Commente aqui !  */
		let query = [{ email: data.email }, { password: data.password }];

		/** Commente aqui !  */
		db.query(sql, query, (err, result) => {

			if (err) {
				/** Commente aqui !  */
				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar o usuário, tente novamente mais tarde'
					, data: {}
				})

			}

			/** Commente aqui !  */
			if (result.length === 0) {

				return callback({
					status: 404
					, msg: 'E-mail ou senha inválidos.'
					, data: {}
				});

			}

			/** Commente aqui !  */
			if (result.length > 1) {
				return callback({
					status: 500
					, msg: 'Houve um problema ao acessar sua conta, entre em contato com a equipe'
					, data: {}
				});
			}

			/** Commente aqui !  */
			return callback(null, {
				error: false
				, msg: 'Login realizado com sucesso.'
				, data: result[0]
			});

		})
	}

	/** Commente aqui !  */
	const onEdit = (data, callback) => {

		/** Commente aqui !  */
		let sql = 'update user set ? where ?';

		/** Commente aqui !  */
		let query = [data, { code: data.code }];

		/** Commente aqui !  */
		db.query(sql, query, (err, result) => {

			if (err) {
				/** Commente aqui !  */
				return callback({
					status: 500
					, msg: 'Houve um problema ao atualizar o usuário, tente novamente mais tarde'
					, data: {}
				});

			}

			/** Commente aqui !  */
			return callback(null, {
				error: false
				, msg: 'Usuário atualizado com sucesso.'
				, data: result
			});

		})
	}

	/** Commente aqui !  */
	const onFindById = (code, callback) => {

		/** Commente aqui !  */
		let sql = 'select code, name, email from user where ?';

		/** Commente aqui !  */
		let query = { code: code };

		/** Commente aqui !  */
		db.query(sql, query, (err, result) => {

			if (err) {

				/** Commente aqui !  */
				return callback({
					status: 500
					, msg: 'Houve um problema ao atualizar o usuário, tente novamente mais tarde'
					, data: {}
				});

			}

			/** Commente aqui !  */
			return callback(null, {
				error: false
				, msg: 'Dados do usuário.'
				, data: result
			});


		});
	}

	/** Commente aqui !  */
	module.exports = {
		VerifyEmail: onVerifyEmail,
		Register: onRegister,
		Edit: onEdit,
		Login: onLogin,
		FindById: onFindById
	}
})()