import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    // 解决路由跳转页面没有置顶
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes: [{
        path: '/',
        name: 'hbIndex',
        component: () =>
            import ('../views/Home/Index.vue'),
        meta: {
            title: '测试项目',
            keepAlive: false,
        }
    },]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()
});
export default router