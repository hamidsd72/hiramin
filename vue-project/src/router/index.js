import { createRouter, createWebHistory } from 'vue-router'
import store    from '../store'

import Blog     from '../views/Blog.vue'
import Hera     from '../views/Hera.vue'
import Home     from '../views/Home.vue'
import News     from '../views/News.vue'
import Support  from '../views/Support.vue'
import Tags     from '../views/Tags.vue'

const routes = [
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/hera-token',
    name: 'Hera',
    component: Hera
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/support',
    name: 'Support',
    component: Support
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.loginRequired)) {
//     if (store.state.isAuthenticated) {
//       next()
//     } else {
//       next("/login")
//     }
//   }
//   else if (to.matched.some(record => record.meta.loginRedirecct)) {
//     if (!store.state.isAuthenticated) {
//       next()
//     } else {
//       next("/")
//     }
//   }
//   else {
//     next()
//   }
// })

export default router
