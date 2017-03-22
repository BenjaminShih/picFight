import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './app.vue'

Vue.use(VueResource)

var app = new Vue({
	el: '#app',
	components: {
		App: App
	},
	// data: function() {
	// 	return{
	// 		picArr : []
	// 	}
	// },
	// mounted: function() {
	// 	// 初始化加载数据库中的图片
	// 	this.loadPics();
	// },
	// methods: {
	// 	// 清空输入框
	// 	clearPicText: function(item) {
	// 		item.text = '';
	// 	},
	// 	// 上传图片
	// 	upload: function(e) {
	// 		let formData = new FormData();
	// 		formData.append('uploadfile', e.target.files[0]);
	// 		console.log('formData', formData)
	// 		this.$http.post('/upload', formData)
	// 		.then(function (response) {
	// 		    console.log('upload success!');
	// 		    this.loadPics()
	// 		}, function(err) {
	// 			console.log('upload err -', err)
	// 		})
	// 	},
	// 	// 加载图片
	// 	loadPics: function() {
	// 		this.$http.post('/pics', {}).then(function(res) {
	// 			let arr =  res.data
	// 			if(Array.isArray(arr)) {
	// 				this.picArr = arr;
	// 			}
	// 		})
	// 	},
	// }
})