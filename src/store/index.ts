import { createStore } from 'vuex'

const store = createStore({
  state: {
    blockNum: 5,
    playerState: false,
    source: '',
    audio: {
      state: false,
      buffered: 0,
      duration: 1,
      currentTime: 0,
      volume: 0.6,
      mode: 0, // 0:列表循环 1：顺序播放 2：随机播放 3：单曲循环
      mute: false, // 是否静音,
      jump: -1,
      prev: false,
      next: false,
      lyric: '' // 歌词
    },
    musicList: [],
    currMusic: {
      index: -1
    },
    waitNum: 0, // 插队待播数量
    likeList: [],
    collectArtistList: [],
    records: [],
    loading: false,
    showApp: false, // App 默认初始化5秒后显示
    showPlayView: false,
    showDialog: -1, // 0：登录弹窗 1：用户信息弹窗 2:同步账户登陆弹窗
    loginState: false, // false：未登录  true：已登录
    refreshLogin: false,
    tokenValue: null,
    settingLoginState: false,
    language: 'zh',
    theme: 'default',
    quality: 'high',
    showTrans: true
  },
  mutations: {
    setBlockNum(state, num) {
      state.blockNum = num
    },
    setSource(state, src) {
      state.source = src
    },
    setAudio(state, param) {
      // @ts-ignore
      state.audio[param.prop] = param.value
    },
    setMusicList(state, list) {
      state.musicList = list
    },
    setCurrMusic(state, music) {
      state.currMusic = music
    },
    setWaitNum(state, num) {
      state.waitNum = num
    },
    setLikeList(state, list) {
      state.likeList = list
    },
    setCollectArtistList(state, list) {
      state.collectArtistList = list
    },
    setRecords(state, list) {
      state.records = list
    },
    setLoading(state, value) {
      state.loading = value
    },
    setShowApp(state, value) {
      state.showApp = value
    },
    setShowPlayView(state, value) {
      state.showPlayView = value
    },
    setShowDialog(state, value) {
      state.showDialog = value
    },
    setLoginState(state, value) {
      state.loginState = value
    },
    setRefreshLogin(state, value) {
      state.refreshLogin = value
    },
    setTokenValue(state, value) {
      state.tokenValue = value
    },
    setSettingLoginState(state, value) {
      state.settingLoginState = value
    },
    setLanguage(state, value) {
      localStorage.setItem('language', value)
      state.language = value
    },
    setTheme(state, value) {
      localStorage.setItem('theme', value)
      state.theme = value
    },
    setQuality(state, value) {
      localStorage.setItem('quality', value)
      state.quality = value
    },
    setShowTrans(state, value) {
      localStorage.setItem('showTrans', value)
      state.showTrans = value
    }
  },
  getters: {
    getBlockNum(state) {
      return state.blockNum
    },
    getSource(state) {
      return state.source
    },
    getAudio(state) {
      return state.audio
    },
    getMusicList(state) {
      return state.musicList
    },
    getCurrMusic(state) {
      return state.currMusic
    },
    getWaitNum(state) {
      state.waitNum
    },
    getLikeList(state) {
      return state.likeList
    },
    getCollectArtistList(state) {
      return state.collectArtistList
    },
    getRecords(state) {
      return state.records
    },
    getLoading(state) {
      return state.loading
    },
    getShowPlayView(state) {
      return state.showPlayView
    },
    getShowDialog(state) {
      return state.showDialog
    },
    getShowApp(state) {
      return state.showApp
    },
    getLoginState(state) {
      return state.loginState
    },
    getRefreshLogin(state) {
      return state.refreshLogin
    },
    getTokenValue(state) {
      return state.tokenValue
    },
    getSettingLoginState(state) {
      return state.settingLoginState
    },
    getLanguage(state) {
      return state.language
    },
    getTheme(state) {
      return state.theme
    },
    getQuality(state) {
      return state.quality
    },
    getShowTrans(state) {
      return state.showTrans
    },
  },
  actions: {},
  modules: {}
})

export default store
