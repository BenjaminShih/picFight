<template>
    <div id="wrapper">
        <div id="header">
            <div class="header__body">
                <div class="header__logo">
                    picFight
                </div>
                <div class="header__uploader">
                    <Upload action="/upload"
                            :on-progress="uploading"
                            :on-success="uploadSuccess"
                            :on-error='uploadError'
                            :show-upload-list="false">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
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
                    <div>
                        <Button type="primary" @click="clearPicText(item)">C</Button>
                        <Button type="primary" @click="deletePic(item)">D</Button>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer">

        </div>
    </div>
</template>

<script type="text/javascript">
    let showUploading
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
            // 删除图片
            deletePic(item) {
				console.log('item._id', {_id: item._id, url: item.url})
	            this.$http.post('/delete/pic', {_id: item._id, url: item.url}).then((res) => {
                    if(res.data) {
                    	console.log('delete result ----', res.data)
                    }
                    this.loadPics()
	            })
            },
            uploading() {
                showUploading = this.$Message.loading('正在上传啦...', 0);
            },
			uploadSuccess() {
                setTimeout(showUploading, 0);
                this.$Message.success('上传成功！');
				this.loadPics()
			},
			// 图片上传失败后，提示信息
			uploadError(err) {
                setTimeout(showUploading, 0);
                this.$Message.error('对方不想和你说话，并且向你抛出了一个上传异常！', err);
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

    .header__nav, .header__logo, .header__uploader
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
        top: 160px
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