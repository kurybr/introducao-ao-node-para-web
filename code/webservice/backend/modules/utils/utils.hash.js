; (() => {
	'use strict';

	/** Comente aqui */
	const crypto = require('crypto');

	/** Comente aqui */
	const jwt = require('jsonwebtoken');

	/** Comente aqui */
	const onGenerateHash = (data) => {

		/** Commente aqui !  */
		return new Promise((resolve, reject) => {

			/** Comente aqui */
			if (!data) {

				/** Comente aqui */
				const err = new Error('Envie algum valor como parametro.');

				/** Comente aqui */
				return reject(err);
			}

			try {

				/** Comente aqui */
				let encrypt = crypto.createHash('MD5').update(data).digest('base64');

				/** Comente aqui */
				resolve(encrypt);

				/** Comente aqui */
			} catch (err) {

				/** Comente aqui */
				return reject(err);
			}

		})

	};

	/** Comente aqui */
	const onGenerateToken = (data) => {

		return new Promise((resolve, reject) => {

			/** Comente aqui */
			if (!data) {
				const err = new Error('Envie algum valor como parametro.');
				return reject(err);
			}

			/** Comente aqui */
			try {

				/** Comente aqui */
				const secret = "one-secret";

				/** Comente aqui */
				const option = { expiresIn: (1440 * 60) }

				/** Comente aqui */
				const token = jwt.sign(data, secret, option);

				/** Comente aqui */
				resolve(token);

			} catch (err) {

				/** Comente aqui */
				reject(err);
			}


		})

	};

	const onValidToken = (data) => {

		return new Promise((resolve, reject) => {

			/** Comente aqui */
			if (!data) {
				const err = new Error('É obrigatório enviar um Token.');
				return reject(err);
			}

			try {

				/** Comente aqui */
				const secret = "one-secret";

				/** Comente aqui */
				jwt.verify(data, secret, (err, decode) => {

					/** Comente aqui */
					if (err) {
						return reject(err);
					}

					/** Comente aqui */
					resolve(decode);

				})

			} catch (err) {

				return reject(err);

			}
		})

	};


	/** Comente aqui */
	module.exports = {
		GenerateHash: onGenerateHash,
		GenerateToken: onGenerateToken,
		ValidToken: onValidToken
	};


})()