import { defineConfig } from  'vite'
import vue from   '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
//  base: '/github-pages-demo-1/dist/',   //部署到github需要这行代码
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps:true
    })
  ]

})
