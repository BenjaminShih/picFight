const userModel = require('../models/user')


// 存储用户
function saveUserToDB(user) {
	return new Promise((resolve, reject) => {
		userModel.create(user, (err) => {
			if(err) return reject(err)
			return resolve(true)
		})
	})
}

function findUserFromDB(user) {
	console.log('console.log(user)', console.log(user))
	return new Promise((resolve, reject) => {
		userModel.findOne(user, (err, res) => {
			if(err) return reject(err)
			return resolve(res)
		})
	})
}

module.exports = {
	saveUserToDB,
	findUserFromDB,
}