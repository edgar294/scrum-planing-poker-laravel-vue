import Vue from 'vue'
import VueRouter from 'vue-router'

const importPage = view => () =>
  import(`../views/${view}.vue`)

Vue.use(VueRouter)

const routes = [
   {
      path: '/list/issues',
      name: 'issues',
      component: importPage('Issues'),
      meta: {
         title: 'Issues'
      },
      props: true
   },
   {
      path: '/poker/room/:issueId',
      name: 'poker-room',
      component: importPage('PokerRoom'),
      meta: {
         title: 'Poker Room'
      },
      props: true
   },


]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

