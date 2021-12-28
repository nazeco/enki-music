import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { svgBuilder } from './src/plugins/svgBuilder'
import styleImport from 'vite-plugin-style-import'

const config = loadEnv('development', './')
export default defineConfig({
  base: './',
  server: {
    port: 8080,
    // open: true,
    proxy: {
      '/sapi': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/sapi/, '')
      }
    }
  },
  plugins: [
    vue(),
    svgBuilder('./src/assets/icons/svg/'),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
