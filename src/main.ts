import { createApp } from 'vue'
import { App } from './App';
import {createRouter} from 'vue-router'
import { routes } from './config/routes';
import { history } from './shared/history';
import '@svgstore';
import { fetchMe, mePromise } from './shared/me';

fetchMe()

const router = createRouter({ history,routes})

router.beforeEach(async (to, from) => {
  if (['/','start'].includes(to.path)|| to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')) {
    return true
  } else {
    return mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + to.path
    )

  }
})


const app = createApp(App)
app.use(router)
app.mount('#app')
