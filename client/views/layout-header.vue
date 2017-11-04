<template>
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
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #header {
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
  }
   
</style>