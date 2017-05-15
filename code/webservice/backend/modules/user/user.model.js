; (() => {
	'use strict';

	const db = require('../../database/db');
	const mysql = require('mysql');


	const onVerifyEmail = (email, user) => {

		return new Promise((resolve, reject) => {

			let sql = 'select count(code) as qtd from user where ?';
			let query = { email: email };

			if (user) {
				sql += ' and code != ' + db.escape(user);
			}

			db.query(sql, query, (err, result) => {

				if (err) {

					return reject(err)

				}

				if (result[0].qtd > 0) {

					resolve(true); // E-mail já cadastrado

				} else {

					resolve(false); // E-mail disponível para cadastro.

				}


			})
		})
	}

	const onRegister = (data, callback) => {

		let sql = 'insert into user set ?'
		let query = data;


		db.query(sql, query, (err, result) => {

			if (err) {

				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar o usuário, tente novamente mais tarde'
					, data: {}
				});

			}

			return callback(null, {
				error: false
				, msg: 'Usuário cadastrado com sucesso.'
				, data: {
					id: result.insertId
				}
			});
		});


	}

	const onLogin = (data, callback) => {

		let sql = 'select code, name, email from user where ? and ?';

		let query = [{ email: data.email }, { password: data.password }];

		db.query(sql, query, (err, result) => {

			if (err) {

				return callback({
					status: 500
					, msg: 'Houve um problema ao cadastrar o usuário, tente novamente mais tarde'
					, data: {}
				})

			}

			if (result.length === 0) {

				return callback({
					status: 404
					, msg: 'E-mail ou senha inválidos.'
					, data: {}
				});

			}

			if (result.length > 1) {
				return callback({
					status: 500
					, msg: 'Houve um problema ao acessar sua conta, entre em contato com a equipe'
					, data: {}
				});
			}

			return callback(null, {
				error: false
				, msg: 'Login realizado com sucesso.'
				, data: result[0]
			});

		})
	}

	const onEdit = (data, callback) => {

		let sql = 'update user set ? where ?';
		let query = [data, { code: data.code }];


		db.query(sql, query, (err, result) => {

			if (err) {

				return callback({
					status: 500
					, msg: 'Houve um problema ao atualizar o usuário, tente novamente mais tarde'
					, data: {}
				});

			}

			/*
				Após atualizar os dados, ele faz uma consulta para buscar os dados atualizados do usuário
				para retornar e gerar o novo Token de segurança..
			*/
			return callback(null, {
				error: false
				, msg: 'Usuário atualizado com sucesso.'
				, data: result
			});

		})
	}


	const onFindById = (code, callback) => {

		let sql = 'select code, name, email from user where ?';
		let query = { code: code };


		db.query(sql, query, (err, result) => {

			if (err) {

				return callback({
					status: 500
					, msg: 'Houve um problema ao atualizar o usuário, tente novamente mais tarde'
					, data: {}
				});

			}


			return callback(null, {
				error: false
				, msg: 'Dados do usuário.'
				, data: result
			});


		});
	}

	module.exports = {
		VerifyEmail: onVerifyEmail,
		Register: onRegister,
		Edit: onEdit,
		Login: onLogin,
		FindById: onFindById
	}
})()