import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import CountUp from '@/components/CountUp.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/countup', component: CountUp }
  ]
})

export default router

