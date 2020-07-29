// vue3核心 proxy代替defineProperty
// 可改造对象
let obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`get：${key}`, target, receiver);
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
        console.log(`set：${key}`, target, receiver, value);
        return Reflect.set(target, key, value, receiver)
    }
})
console.log(`obj：`, obj.count);
obj.count = 1
console.log(`obj：`, obj.count);
++obj.count
console.log(`obj：`,obj.count);
// 可改造数组
let ary = new Proxy([], {
    get: function (target, key, receiver) {
        // return 35
        console.log(`get：${key}`, target, receiver);
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
        console.log(`set：${key}`, target, receiver, value);
        return Reflect.set(target, key, value, receiver)
    }
})
ary[0] = 2
++ary[0]
ary.zz = 4
++ary.zz
console.log(`ary：`,typeof ary, ary);

// proxy做原型
let obj2prop = new Proxy({}, {
    get: function (target, property) {
        return 35
    }
})
let obj2 = Object.create(obj2prop)
// obj2.zz = 6 // 取到zz时 不会触发原型链上的get
console.log(`obj2`, obj2, obj2.zz); // 取不到zz时去原型链上获取触发get
console.log(9999);//nodemon test
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];