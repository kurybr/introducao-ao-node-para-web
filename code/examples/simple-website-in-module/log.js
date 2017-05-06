const filesystem = require('fs');


const onSave = (data) => {

	/** Comente aqui */
	let log_file = filesystem.createWriteStream('./logs.txt', { flags: 'a' });

	/** Comente aqui */
	log_file.write(data + '\n');

}



module.exports = {
	Save: onSave
}