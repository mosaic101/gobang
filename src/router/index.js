import Vue from 'vue'
import Router from 'vue-router'
import Gobang from '@/components/Gobang'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gobang',
      component: Gobang
    }
  ]
})
