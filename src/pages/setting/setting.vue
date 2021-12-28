<template>
  <div style="user-select: none;width: 1000px">
    <LoginDialog v-if="isShowDialog===2" class="login-dialog" />
  <!-- <div class="setting-page"> -->
    <span class="h1">设置</span>
    <Tabs :tab-list="tabList" @changeTab="changeTab" :tabName="goToName" style="margin-bottom: 20px"/>
    <!-- <keep-alive>
      <component :is="currentTabComponent" />
    </keep-alive> -->
    <div class="item-container" style="margin-top: 32px">
      <div class="item-row">
        <div class="left">
          <svg-icon name="user" class="user-icon" />
          <span v-if="!isLogin" class="title discolour" style="padding-left: 0.5rem" @click="showDialog">绑定同步账号></span>
          <span v-if="isLogin" style="font-size: 16px; font-weight: 500; padding-left: 0.5rem" v-text="userName"></span>
        </div>
        <div class="right">
          <span v-if="isLogin" class="item" @click="uploadInfo">上传数据</span>
          <span v-if="isLogin" class="item" @click="syncInfo">同步数据</span>
          <span v-if="isLogin" class="item" @click="logout">退出登陆</span>
        </div>
      </div>
    </div>

    <h3>常规</h3>
    <div class="item-container">
      <div class="item-row">
        <div class="left">
          <span class="title">语言</span>
        </div>
        <div class="right">
          <ASpace>
            <ASelect
              ref="select"
              v-model:value="value_language"
              style="width: 200px; margin: 0 5px;"
              dropdownClassName="item-select"
              :options="options_language"
              @focus="focus"
              @change="(value, option) => handleChange(value, option, 'language')"
            ></ASelect>
          </ASpace>
        </div>
      </div>
      <div class="item-row">
        <div class="left">
          <span class="title">外观</span>
        </div>
        <div class="right">
          <ASpace>
            <ASelect
              ref="select"
              v-model:value="value_theme"
              style="width: 200px; margin: 0 5px;"
              dropdownClassName="item-select"
              :options="options_theme"
              @focus="focus"
              @change="(value, option) => handleChange(value, option, 'theme')"
            ></ASelect>
          </ASpace>
        </div>
      </div>
    </div>

    <h3>播放</h3>
    <div class="item-container">
      <div class="item-row">
        <div class="left">
          <span class="title">音质选择</span>
        </div>
        <div class="right">
          <ASpace>
            <ASelect
              ref="select"
              v-model:value="value_quality"
              style="width: 200px; margin: 0 5px;"
              dropdownClassName="item-select"
              :options="options_quality"
              @focus="focus"
              @change="(value, option) => handleChange(value, option, 'quality')"
            ></ASelect>
          </ASpace>
        </div>
      </div>
    </div>

    <h3>歌词</h3>
    <div class="item-container last">
      <div class="item-row">
        <div class="left">
          <span class="title">显示歌词翻译</span>
        </div>
        <div class="right">
          <ASwich 
            :checked="isShowTrans?true:''" 
            @change="(value, event) => handleChange(value, event, 'showTrans')"
            style="margin: 0 5px;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import Tabs from '@/components/Tabs.vue'
import { useRoute } from 'vue-router'
import { Select, Space, Switch, message } from 'ant-design-vue'
import LoginDialog from './components/LoginDialog.vue'
import { isUserLogin, logoutAccount, updateUserInfo, getUserInfo } from '@/api/setting'
import axios from 'axios'
export default defineComponent({
  name: 'Setting',
  components: {
    Tabs,
    ASelect: Select,
    ASpace: Space,
    ASwich: Switch,
    LoginDialog
  },
  setup(props, ctx) {
    const store = useStore()
    const route = useRoute()
    const tabList = [
      { title: '账号', name: 'Account' },
      { title: '常规', name: 'Common' },
      { title: '播放', name: 'Playing'}
    ]
    const currentTabComponent = ref('Account')
    const changeTab = (tabName:string) => {
      currentTabComponent.value = tabName
    }
    const value_language = computed(() => store.state.language)
    const value_theme = computed(() => store.state.theme)
    const value_quality = computed(() => store.state.quality)
    const isShowTrans = computed(() => store.state.showTrans)
    const isLogin = computed(() => store.state.settingLoginState)
    const isShowDialog = computed(() => store.state.showDialog)
    const userName = ref("Test User 测试用户名")
    const options_language = ref([{
      value: 'zh',
      label: 'zh 简体中文',
    }, {
      value: 'en',
      label: 'en English',
    }, {
      value: 'jp',
      label: 'jp 日本語',
    }]);

    const options_theme = ref([{
      value: 'default',
      label: '自动',
    }, {
      value: 'enki',
      label: '橙色',
    }, {
      value: 'dark',
      label: '暗色',
    }]);
    
    const options_quality = ref([{
      value: 'low',
      label: '普通-128Kbps',
    }, {
      value: 'nomal',
      label: '较高-192Kbps',
    }, {
      value: 'high',
      label: '极高-320Kbps',
    }, {
      value: 'flac',
      label: '无损-FLAC',
    }])

    watch(isLogin, () => {
      userName.value = <string>localStorage.getItem('settingUser')
    })

    const focus = () => {
      console.log('focus');
    };

    const handleChange = (value:any, option:any, label:string) => {
      switch (label) {
        case 'language': {
          store.commit('setLanguage', value)
          break
        }
        case 'theme': {
          store.commit('setTheme', value)
          break
        }
        case 'quality': {
          store.commit('setQuality', value)
          break
        }
        case 'showTrans': {
          store.commit('setShowTrans', value)
          break
        }
      }
      console.log(`selected ${value}`)
    };

    const showDialog = () => {
      store.commit('setShowDialog', 2)
    }

    const logout = () => {
      logoutAccount().then((res:any) => {
        if (res.code === 200) {
          store.commit('setSettingLoginState', false);
          localStorage.removeItem('settingUser')
          localStorage.removeItem('tokenValue')
          message.info('成功退出');
        }
      })
    }

    const refreshInfo = () => {
      isUserLogin().then((res:any) => {
        if (res.code === 200) {
          store.commit('setSettingLoginState', true)
          userName.value = <string>localStorage.getItem('settingUser');
        }
        else {
          store.commit('setSettingLoginState', false)
        }
        if (localStorage.getItem('language')) {
          store.commit('setLanguage', localStorage.getItem('language'))
        }
        if (localStorage.getItem('theme')){
          store.commit('setTheme', localStorage.getItem('theme'))
        }
        if (localStorage.getItem('quality')) {
          store.commit('setQuality', localStorage.getItem('quality'))
        }
        if (localStorage.getItem('showTrans')) {
          store.commit('setShowTrans', localStorage.getItem('showTrans'))
        }
      })
      
    }

    const uploadInfo = async() => {
      const data = {
        'language': store.state.language,
        'theme': store.state.theme,
        'quality': store.state.quality,
        'showTrans': store.state.showTrans
      }
      await updateUserInfo(data).then((res:any) => {
        if (res.code === 200) {
          message.success(res.msg)
        }
        else {
          message.error(res.msg)
        }
      })
    }

    const syncInfo = async() => {
      await getUserInfo().then((res:any) => {
        if (res.code === 200) {
          const data = res.data.settings
          store.commit('setLanguage', data.language)
          store.commit('setTheme', data.theme)
          store.commit('setQuality', data.quality)
          store.commit('setShowTrans', data.showTrans)
          message.success('同步成功')
        }
        else {
          message.error('同步失败')
        }
      })
    }
  
    onMounted(() => {
      refreshInfo()
    })

    return {
      route,
      tabList,
      currentTabComponent,
      changeTab,
      focus,
      handleChange,
      logout,
      showDialog,
      uploadInfo,
      syncInfo,
      isLogin,
      isShowDialog,
      userName,
      value_language,
      value_theme,
      value_quality,
      options_language,
      options_theme,
      options_quality,
      isShowTrans,
    }
  }
})
</script>

<style lang="less" scoped>
.login-dialog{
  min-width: 1200px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 5px;
  left: -100px;
  z-index: 10000;
}
::v-deep(.ant-select:not(.ant-select-customize-input)){
  // cursor: default;
  .ant-select-selector{
    background-color: #fafafa;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
  }
}

::v-deep(.ant-select:not(.ant-select-customize-input):hover){
  .ant-select-selector{
    border-color: #c9c9c9;
  }
}

::v-deep(.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)){
  .ant-select-selector{
    border-color: #c9c9c9;
    box-shadow: none;
  }
}

::v-deep(.ant-switch:focus){
  box-shadow: none;
}

::v-deep(.ant-switch-checked){
  background-color: var(--primary-color);
}

h3{
  font-size: 18px;
  font-weight: bolder;
  margin-top: 32px;
  color: rgb(69, 74, 80);
}
.setting-page{
  user-select: none;
  width: 1000px
}
.playAll{
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 16px;
  background: var(--primary-color);
  color: #FFFFFF;
  border-radius: 30px;
  padding: 5px 15px;
  margin-bottom: 20px;
}
.user-icon{
  width: 1.5rem;
  height: 1.5rem; 
}
.item-container {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 12px;
}
.item-row {
  margin: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: var(--color-text); */
}
.last{
  border: none;
}
.item-row .left {
  display: flex;
  align-items: center;
}
.item-row .right {
  display:flex;
  align-items: center;
  justify-content: center;
}
.item {
  display:inline-block;
  text-align: center;
  color: #666;
  min-width: 5rem;
  margin: 0 5px;
  padding: 2px 10px;
  /* font-weight: bold; */
  border-radius: 8px;
  border: 1px solid #c9c9c9;
  cursor: pointer;
}
.item:hover {
  background: #ededed;

}
.item-click {
  color: #ffffff;
  font-weight: bold;
  background: var(--primary-color);
  border-radius: 5px;
  padding: 2px 10px;
}
.title {
    font-size: 16px;
    font-weight: 500;
  }

</style>

<style lang="less">
// 样式是在外部的，所以不能加scoped
.item-select.ant-select-dropdown{
  background-color: #fafafa;
  .ant-select-item-option-active:not(.ant-select-item-option-disabled){
    background-color: #eeeeee;
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
    background-color: #e4e4e4;
  }
}
</style>
