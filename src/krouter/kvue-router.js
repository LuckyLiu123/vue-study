// vue插件编写
// 实现一个install方法
let Vue;

class VueRouter {
    constructor(options){
        console.log(Vue)
        this.$options = options

        //保存当前的hash到curent
        // current应该是响应式的
        // 给指定对象定义响应式属性
        Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
        // this.current = '/'

        //监控hashchange
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1)
        })
    }
}

//形参1: 是Vue构造函数，目的是便于扩展
VueRouter.install = function(_Vue){
    Vue = _Vue

    // 1. 将 $router 注册一下
    // 在install 方法的当前时刻，Vue的实例还不存在，所以获取不到 new Vue() 中的 router, 
    // 所以得将当前得代码往后推，延迟到某个时刻执行: 根实例创建时
    Vue.mixin({
        // beforeCreate 会在每个组件的当前时刻执行
        beforeCreate(){
            // this.$options 是每个组件必有得一个属性，组件所有得配置选项
            // 只需要根实例时执行一次, 只有根实例才有 router
            if(this.$options.router){
                // 赋值完成之后，所有的组件都会有 $router 可以使用
                // 希望将来任何组件都可以通过 $router 访问路由器的实例
                Vue.prototype.$router = this.$options.router;
            }
        }
    })

    // 2. 注册两个全局组件: router-link, router-view
    Vue.component('router-link', {
        // template: '<a>router-link</a>'
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h){
            // h 就是 createElement(), 作用是返回一个虚拟dom
            // <router-link to='/about'>abc</router-link>
            // 获取插槽内容: this.$slots.default
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    })
    Vue.component('router-view', {
        // template: '<a>router-view</a>'
        render(h){
            // 思路: 如果可以根据url的hansh部分动态匹配这个要渲染的组件
            // window.location.hash
            // this 这里的this指的是 router-view 组件的实例
            // this.$router.$options.routes
            // this.$router.current
            console.log(this.$router.$options.routes, this.$router.current);
            let component = null
            const routes = this.$router.$options.routes
            const route = routes.find((route) => route.path === this.$router.current)
            if(route){
                component = route.component
            }
            return h(component)
        }
    })
}

export default VueRouter;