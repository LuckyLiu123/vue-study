// 实现一个插件，实现 Store 类，用来存储状态 state，提供一些API(commit, dispatch)，让用户可以改变状态state
// 同时挂载$store，把 Store 实例暴露出去，然后给所有组件实例去使用

/**
 * 实现插件:
 * 1. 声明一个Store类: 维护响应式对象state，暴露commit/dispatch
 * 2. install: 注册$store
*/
class Store {
    constructor(options) {
        // 保存选项
        this.$options = options
        this._mutations = options.mutations
        this._actions = options.actions

        console.log(Vue);

        // api: state
        // 用户传入state选项应该是响应式的
        this._vm = new Vue({
            data() {
                return {
                    // 不希望$$store被代理，所以加两个$$
                    $$state: options.state
                }
            }
        })

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    
    //存储器
    get state(){
        console.log(this._vm);
        return this._vm._data.$$state
    }

    set state(v){
        console.error('请使用 reaplaceState() 去修改状态');
    }

    // commit('add')
    commit(type, payload) {
        // 匹配 type 对应的 mutation
        const entry = this._mutations[type]
        if(!entry){
            console.error('error');
            return
        }
        entry(this.state, payload)
    }

    dispatch(type, payload) {
        // 匹配 type 对应的 mutation
        const entry = this._actions[type]
        if(!entry){
            console.error('error');
            return
        }
        // 此处的上下文是什么？
        // { commit, dispatch, state }
        return entry(this, payload)
    }
}

let Vue

function install(_Vue) {
    Vue = _Vue

    // 注册 store
    Vue.mixin({
        beforeCreate(){
            // 延迟到未来根实例实例化的时候再去挂载，以后所有组件都可以使用$store
            // if 判断是为了代码只执行一次，只有根实例上才有store选项
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

// 导出对象是Vuex
export default { Store, install }




























