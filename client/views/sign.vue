<template>
    <div class="sign-wrapper">
        <div class="sign-body">
            <Card style="width:350px">
                <Tabs type="card">
                    <Tab-pane label="登录">
                        <label for="username">账号：</label>
                        <Input placeholder="请输入账号"></Input>
                        <label for="password">密码：</label>
                        <Input type="password" placeholder="请输入密码"></Input>
                        <div class="sign-in-btn">
                            <Button type="primary" long>登录</Button>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="注册">
                        <label for="username">账号：</label>
                        <Input v-model="signupAccount" placeholder="请输入账号"></Input>
                        <label for="password">密码：</label>
                        <Input type="password" v-model="signupPassword" placeholder="请输入密码"></Input>
                        <label for="password">重复密码：</label>
                        <Input type="password" v-model="rePassword" placeholder="请再输入一遍密码"></Input>
                        <div class="sign-up-btn">
                            <Button type="primary" long @click="signup">注册</Button>
                        </div>
                    </Tab-pane>
                </Tabs>
            </Card>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
        	return {
        		// 注册账号
                signupAccount: '',
                // 注册密码
                signupPassword: '',
                // 重复密码
                rePassword: '',
            }
        },
        methods: {
            signup(){
            	console.log(66)
                if(this.signupPassword === this.rePassword) {
                    this.$axios.post('/signup', {
                        account: this.signupAccount,
                        password: this.signupPassword
                    }).then((res) => {
                        if(res.data) {
                          console.log('save data sucessfully ---', res.data)
                          this.$Message.success('用户创建成功啦！');
                          this.$router.push('/')
                        }
                    })
                } else {
                    this.$Message.error('密码和重复密码不一致！请修改哦！');
                }
            }
        },
    }
</script>
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