<template>
	<div>
		<div class="pic" v-for="item in picArr">
			<img class="pic__body" :src="item.url">
			<div class="pic__text">{{item.text}}</div>
			<div class="pic__edit">
				<input type="text" class="pic__edit__text" v-model="item.text">
				<button class="pic__edit__clear" @click="clearPicText(item)">C222</button>
			</div>
		</div>
		<input type="file" @change="upload">
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return{
				picArr : []
			}
		},
		mounted() {
			// 初始化加载数据库中的图片
			this.loadPics();
		},
		methods: {
			// 清空输入框
			clearPicText(item) {
				item.text = '';
			},
			// 上传图片
			upload(e) {
				let formData = new FormData();
				formData.append('uploadfile', e.target.files[0]);
				this.$http.post('/upload', formData)
				.then((response) => {
				    console.log('upload success!');
				    this.loadPics()
				}, (err) => {
					console.log('upload err -', err)
				})
			},
			// 加载图片
			loadPics() {
				this.$http.post('/pics', {}).then((res) => {
					let arr =  res.data
					if(Array.isArray(arr)) {
						arr.forEach((i) => {
							i.text = '';
						});
						this.picArr = arr;
					}
				})
			},
		}
	}
		
</script>
<style type="text/css">
	.pic {
		position: relative;
		display: inline-block;
		margin: 20px;
	}
	.pic__text {
		position: absolute;
		bottom: 40px;
		width: 100%;
		text-align: center;
	}
	.pic__body {
		width: 190px;
		height: 190px;
	}
	.pic__edit {
		margin: 0 auto;
		text-align: center;
	}
	.pic__edit__clear {
		cursor: pointer;
		margin-left: 5px;
	}
</style>