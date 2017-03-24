<template>
	<div>
		<div class="pic" v-for="item in picArr">
			<img class="pic__body" :src="item.url">
			<div class="pic__text">666{{item.text}}</div>
			<div class="pic__edit">
				<Input v-model="item.text" style="width: auto" placeholder="your text ..."></Input>
				<Button type="primary" @click="clearPicText(item)">C</Button>
			</div>
		</div>
		<input type="file" @change="upload">
		<Upload action="/upload" :on-success="uploadSuccess" :on-error='uploadError'>
        	<Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    	</Upload>
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
				  
				}, (err) => {
					console.log('upload err -', err)
				})
			},
			// 图片上传成功后，加载图片
			uploadSuccess() {
				console.log('upload success!');
				this.loadPics()
			},
			// 图片上传失败后，提示信息
			uploadError() {
				console.log('upload error!');
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