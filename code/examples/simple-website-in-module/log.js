(() => {

	'use strict';

	const filesystem = require('fs');


	const onSave = (data) => {

		/** Comente aqui */
		let log_file = filesystem.createWriteStream('./logs.txt', { flags: 'a' });

		/** Comente aqui */
		log_file.write(data + '\n');

	}


	/** Comente aqui .. */
	module.exports = {
		Save: onSave
	}

})();