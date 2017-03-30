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
                        <Button type="primary" @click="isDeletePic(item)">D</Button>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer">

        </div>
        <!--删除确认-->
        <Modal v-model="deleteModalShow" width="260">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>此任务删除后，你的表情包就飞了~</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modalDeleteLoading" @click="comfirmDeletePic">删除
                </Button>
            </div>
        </Modal>
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
				// 删除modal标志位
				deleteModalShow: false,
				// 被删除的图片缓存
				picDelete: {},
				// 删除按钮加载动画
				modalDeleteLoading: false
			}
		},
		mounted() {
			// 初始化加载数据库中的图片
			this.loadPics();
		},
		methods: {
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
			// 清空输入框
			clearPicText(item) {
				item.text = '';
			},
			// 是否删除图片
			isDeletePic(item) {
				this.picDelete = item
				this.deleteModalShow = true
			},
			// 确认删除图片
			comfirmDeletePic() {
                // 删除按钮动画开始
                this.modalDeleteLoading = true
                // 发送删除请求
				this.$http.post('/delete/pic', {_id: this.picDelete._id, url: this.picDelete.url}).then((res) => {
					if (res.data) {
						console.log('delete result ----', res.data)
					}
					// 删除按钮动画关闭
                    this.modalDeleteLoading = true
                    // 关闭模态框
					this.deleteModalShow = false
                    // 提示删除信息
                    this.$Message.success('删除成功！');
					// 刷新图片列表
					this.loadPics()
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