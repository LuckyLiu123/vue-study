## 使用vue-router的核心步骤 ##
1.步骤一: 使用vue-router插件
  ```js
    import Router form 'vue-router'
    Vue.use(Router)
  ```

2.步骤二: 创建Router实例
    ```js
        export default new Router({...})
    ```

3.步骤三: 在根组件上添加该实例
  ```js
    import router from './router'
    new Vue({
        router,
    }).$mount('#app');
  ```

问题1. 在步骤一中为什么要use Router，它里面做了什么事情？
问题2. 创建的router的实例为什么要放在new Vue()里面？
问题3. router-view为什么可以直接使用，它的作用是什么？
问题4. router-link为什么可以使用，它是怎么实现的？

## 实现一个vue-router的插件，里面会做些什么事？ ##
1. vue-router插件里面需要监听url的变化，通过hashchange。
2. 如果hashchange监听到了变化，需要响应这个变化，让 router-view 刷新一下。
3. 实现一个插件至少需要实现一个 install 方法
4. 注册 $router，$router可以使用 push 方法，实现路由的跳转。

## 为什么用户可以直接使用 router-view 和 router-link 这两个组件呢？ ##
因为在 vue-router 插件的 install 方法中会注册这两个组件，让我们可以直接用。


vue的运行时版本代码 (vue.runtime.js) 不携带编译器的，所以在component中不能使用template








