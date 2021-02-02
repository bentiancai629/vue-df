import Vue from 'vue'
import Router from 'vue-router'
import MakerDAO from '@/components/MakerDAO'
import Compound from '@/components/Compound'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MakerDAO',
      component: MakerDAO
    },
    {
      path: '/compound',
      name: 'Compound',
      component: Compound
    }
  ]
})
