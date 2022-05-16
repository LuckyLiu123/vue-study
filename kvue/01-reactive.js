// Vue.util.defineReactive(this, 'current', '/')
function defineReactive(obj, key, val){
    //递归
    observe(val);

    //属性拦截
    Object.defineProperty(obj, key, {
        get(){
            console.log('get:', key);
            return val;
        },
        set(newVal){
            console.log('set:', key);
            if(newVal !== val){
                val = newVal;
            }
        }
    })
}

function observe(obj){
    //首先判断obj是对象
    if(typeof obj !== 'object' || obj == null){
        return obj;
    }
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]));
}

// 动态新增一个属性
function set(obj, key, val){
    defineReactive(obj, key, val);
}

const obj = {
    foo: 'foo',
    bar: 'bar',
    baz: {
        a: 1
    }
};
// defineReactive(obj, 'foo', 'foo');
observe(obj);
// obj.foo;
// obj.foo = 'fooo'
// obj.bar;
// obj.bar = 'bar'
// obj.baz
// obj.baz.a
set(obj, 'dong', 'dong');
obj.dong;

// 2. defineReactive 不能支持数组
// 解决方案：要拦截数组的7个变更方法，覆盖他们，让他们做数组操作的同时，进行变更通知

































