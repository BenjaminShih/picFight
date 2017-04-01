<template>
    <div class="sign-wrapper">
        <div class="sign-body">
            <Card style="width:350px">
                <Tabs type="card">
                    <Tab-pane label="登录">
                        <label for="username">账号：</label>
                        <Input v-model="value" placeholder="请输入账号"></Input>
                        <label for="password">密码：</label>
                        <Input type="password" v-model="value" placeholder="请输入密码"></Input>
                        <div class="sign-in-btn">
                            <Button type="primary" long>登录</Button>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="注册">
                        <label for="username">账号：</label>
                        <Input v-model="value" placeholder="请输入账号"></Input>
                        <label for="password">密码：</label>
                        <Input type="password" v-model="value" placeholder="请输入密码"></Input>
                        <label for="password">重复密码：</label>
                        <Input type="password" v-model="value" placeholder="请再输入一遍密码"></Input>
                        <div class="sign-up-btn">
                            <Button type="primary" long>注册</Button>
                        </div>
                    </Tab-pane>
                </Tabs>
            </Card>
        </div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .sign-wrapper
      height 100%
      width 100%
      position relative
    .sign-body
      position absolute
      left 50%
      top 50%
      transform translateX(-50%) translateY(-50%)
    .sign-in-btn
      margin-top 30px
    .sign-up-btn
      margin-top 20px
</style>