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

function findPicsFromDB(query) {
	return new Promise((resolve, reject) => {
		picsModel.find(query, (err, arr) => { 
			if(err) {
				return reject(err);
			}
			return resolve(arr);
		});
	});
}

// 删除一张图片
function deletePicFromDB(query) {
	console.log(query)
	return new Promise((resolve, reject)=> {
		picsModel.remove(query, (err, result) => {
			if(err) {
				return reject(err);
			}
			return resolve(result);
		})
	})
}

module.exports = {
	savePicToDB,
	findPicsFromDB,
	deletePicFromDB,
}