const picsModel = require('../models/pics.js')

function savePicToDB(url) {
	// 也可以用这种方法
	// new picsModel({
	//     url: url,
	// }).save( function( err ){
	//     if(!err){
	//         console.log('pic is already saved in db!');
	//     } else {
	//     	console.log('mongon error when pic saving!');
	//     }
	// });

	// 增加记录 基于model操作
	let picUrl= {url: url};
	picsModel.create(picUrl, function(error){
	    if(error) {
	        console.log('mongon error when pic saving!---', error);
	    } else {
	        console.log('pic is already saved in db!');
	    }
	});
}


module.exports = {
	savePicToDB: savePicToDB,
}