<template>
  <div id="wrapper">
    <layout-header></layout-header>
    <div id="main" v-if="!loading">
      <div class="pic" v-for="item in picArr">
        <img class="pic__body" :src="item.url">
        <div class="pic__text"
             :style="{fontSize: item.fontSize + 'px', fontWeight: item.fontWeight, left: `calc(50% - ${item.xDis}px)`,  top:`calc(50% - ${item.yDis}px)`}">
          {{item.text}}
        </div>
        <div class="pic__edit">
          <Input v-model="item.text" style="width: auto" placeholder="your text ..."></Input>
          <div>
            <Button type="warning" @click="clearPicText(item)">C</Button>
            <Button type="error" @click="isDeletePic(item)">D</Button>
            <Dropdown trigger="custom" :visible="item.picSettingShow">
              <Button type="primary" @click="togglePicSetting(item)">
                S
                <Icon type="arrow-down-b"></Icon>
              </Button>
              <Dropdown-menu slot="list">
                <div class="setting-list">
                  <div><span>字号:</span>
                    <Input-number :min="12" v-model="item.fontSize" size="small"></Input-number>
                  </div>
                  <div><span>粗细:</span>
                    <Input-number :min="400" :step="100" v-model="item.fontWeight" size="small"></Input-number>
                  </div>
                  <div><span>上下:</span>
                    <Input-number :min="0" v-model="item.yDis" size="small"></Input-number>
                  </div>
                  <div><span>左右:</span>
                    <Input-number :min="0" v-model="item.xDis" size="small"></Input-number>
                  </div>
                </div>
              </Dropdown-menu>
            </Dropdown>
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
  import layoutHeader from './layout-header.vue'
  let showUploading
  export default {
    components: {
      layoutHeader
    },
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
        modalDeleteLoading: false,
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
        this.$axios.post('/pics', {}).then((res) => {
          this.loading = false
          let arr = res.data
          if (Array.isArray(arr)) {
            arr.forEach((i) => {
              i.text = '';
              i.fontSize = 18;
              i.fontWeight = 800;
              i.xDis = 0;
              i.yDis = 0;
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
        this.$axios.post('/delete/pic', { _id: this.picDelete._id, url: this.picDelete.url }).then((res) => {
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
      // 显示图片设置
      togglePicSetting(item) {
        // 对象属性必须用$set强制视图更新
        this.$set(item, 'picSettingShow', !item.picSettingShow)
      },
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #wrapper
    background #eee

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
    left: 50%
    top: 50%
    transform translateX(-50%) translateY(-50%)
    display inline-block
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

  .ivu-input-number
    display inline-block
    margin 5px auto

  .setting-list > div
    margin

  .setting-list > div span:first-child
    display inline-block
    width 32px

  .setting-list > div > div
    display inline-block
    width calc(100% - 42px)
</style>