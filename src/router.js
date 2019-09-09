import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import CountUp from '@/components/CountUp.vue'
import ShootOut from '@/components/ShootOut.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/countup', component: CountUp },
    { path: '/shootout', component: ShootOut },
  ]
})

export default router

