<template>
  <div class="mask">
    <div class="dialog">
      <div style="width: 100%;margin-bottom: 40px">
        <svg-icon name="close" style="float: right;color: #000c17;font-size: 20px " @click="closeDialog" />
      </div>
      <div class="head">
        <span style="font-size: 22px;font-weight: bolder;text-align: center">同步账号</span>
      </div>
      <div v-if="model" class="form">
        <div class="form-input">
          <svg-icon name="account" style="color: inherit" />
          <input ref="account" placeholder="用户名">
        </div>
        <div class="form-input">
          <svg-icon name="lock" />
          <input ref="password" placeholder="密码" type="password">
        </div>
        <button class="login-button" @click="login">
          <span v-if="!logging">登陆</span>
          <span v-else class="logging">• • •</span>
        </button>
      </div>
      <div v-else class="form">
        <div class="form-input">
          <svg-icon name="account" style="color: inherit" />
          <input ref="account" placeholder="用户名">
        </div>
        <div class="form-input">
          <svg-icon name="lock" />
          <input ref="password" placeholder="密码" type="password">
        </div>
        <button class="login-button" @click="register">
          <span v-if="!logging">注册</span>
          <span v-else class="logging">• • •</span>
        </button>
      </div>
      <span style="color: #aaaaaa;margin-top: 10px;font-size: 10px">{{ model?'登陆账号后可以同步配置信息':'密码会经过MD5加密后再传输到服务器' }}</span>
      <span class="discolour" style="margin-top: 40px" @click="switchModel">{{ model?'注册账号':'账号登陆' }} ></span>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { loginAccount, registerAccount } from '@/api/setting'
import Cookie from 'js-cookie'
import '@lottiefiles/lottie-player'
import QRCodeLoading from '@/assets/lottie/qrcode.json'
import { message } from 'ant-design-vue'
import MD5 from 'js-md5'
export default defineComponent({
  name: 'LoginDialog',
  setup() {
    const store = useStore()
    const model = ref(true) // true:登录 false:注册
    const account = ref()
    const password = ref()
    const logging = ref(false)

    const switchModel = () => {
      model.value = !model.value
    }

    const login = async() => {
      logging.value = true
      const acc = account.value.value
      let pass = password.value.value
      const model = accountCheck(acc, pass)
      if (model !== -1) {
        pass = MD5(pass)
        const param = {
          name: acc,
          pwd: pass
        }
        await loginAccount(param).then((res:any) => {
          if (res.code === 200) {
            loginSuccess(res)
          } else {
            message.error(res.msg)
          }
          logging.value = false
        })
      }
    }

    const loginSuccess = async(res:any) => {
      console.log(res)
      store.commit('setSettingLoginState', true)
      store.commit('setTokenValue', res.data.token);
      localStorage.setItem('tokenValue', res.data.token)
      localStorage.setItem('settingUser', res.data.username)
      closeDialog()
      message.success('欢迎!~' + res.data.username);
    }

    const register = async() => {
      logging.value = true
      const acc = account.value.value
      let pass = password.value.value
      const model = accountCheck(acc, pass)
      if (model !== -1) {
        pass = MD5(pass)
        const param = {
          name: acc,
          pwd: pass
        }
        await registerAccount(param).then((res:any) => {
          if (res.code === 200) {
            registerSuccess(res)
          } else {
            message.error(res.msg)
          }
          logging.value = false
        })
      }
    }
  
    const registerSuccess = async(res:any) => {
      console.log(res)
      switchModel()
      message.success('注册成功，请登陆');
    }

    const accountCheck = (account: string, password: string) => {
      if (account !== '' && password !== '') {
      } else {
        message.error('账号密码不能为空')
        return -1
      }
    }

    const closeDialog = () => {
      store.commit('setShowDialog', -1)
    }

    return {
      model,
      QRCodeLoading,
      account,
      password,
      logging,
      closeDialog,
      switchModel,
      login,
      register
    }
  }
})
</script>

<style scoped>
.mask{
  display: flex;
}
.dialog{
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #FFFFFF;
  width: 500px;
  height: 550px;
  padding: 20px;
}
.qr-code{
  position: relative;
  border: #cccccc 1px dashed;
  margin-top: 30px;
  width: 300px;
  height: 300px;
/*  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;*/
}
.qr-mask{
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.9;
  background: #5f5f5f;
}
.qr-loading{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.refresh-button{
  border: none;
  outline: none;
  cursor: pointer;
  background: #FFFFFF;
}
.refresh-button:active{
  background: #d0d0d0;
}
.form{
  margin-top: 30px;
  padding-top: 20px;
  width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-input{
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  background: #f5f5f7;
  margin: 15px 0;
  padding: 8px 10px;
  border-radius: 6px;
}
input{
  font-size: 20px;
  outline: none;
  border: none;
  background: none;
  margin-left: 8px;
  font-weight: 600;
}
input:focus{
  color: var(--primary-color);
}
.login-button{
  height: 45px;
  width: 100%;
  font-size: 20px;
  font-weight: bolder;
  margin-top: 50px;
  border-radius: 6px;
  border: 1px solid var(--primary-color);
  padding: 6px 10px;
  color: var(--primary-color);
  background: var(--light-color);
  cursor: pointer;
}

.logging{
  animation: logging 1s infinite  alternate;
}
@keyframes logging {
  form{
    opacity: 1;
  }
  to{
    opacity: 0.2;
  }
}

::-webkit-input-placeholder {
  color: #aaaaaa;
}
::-moz-placeholder{
  color: #aaaaaa;
}
</style>
