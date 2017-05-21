// iief
(() => {
	// .....
})();


// 
'use strict';

(function () {

})

const somar1 = function (a, b) { return a + b }
// const dividir = () => { }


const somar2 = new Promise((resolve, reject) => {
	if (a === undefined || b === undefined) {
		return reject();
	}

	resolve(a + b);
})

const somar3 = (a, b, callback) => {
	callback(null, a + b);
}


somar1(1, 2) // 3;
somar2(1, 2) // erro.

somar2(1, 2).then(() => {

}).error(() => {

})

somar3(1, 2, (err, valor) => {


})





