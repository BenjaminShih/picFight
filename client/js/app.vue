<template>
    <div>
        <div id="wrapper">
            <div id="header">
                <div class="header__body">
                    <div class="header__logo">
                        picFight
                    </div>
                    <div class="header__nav">
                        nav
                    </div>
                </div>
            </div>
            <!-- 	<div class="spin-container" v-if="loading">
                    <Spin fix></Spin>
                </div> -->
            <div id="main" v-if="!loading">
                <div class="pic" v-for="item in picArr">
                    <img class="pic__body" :src="item.url">
                    <div class="pic__text">{{item.text}}</div>
                    <div class="pic__edit">
                        <Input v-model="item.text" style="width: auto" placeholder="your text ..."></Input>
                        <Button type="primary" @click="clearPicText(item)">C</Button>
                    </div>
                </div>
                <Upload action="/upload" :on-success="uploadSuccess" :on-error='uploadError'>
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
            </div>
            <div id="footer">

            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				// 图片对象数组
				picArr: [],
				// 正在加载
				loading: false,
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
				this.loading = true
				this.$http.post('/pics', {}).then((res) => {
					this.loading = false
					let arr = res.data
					if (Array.isArray(arr)) {
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
<style lang="stylus" rel="stylesheet/stylus" scoped>
    #wrapper
        background #eee

    #header
        height 50px
        line-height 50px
        background #FFF
        box-shadow 0 1px 1px rgba(0, 0, 0, 0.08)

    .header__body
        width 90%
        margin 0 auto

    .header__nav, .header__logo
        display inline-block

    .header__nav
        float right

    #main
        margin 20px auto
        width 90%
        min-height 500px
        background #FFF

    #footer
        min-height 100px
        background #FFF

    .pic
        position relative
        display inline-block
        margin 20px

    .pic__text
        position absolute
        bottom 40px
        width 100%
        text-align center

    .pic__body
        width 190px
        height 190px

    .pic__edit
        margin 0 auto
        text-align center

    .pic__edit__clear
        cursor: pointer
        margin-left 5px
</style>