import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/data',
    children: [{
      path: 'data',
      name: 'data',
      component: () => import('@/views/data/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理员列表', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '订单列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/lange',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'lange',
        component: () => import('@/views/lange/index'),
        meta: { title: '语言管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '律师列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/tree',
    component: Layout,
    redirect: '/tree',
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '审核律师', icon: 'table' }
      }
    ]
  },
  {
    path: '/transaltioned',
    component: Layout,
    redirect: '/transaltioned',
    children: [
      {
        path: 'transaltioned',
        name: 'Transaltioned',
        component: () => import('@/views/transaltioned/index'),
        meta: { title: '翻译列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/transaltion',
    component: Layout,
    redirect: '/transaltion',
    children: [
      {
        path: 'transaltion',
        name: 'Transaltion',
        component: () => import('@/views/transaltion/index'),
        meta: { title: '审核翻译', icon: 'table' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article',
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
