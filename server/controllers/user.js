const userModel = require('../models/user')


// 存储用户
function saveUserToDB(user) {
	return new Promise((resolve, reject) => {
		userModel.create(user, (err) => {
			if(err) return reject(err)
			return resolve({result:true})
		})
	})
}

module.exports = {
	saveUserToDB,
}