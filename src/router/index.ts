import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import recommend from '@/pages/recommend.vue'
import musicHall from '@/pages/MusicHall/musicHall.vue'
import myLike from '@/pages/myLike/myLike.vue'
import setting from '@/pages/setting/setting.vue'
import historyPlay from '@/pages/historyPlay/historyPlay.vue'
import playList from '@/pages/playList/playList.vue'
import album from '@/pages/album/album.vue'
import artist from '@/pages/artist/artist.vue'
import videoPlayer from '@/pages/videoPlayer/VideoPlayer.vue'
import search from '@/pages/search/search.vue'
import video from '@/pages/video/video.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/musicHall',
    component: Layout,
    children: [
      {
        path: 'recommend',
        component: recommend,
        meta: { title: 'Enki Music', keepAlive: true }
      },
      {
        path: 'musicHall',
        component: musicHall,
        meta: { title: 'Enki Music', keepAlive: true }
      },
      {
        path: 'myLike',
        component: myLike,
        meta: { title: 'Enki Music', keepAlive: true }
      },
      {
        path: 'setting',
        component: setting,
        meta: { title: 'Enki Music', keepAlive: true }
      },
      {
        path: 'historyPlay',
        component: historyPlay,
        meta: { title: 'Enki Music', keepAlive: true }
      },
      {
        path: 'playList/:id',
        name: 'playList',
        component: playList,
        meta: { title: 'Enki Music', keepAlive: false }
      },
      {
        path: 'album/:id',
        name: 'album',
        component: album,
        meta: { title: 'Enki Music', keepAlive: false }
      },
      {
        path: 'artist/:id',
        name: 'artist',
        component: artist,
        meta: { title: 'Enki Music', keepAlive: false }
      },
      {
        path: 'videoPlayer/:type/:id',
        name: 'videoPlayer',
        component: videoPlayer,
        meta: { title: 'Enki Music', keepAlive: false }
      },
      {
        path: 'search/:keywords',
        name: 'search',
        component: search,
        meta: { title: 'Enki Music', keepAlive: false }
      },
      {
        path: 'video',
        name: 'video',
        component: video,
        meta: { title: 'Enki Music', keepAlive: false }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
