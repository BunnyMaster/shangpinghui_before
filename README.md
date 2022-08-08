# VUE3

## Vue3

### 项目创建

#### 方式一 vite

- 创建vite

1. `npm init vite-app 项目名称`*不能是数字或者是中文*
2. `cd 项目名称`
3. `npm install`
4. `npm run dev`

- 项目梳理

- `public`公共的静态资源
- `src`项目的源文件
- `index.html`项目的唯一页面

#### 方式二传统的create

- vue create 项目名称
- cd 项目名称
- npm run serve
- 创建生产模式`npm run build`

### 项目介绍

#### 常见问题

1. 创建`vue.config.js`写入`module.exports={lintOnSave:false}`

2. 关闭开发环境提示` Vue.config.productionTip=false`

3. 第一行爆红

   ~~~json
    "parserOptions": {
         "parser": "@babel/eslint-parser",
         "requireConfigFile" : false
      },
   ~~~

4. 将`"requireConfigFile" : false`加入即可

5. `[vue/no-multiple-template-root]
   The template root requires exactly one element.[eslint](https://so.csdn.net/so/search?q=eslint&spm=1001.2101.3001.7020)-plugin-vue`

   - 解决eslint-plugin-vue -> 第一个(Vetur › Validation: Template )取消勾选,即可

#### 怎么设置国内镜像

1. `npm config set registry https://registry.npm.taobao.org`设置镜像是淘宝
2. `npm config get registry`查看当前的镜像地址
3. `npm config set registry https://registry.npmjs.org`切换成原来的镜像

#### 如何修改默认配置

~~~JavaScript
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  },
    // 关闭语法检查
  lintOnSave:false
}
~~~

#### `mian.js`文件解释

~~~JavaScript
// 引入不再是vue构造函数，引入是一个名为createApp的工厂函数
import { createApp } from 'vue';
import App from './App.vue';
// 创建应用实例对象——app(类似之前vue2中的vm，但app比vm更轻)
createApp(App).mount('#app');
~~~

## 单页面文件

### 是否兼容vue2

- 部分兼容但是保留`data`和`methods`但建议不用

### setup()介绍

#### 没有渲染函数

- `setup`需要返回值
- 在最后返回数据

~~~JavaScript
import { h } from 'vue';
export default {
  name: 'App',
  setup(props) {
    let name = "zs";
    let age = 18;
    function sayHello() {
      alert(`我叫${name},我${age}岁你好啊！！！`)
    }
     return {name,age, sayHello}   
}
~~~

#### 有渲染函数

- 渲染函数会替换之前页面所有内容
- 用法
  - 要在引入`import { h } from 'vue';`

~~~JavaScript
import { h } from 'vue';
export default {
  name: 'App',
  setup(props) {
    let name = "zs";
    let age = 18;
    function sayHello() {
      alert(`我叫${name},我${age}岁你好啊！！！`)
    }
    // return {name,age, sayHello}
    /*渲染函数*/
    return ()=>h("h1","早上是是是是是")///会替换之前的内容
  }
}
~~~

### ref使用

- 使用函数时需要用到`.value`
- 在对象中声明的需要用`obj.value.声明的变量名`

~~~javascript
import { h, ref } from 'vue';
export default {
  name: 'App',
  setup(props) {
    let name = ref("zs");
    let age = ref(18);
    let job=ref({
      type:"恰当度",
      salsry:"100k"
    });
    //改变函数
    function changename() {
      name.value = "ls";
      age.value = 90;
      job.value.type="UI";
      job.value.salsry="600k";
    }
    // 返回值
    return { name, age,job, changename }
  }
}
~~~

### reactive

- 比ref使用简单，不需要使用`.value`
- 直接使用变量名就行
- 但是在最后都是要return

#### 普通的

~~~JavaScript
import {h, reactive, ref} from 'vue';
export default {
  name: 'App',
  setup(props) {
    let name = ref("zs");
    let age = ref(18);
    let job=reactive({
      type:"恰当度",
      salsry:"100k",
      a:{
        b:{
          c:666
        }
      }
    });
    //改变函数
    function changename() {
      name.value = "ls";
      age.value = 90;
      job.type="UI";
      job.salsry="600k";
      job.a.b.c=999
    }
    // 返回值
    return { name, age,job, changename }
  }
}
~~~

#### 深层次的

- 直接将数据写在`reactive()`中

~~~JavaScript
import {h, reactive, ref} from 'vue';
export default {
  name: 'App',
  //定义变量
  setup(props) {
    let person = reactive({
      name: "zs",
      age: 18,
    });
    let job = reactive({
      type: "恰当度",
      salsry: "100k",
      a: {b: {c: 666}}
    });
    //改变函数
    function changename() {
      person.name = "ls";
      person.age = 90;
      job.type = "UI";
      job.salsry = "600k";
      job.a.b.c = 999;
    }

    // 返回值
    return {person, job, changename}
  }
}
~~~

- 在vue2中会存在当值被添加时，浏览器中元素如果使用的是`v-if`或者是`v-show`不会被展示
- 在vue3中已经解决这问题

~~~vue
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>姓名{{ person.name }}</h1>
  <h1>{{ person.age }}</h1>
   <h1 v-if="person.sex">{{person.sex}}</h1>
  <h1>{{ job.type }}</h1>
  <h1>{{ job.salsry }}</h1>
  <h1>{{ job.a.b.c }}</h1>
  <button @click="changename">修改信息</button>
</template>

<script>
import {h, reactive, ref} from 'vue';
export default {
  name: 'App',
  //定义变量
  setup(props) {
    let person = reactive({
      name: "zs",
      age: 18,
    });
    let job = reactive({
      type: "恰当度",
      salsry: "100k",
      a: {b: {c: 666}}
    });
    //改变函数
    function changename() {
      person.name = "ls";
      person.age = 90;
      person.sex="女";
      job.type = "UI";
      job.salsry = "600k";
      job.a.b.c = 999;
    }

    // 返回值
    return {person, job, changename}
  }
}
</script>
~~~

### 父给子传数据

#### 父组件中

- 在`template`中传入要传的数据
- 引入子组件
  - `import HelloWorld from './components/HelloWorld.vue';`
- 添加子组件
  - `components: { HelloWorld }`

#### 这是父组件

~~~vue
<template>
  <HelloWorld @hello="showhellomsg" msg="你好" school="上上撒" />
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';//引入组件
export default {
  name: "App",
  components: { HelloWorld },//添加组件，在<template>总添加这个组件
  setup(props) {
    function showhellomsg(v) {
      alert("asdasdasdas"+v)
    }
    return { showhellomsg }
  }
}
</script>
~~~

#### 子组件

~~~vue
<template>
  <h1>一个人的信息</h1>
  <h2>{{ person.name }}</h2>
  <h2>{{ person.age }}</h2>
  <button @click="test1">点击</button>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
  name: 'HelloWorld',
  props: ["msg", "school"],//接受父组件传入的信息
  setup(props, context) {
    let person = reactive({ name: "zs", age: "18" });
    function test1() {
      person.age = props.msg;//将内容修改为父组件传入的信息
      person.name = props.school;//将内容修改为父组件传入的信息
    }
    return { person, test1 }
  }
}
</script>
~~~

#### 传入信息时

- 在子组件中`setup`不写`this`改为`props`
  - *在3中`this`此时是`undefined`*

- 接受父组件的信息
  - `props: ["msg", "school"],`
  - `props.msg`和 `props.school`直接使用就行

> 以上就把父组件值传进来了

#### 传入自定义事件

- 父组件同上

- 自定义组件传入信息
  - 使用`emits`数组接受来自父组件的信息
  - 在传入数据时我们使用`props`接受
    - `props.传入变量名`
  - 传入自定义组件用`context`
    - `context.emit("自定义的组件名",)`这么写没问题但是会警告
    - 但是不报警告写法在组件中添加`emits: ["hello"],`

~~~vue
<template>
  <h1>一个人的信息</h1>
  <h2>{{ person.name }}</h2>
  <h2>{{ person.age }}</h2>
  <button @click="test1">点击</button>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
  name: 'HelloWorld',
  emits: ["hello"],//为了不报警告
  setup(props, context) {
    let person = reactive({ name: "zs", age: "18" });
    function test1() {
      context.emit("hello", 111);//向父组件传递信息
    }
    return { person, test1 }
  }
}
</script>
~~~

### watch监视属性

#### 监视1 单个的值

~~~JavaScript
watch(需要监视的值, (newvalue, oldvalue) => {
    console.log(newvalue, oldvalue);
});
~~~

#### 监视2 多个值

- 将值写成数组的形式

~~~JavaScript
watch([sum, msg], (newvalue, oldvalue) => {
    console.log(newvalue, oldvalue);
},);
~~~

#### 监视3 默认开启深度监视无法关闭

~~~javascript
watch([sum, msg], (newvalue, oldvalue) => {
    console.log(newvalue, oldvalue);
}, { immediate: true});
~~~

#### 监视4 所定义一个响应数据中的某个属性

~~~JavaScript
watch(()=>person.name,(newValue,oldValue)=>{
    console.log('person的name变化了',newValue,oldValue)
}) 
~~~

#### 监视5 reactive所定义的一个响应式数据中的某些属性

~~~JavaScript
watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
    console.log('person的name或age变化了',newValue,oldValue)
}) 
~~~

#### 监视6 特殊情况

~~~JavaScript
watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
},{deep:true})
~~~

> 此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效

### 计算属性

- 定义方式为`computed({})`

#### 第一种情况*输入时文本一起发生改变*

- ~~~JavaScript
  person.fullname=computed(()=>{
      return `${person.firstname}-${person.lastname}`
  })
  ~~~

- 使用`v-model`事件绑定

- ~~~vue
  emplate>
    <input type="text" v-model="person.firstname"><br><br>
    <input type="text" v-model="person.lastname"><br><br>
    全名:{{person.fullname}}<br><br>
    <input type="text" v-model="person.fullname">
  </template>
  
  <script>
  import { computed, h, reactive, ref } from 'vue';
  export default {
    name: "App",
    setup(props) {
      let person=reactive({
        firstname:"1",
        lastname:"2"
      });
        person.fullname=computed(()=>{
            return `${person.firstname}-${person.lastname}`
        })
      return {person}
    }
  }
  </script>
  ~~~

#### 第二种*在输入框中输入其他的一起变*

- 使用`v-model`事件绑定

- 可以在里面添加属性，直接点就行

- ~~~javascript
  person.fullname=computed({
       get(){
         return `${person.firstname}-${person.lastname}`
       },
       set(v){
         const full=v.split("-")
         person.firstname=full[0]
         person.lastname=full[1]
       }
     })
  ~~~

- 全文

~~~vue
<template>
  <input type="text" v-model="person.firstname"><br><br>
  <input type="text" v-model="person.lastname"><br><br>
  全名:{{person.fullname}}<br><br>
  <input type="text" v-model="person.fullname">
</template>

<script>
import { computed, h, reactive, ref } from 'vue';
export default {
  name: "App",
  setup(props) {
    let person=reactive({
      firstname:"1",
      lastname:"2"
    });
	
   person.fullname=computed({
      get(){
        return `${person.firstname}-${person.lastname}`
      },
      set(v){
        const full=v.split("-")
        person.firstname=full[0]
        person.lastname=full[1]
      }
    })
    return {person}
  }
}
</script>
~~~

> 以上别忘记返回值



## 自定义hook

### toRef和toRefs

#### toRef()

- 只能传递一个参数
  - 应用场景：当我们想修改一个参数时候可以这么做，但是返回一个对象或者是数组时候，总是用对象去点很麻烦
  - 所以使用toRef()但是这个只能传递一个

~~~JavaScript
return {
    person,
    name:toRef(person,'name'),
    age:toRef(person,'age'),
    salary:toRef(person.job.j1,'salary'),
}
~~~

#### toRefs()

- 可以传递多个参数，比如对象或者数组
  - 这样效率会很高方便我们使用

~~~JavaScript
return {
    ...toRefs(person)
}
~~~

### readonly和shallowreadonly

- 拆分对象结构

#### readonly

- 数据只可以读不可以写
  - 将所有的形式全部转换成只读，不可以写

~~~JavaScript
setup(){
    //数据
    let sum = ref(0)
    let person = reactive({
        name:'张三',
        age:18,
        job:{
            j1:{
                salary:20
            }
        }
    });
    person = readonly(person)//将对象转换成只读属性
    return {
        sum,
        ...toRefs(person)
    }
}
~~~

#### shallowreadonly

- 不可以改表层但是可以改深层
  - 例如`name`和`age`但是工作，薪资不可以改
  - 只能改第一层的，第二层不可以改

~~~JavaScript
setup(){
    //数据
    let sum = ref(0)
    let person = reactive({
        name:'张三',
        age:18,
        job:{
            j1:{
                salary:20
            }
        }
    })
    sum = shallowReadonly(sum)//第一层的可以改
    return {
        sum,
        ...toRefs(person)
    }
}
~~~

### toRaw和markRaw

#### toRaw

- 将原来的响应式数据会变成原始的数据，不是响应式的

~~~javascript
function showtest() {
    const p = toRaw(person);
    p.age++;
    console.log(p);
}
~~~

#### markRaw

- 不是响应式，可以改，但是不展示

~~~JavaScript
function showtest() {
    const p = markRaw(person);
    p.age++;
    console.log(p);
}
~~~

### customRef

- 自定义属性
- 传入数据时等一秒再响应

~~~vue
<template>
  <HelloWorld />
  <input type="text" v-model="keyWord">
  <h3>{{ keyWord }}</h3>
</template>

<script>
import { customRef, h, reactive, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: "App",
  components: { HelloWorld },
  setup(props) {
    function myref(v,delay) {
      let timer;
      return customRef((track, trigger) => {
        return {
          get() {
            track();//通知vue v的变化
            return v
          },
          set(newv) {
            clearTimeout(timer);
            v = newv;
            // 等一秒再显示
            timer = setTimeout(() => {
              trigger();//通知vue重新模板
            }, delay);
          }
        }
      })
    }
    let keyWord = myref("你会吗?",1000);
    return { keyWord }
  }
}
</script>
~~~

### inject和provide

- 子孙或者孙子之间传递数据时，可以使用
- 要引入对方的模板，引入两个模块`inject`和`provide`

#### provide

- 传递数据
- 父组件

~~~vue
<template>
  <div class="app">
    <h1>我是APP组件我的信息时{{ name }}--{{ age }}</h1>
    <HelloWorld />
  </div>
</template>

<script>
import { customRef, h, reactive, ref, toRefs, provide} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: "App",
  components: { HelloWorld },
  setup(props) {
    let person = reactive({ name: "zs", age: 10 });
    provide("person", person);//传递数据
    return { ...toRefs(person) }
  }
}
</script>
~~~

#### inject

- 接受数据

~~~vue
<template>
<div class="son">
    <!-- <h1>我是son组件 {{person.name}}--{{person.age}}</h1> -->
    <h1>我是son组件 {{name}}--{{age}}</h1>
    </div>
</template>

<script>
import { markRaw, reactive, ref, toRaw, toRefs } from '@vue/reactivity';
import { inject } from 'vue';
export default {
    name: "Son",
    setup(props) {
        let person = inject('person');
        return {...toRefs(person)}
    }
}
</script>
~~~

### 判断是不是为某个模块响应数据

- isRef,isReactive,isReadonly,isProxy 

### teleport标签元素

- 方便定位 可以自定义去想哪个标签
- 有些网页的遮罩层就是这样的` <teleport to='body'>`

#### dialog.vue

~~~vue
<template>
<h2>dfsdfasd</h2>
<div class="dialog">
    <button @click="isShow = true">点我弹窗</button>
    <teleport to='body'>
        <div v-if="isShow" class="mask">
            <div class="dialog">
                <h3>我是弹窗</h3>
                <h3>内容</h3>
                <h3>内容</h3>
                <h3>内容</h3>
                <button @click="isShow = false">关闭弹窗</button>
    </div>
    </div>
    </teleport>
    </div>
</template>

<script>
    import { ref } from "vue"
    export default {
        name: "Dialog",
        setup(props) {
            let isShow = ref(false)
            return { isShow }
        }
    }
</script>
~~~

#### hello.vue

- 只需要将dialog引入即可

~~~vue
<template>
<div class="son">
    <!-- <h1>我是son组件 {{person.name}}--{{person.age}}</h1> -->
    <h1>我是son组件 {{name}}--{{age}}</h1>
    <Diglog />
    </div>
</template>

<script>
    import { markRaw, reactive, ref, toRaw, toRefs } from '@vue/reactivity';
    import Diglog from "./dialog.vue"
    import { inject } from 'vue';
    export default {
        name: "Son",
        components:{Diglog},
        setup(props) {
            let person = inject('person');
            return {...toRefs(person)}
        }
    }
</script>
~~~

### defineAsyncComponent

- 解决网速慢的问题
  - 在最外面的先出来，在后面的后出来

#### 在`<script>`中引入方式

~~~javascript
import Son from "./son.vue";//静态引入
const Son = defineAsyncComponent(() => import("./son.vue"));//动态引入
~~~

#### 在`<template>`中使用细节

- 在setup中也可以写promise对象，因为有异步组件了
- 如果没有异步组件是不可以写promise的

~~~vue
<template>
<div class="hello">
    <h1>我是hello组件</h1>

    <!-- 插槽 -->
    <Suspense>
        <template v-slot:default>
            <Son />
</template>
<!-- 上一组件还没加载出来时显示 -->
<template v-slot:fallback>
<h3>加载中</h3>
</template>
</Suspense>

</div>
</template>
~~~

#### 最后的返回值

- 可以使用promise对象，也可以显示延迟效果

~~~vue
<template>
<div class="son">
    <!-- <h1>我是son组件 {{person.name}}--{{person.age}}</h1> -->
    <h1>我是son组件 {{ name }}--{{ age }}</h1>
    <Diglog />
    </div>
</template>

<script>
    import { markRaw, reactive, ref, toRaw, toRefs } from '@vue/reactivity';
    import Diglog from "./dialog.vue"
    import { inject } from 'vue';
    export default {
        name: "Son",
        components: { Diglog },
        setup(props) {
            let person = inject('person');
            return new Promise((resolve, rejects) => {
                setTimeout(() => {
                    resolve({ ...toRefs(person) })
                }, 1000);
            })
            // return { ...toRefs(person) }
        }
    }
</script>
~~~

------

[^解决]: vite版本

## V3-vite

### 创建

- `npm init vite-app 项目名`

### data中的申明

- 和在V2版本中没有区别

~~~JavaScript
data(){
    return{
        name:"zs",
        count:1
    }
}
~~~

- 当然也可以使用setup()

~~~javascript
setup() {
    let count = 0;
    let name = "zs";
    return {count, name}
}
~~~

### methods节点使用

- 传统版本写法

~~~vue
<template>
<h1>{{ msg }}</h1>
<h1>{{ name}}</h1>
<button @click="add()">点我加一</button>
<button @click="count++">count is: {{ count }}</button>
</template>

<script>
    import {ref,reactive} from "vue"
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
        },
        data(){
            return{
                name:"zs",count:1
            }
        },
        methods:{
            add(){
                this.name+=":!"
            }
        }
    }
</script>
~~~

- 新版本写法，点击时自增

~~~javascript
import {ref,reactive} from "vue";
setup() {
    let count = ref(3);
    let name = reactive({name:"zs"});
    let name = ref("zs");
    function add(){
        name.value+="!!!"
    }
    return {count, name,add}
}
~~~

### style样式的使用方法

~~~vue
<style lang="css">

</style>
~~~

- 如果要使用less语法
- 要下载`npm i less -D`
- 之后将`lang="less"`改一下

~~~vue
<style lang="less">

</style>
~~~

### 注册事件

#### 全局注册事件

- 当我们频率使用较高时使用全局注册事件
- 在`main.js`中注册
- 也直接将test文件的名字引入
  - `app.component(test.name,test);`

~~~javascript
import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import test from "./components/test.vue";

// 这里 不能 createApp(App).component("tes",test) 
//否则不成功
const app=createApp(App);
app.component("tes",test);
//也可以这么做
app.component(test.name,test);//直接将test文件的名字引入

app.mount('#app')
~~~

- 在test.vue声明

~~~vue
<template>
<h2>我是test</h2>

</template>
<script>
    export default {
        name:"test"
    }
</script>
~~~

- 在APP.vue使用

~~~vue
<template>
<img alt="Vue logo" src="./assets/logo.png" />
<HelloWorld msg="Hello Vue 3.0 + Vite" />
<tes></tes>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    export default {
        name: 'App',
        components: {
            HelloWorld
        }
    }
</script>
~~~

#### 局部注册事件

- 使用频率低可以这么做
- 创建`swirp.vue`

~~~vue
<template>
<h2>我是swirl文件</h2>
</template>

<script>
    export default {
        name: "swirp"
    }
</script>
~~~

- 在App.vue中使用

~~~vue
<template>
<img alt="Vue logo" src="./assets/logo.png" />
<HelloWorld msg="Hello Vue 3.0 + Vite" />
<swirp></swirp>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import swirp from "./components/swirp.vue";
    export default {
        name: 'App',
        components: {
            HelloWorld,swirp
        }
    }
</script>
~~~

### 解决样式冲突问题和穿透

#### 样式冲突问题

- 在`style`标签中添加属性`scoped`

~~~vue
<style scoped>
    h2 {
        color: red;
    }
</style>
~~~

- 注意的是：需要在外部包上一层`div`或者是其他的不能直接写

~~~vue
<template>
	<div>
        <h2>我是test</h2>
    </div>
</template>
~~~

#### 样式穿透问题

- 在在`style`标签中前添加属性`/deep/`

~~~vue
<style scoped>
    /deep/ h2 {
        color: red;
    }
</style>
~~~

### props

#### 基本使用

- 传递数据
- 在APP组件中申明
  - 将要传递的数据传递给标签

~~~vue
<HelloWorld msg="Hello Vue 3.0 + Vite" title="面朝大海" aire="孩子"/>
~~~

- 在HelloWorld中声明接受

~~~JavaScript
export default {
    name: 'HelloWorld',
    props:["msg","title","aire"],
}
~~~

#### 当我们需要传递变量类型是数字或者是布尔类型时可以这样

~~~JavaScript
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
        title:String,
        aire:String
    },
}

~~~

#### 动态的绑定数据时

- 使用在前面加上`:`
- 在APP组件中向helloworld中传递数据

~~~vue
<template>
<h2>我是APP的组件</h2>
<!--需要注意的是在  :aire="name"  要加:-->
<HelloWorld msg="Hello Vue 3.0 + Vite" title="面朝大海" :aire="name"/>
<input v-model="name"><br>
数据显示{{name}}
</template>
<script>
    import HelloWorld from './components/HelloWorld.vue'
    import swirp from "./components/swirp.vue";

    export default {
        name: 'App',
        components: {
            HelloWorld
        },
        data() {
            return {
                name: "2"
            }
        }
    }
</script>
~~~

- 在helloworld中进行接受

~~~vue
<template>
<h2>{{title}}</h2>
<h2>{{aire}}</h2>
</template>

<script>
    export default {
        name: 'HelloWorld',
        //接受可以是变量类型的定义
        props: {
            msg: String,
            title:String,
            aire:String
        },
        //也可以是直接的接受
        props:["msg","title","aire"],
</script>
~~~

### 动态绑定样式

#### 简单的绑定

- 利用:class动态的绑定值，因为vue支持简单的表达式

~~~vue
<template>
<h2>我是APP的组件</h2>
<h1  @click="total=!total" :class="total?'switch1':'switch2'">动态绑定样式</h1>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import swirp from "./components/swirp.vue";
    export default {
        name: 'App',
        data() {
            return {
                name: "2",
                total:true
            }
        }
    }
</script>

<style scoped>
    .switch1{
        background-color: #1c7430;
    }.switch2{
        background-color: #a71d2a;
    }
</style>
~~~

#### 动态绑定class——数组

- 形如`:class="[total?'switch1':total2?'switch2':'']"`

~~~vue
<template>
<h2>我是APP的组件</h2>
<h1  @click="total=!total" :class="[total?'switch1':total2?'switch2':'']">动态绑定样式</h1>
<button @click="total2=!total2">点我改变total2</button>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue';
    export default {
        name: 'App',
        components: {
            HelloWorld
        },
        data() {
            return {
                name: "2",
                total:true,
                total2:true
            }
        }
    }
</script>

<style scoped>
    .switch1{
        background-color: #1c7430;
    }.switch2{
        background-color: #a71d2a;
    }.switch2{
        background-color: #f8b70f;
    }
</style>
~~~

#### 动态绑定class——对象形式

- 当值为

~~~vue
<template>
  <h2>我是APP的组件</h2>
  <h1  @click="total=!total" :class="classObj">动态绑定样式</h1>
  <button @click="classObj.switch1=!classObj.switch1">点我改变switch1</button>
  <button @click="classObj.switch2=!classObj.switch2">点我改变switch2</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      name: "2",
      classObj:{
        switch1:false,
        switch2:false
      }
    }
  }
}
</script>

<style scoped>
.switch1{
  background-color: #1c7430;
}.switch2{
  background-color: #a71d2a;
}.switch2{
  background-color: #f8b70f;
}
</style>
~~~

### 计算属性

#### 一个数乘2

- 当输入一个数每次都成2

~~~vue
<template>
  <h2>我是APP的组件</h2>
  <input v-model="num">{{plus()}}
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App',
  data() {
    return {
      name: "2",
      num:2,
    }
  },
  methods:{
    plus(){
      return this.num*2
    }
  }
}
</script>
~~~

#### 拥有计算属性并传参

- App中的组件
- 将输入的值传入到helloWord中

~~~vue
<template>
  <h2>我是APP的组件</h2>
  <input v-model="name">
  <input v-model="num">{{plus()}}
<HelloWorld :msg="name" :name="num"></HelloWorld>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      name: "2",
      num:2,
    }
  },
  methods:{
    plus(){
      return this.num*2
    }
  }
}
</script>
~~~

- helloworld中
- 需要接受APP中传入的数据

~~~vue
<template>
  <h1>{{ msg }}</h1>
  <h1>{{ name }}</h1>
  <h2>信息的总称{{msg}}--{{name}}</h2>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    name:String
  },
  data() {
    return {
      name1: "zs", count: 1
    }
  }
}
</script>
~~~

### 自定义属性传参

- 触发事件的步骤
  - 声明触发事件的变量
  - 启用触发事件
  - 在另一个组件中调用这个组件

#### App组件中

~~~vue
<template>
  <h1>app根组件--------{{ count }}</h1>
  <button @click="count++">{{ count }}</button>
  <HelloWorld :defeat="count"/>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {HelloWorld},
  data() {
    return {count:0}
  },
  methods: {

  }
}
</script>
~~~

#### helloworld中

~~~vue
<template>
  <h1>这是helloworld中的标签 {{ defeat }} </h1>

</template>
<script>
export default {
  name: "HelloWorld",
  props:["defeat"],
  data() {
    return {deer: 0}
  },
  methods: {

  }
}
</script>
~~~

### 子向父传递参数

+ 父向子传递参数可以参照上面provide

#### APP组件中

~~~vue
<template>
  <h1>app根组件--------{{ count }}</h1>
  <button @click="count++">{{ count }}</button>
  <HelloWorld :defeat="count"/>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {HelloWorld},
  data() {
    return {count:0}
  },
  methods: {

  }
}
</script>
~~~

#### helloworld组件中

~~~vue
<template>
  <h1>这是helloworld中的标签 {{ defeat }} </h1>

</template>
<script>
export default {
  name: "HelloWorld",
  props:["defeat"],
  data() {
    return {deer: 0}
  },
  methods: {

  }
}
</script>
~~~

### filter过滤器使用

- 针对于数组

#### 关于简写形式

- ##### 初识状态

~~~JavaScript
this.todolist.filter((x)=>{x.done===true})
~~~

- ##### 变化一改变小括号中的样式

~~~JavaScript
this.todolist.filter(x=>{x.done===true})
~~~

- ##### 变化二改变花括号中的样式

~~~JavaScript
this.todolist.filter(x=>x.done===true)
~~~

#### 使用说明

- 过滤数组中根据值的类型返回数组

##### 详细介绍

- 在下述代码中，选择，返回这个数据的done值为true的值 ！的！数据

~~~JavaScript
this.todolist.filter(x=>x.done===true)
~~~

### watch属性

#### 传统——基本语法

- 监听data中的数据变化，
- 直接将数据的值写成函数即可
- 可以有两个参数
  - 一个是新值和旧值

~~~JavaScript
export default {
  name: "App",
  components: {HelloWorld},
  data(){return{count:0}},
  watch:{
    count(NewValue,OldValue){
      console.log(NewValue,OldValue);
    }
  }
}
~~~

#### watch检测用户名是否可用

- 前面不加`await`返回的是promise对象
  - 前面加了就会返回结果回来，请求的真正的结果

##### 注意：vite版本目前不支持axios试了好久不行

##### 解决方案

- 报错的在package.json中
- 引入`"axios": "^0.21.1"`

~~~json
"dependencies": {    
    "vue": "^3.0.4",  
    "axios": "^0.21.1"  
}
~~~



~~~vue
<template>
  <h1>APP根组件</h1>
  <input type="text" placeholder="请输入用户名" v-model="delicious">
  <h2>用户名为{{ delicious }}</h2>
</template>
<script>
import axios from "axios";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: { HelloWorld },
  data() {
    return { delicious: "" }
  },
  watch: {
   async  delicious(NewValue, OldValue) {
      const res =await  axios.get(`https://www.escook.cn/api/finduser/${NewValue}`);
      console.log(res);
      console.log(NewValue);
    }
  }
}
</script>
~~~

### 新版——基本用法

~~~vue
<template>
  <h1>app根组件</h1>
  <input type="text" placeholder="输入用户名" v-model="delious">
  <h1>用户名为：{{delious}}</h1>

</template>
<script>
import axios from "axios"
import {reactive, toRefs, watch} from "vue";
export default {
  setup(){
    let name=reactive({
      delious:""
    });
    watch( ()=>name.delious,async(Newvalue,OldValue)=>{
      // console.log(Newvalue,OldValue);
        const {data:res}=await axios.get(`https://www.escook.cn/api/finduser/${Newvalue}`);
        console.log(res);
    });
    return{...toRefs(name)}
  }
};
</script>
~~~

### 自动开启监视watch

- 添加一定要在监视的变量名中去添加
  - 可以添加
    - immediate
    - deep

~~~vue
<template>
<h1>APP根组件</h1>
<input type="text" placeholder="请输入用户名" v-model="delicious">
<h2>用户名为{{ delicious }}</h2>
</template>
<script>
    import axios from "axios";
    import HelloWorld from "./components/HelloWorld.vue";

    export default {
        name: "App",
        components: {HelloWorld},
        data() {
            return {delicious: "12"}
        },
        watch: {
            delicious:{
                immediate: true,
                deep:tru,
                async handler(NewValue) {
                    const res = await axios.get(`https://www.escook.cn/api/finduser/${NewValue}`);
                    console.log(res.data);
                },
            }
        }
    }
</script>
~~~

#### 新版

~~~vue
<template>
  <h1>app根组件</h1>
  <input type="text" placeholder="输入用户名" v-model="delious">
  <h1>用户名为：{{ delious }}</h1>

</template>
<script>
import axios from "axios"
import {reactive, ref, toRefs, watch} from "vue";

export default {
  setup() {
    // let delious = ref("12");
    let name=reactive({
      delious:"12"
    });
    watch(()=>name.delious, async (Newvalue, OldValue) => {
      console.log(Newvalue, OldValue);
      const {data:res} =await axios.get(`https://www.escook.cn/api/finduser/${Newvalue}`);
      console.log(res);
    }, {immediate: true, deep: true});
    return {...toRefs(name)}
  }
};
</script>
~~~

## 生命周期

### 通过生命周期监听不同的函数

#### 基本使用

~~~javascript
mounted() {
this.deliver="组件被创建完成了";
console.log("组件被创建完成了");
},
created() {
this.depend="组件被渲染了";
console.log("组件被渲染了");
},
unmounted() {
this.demand="组件被销毁了";
console.log("组件被销毁了");
}
~~~

#### 生命周期的详细

- helloworld组件

~~~vue
<template>
  <h1>HelloWorld组件</h1>
  <h2>测试生命周期函数</h2>
  <h1>{{deliver}}</h1>
  <h1>{{depend}}</h1>
  <h1>{{demand}}</h1>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    let delight=reactive({deliver:"",depend:"",demand:""});
    return{...toRefs(delight)}
  },
  mounted() {
    this.deliver="组件被创建完成了";
    console.log("组件被创建完成了");
  },
  created() {
    this.depend="组件被渲染了";
    console.log("组件被渲染了");
  },
  unmounted() {
    this.demand="组件被销毁了";
    console.log("组件被销毁了");
  }
}
</script>

~~~

- App中的组件
  - 点击按钮是为了让组件消失，从而达到销毁组件的目的

~~~vue
<template>
  <h1>APP组件</h1>
  <hello-world v-if="delivery"></hello-world>
  <button @click="delivery=!delivery">点我</button>
</template>
<script>
import {reactive, ref, toRefs, watch} from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  components: {HelloWorld},
  setup() {
    let delivery = reactive({delivery: true});
    return {...toRefs(delivery)}
  }
};
</script>

~~~

#### updated生命周期函数

- 当数值发生改变更新时会被触发

~~~javascript
updated() {
    this.demanding="组件更新了";
    console.log("组件更新了");
}
~~~

#### 声明周期before

- 发送Ajax请求只能在created不能在beforeCreate

~~~JavaScript
beforeMount() {
  this.deny="组件之前被创建";
    console.log("组件之前被创建")
  },
beforeCreate() {
  this.depart="组件之前被渲染了";
    console.log("组件之前被渲染了");
  },
beforeUnmount() {
  this.department="组件之前被销毁了";
    console.log("组件之前被销毁了");
  },
beforeUpdate() {
  this.departure="组件之前被更新了";
    console.log("组件之前被更新了");
  },
~~~

## 组件之间的通信

### EventBus

#### 安装组件`mitt`

- `npm i mitt -D  `

#### 兄弟之间通信

- ##### 在eventBus.js中引入

~~~javascript
import mitt from "mitt";
const bus=mitt();
export default bus;
~~~

- ##### 在APP组件中

~~~vue
<template>
<h1>App组件</h1>
  <son></son>
  <Son2></Son2>
</template>

<script>
import Son from "./components/Son.vue";
import Son2 from "./components/Son2.vue";
export default {
  name: "App",
  components: {Son2, Son}
}
</script>
~~~

- ##### 在兄弟发出方

- 通过`bus.emit`触发事件函数

~~~vue
<template>
  <div id="left">
    <h1>son组件</h1>
    <h3>数据的发送------depress{{ depress }}</h3>
    <button @click="add">+1</button>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import bus from "../assets/eventBus"

export default {
  name: "Son",
  setup() {
    let deposit = reactive({depress: 0});

    function add() {
      deposit.depress++;
      bus.emit("pressChange", deposit.depress);
    }

    return {...toRefs(deposit), add}
  },
}
</script>

<style lang="less" scoped>
#left {
  width: 400px;
  height: 200px;
  padding: 2px;
  margin-right: 200px;
  float: left;
  border: #1c7430 1px solid;
}
</style>
~~~

- ##### 在兄弟接受方

~~~vue
<template>
  <div id="right">
    <h3>son2组件</h3>
    数据的接受----desert值为{{ desert }}
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import bus from "../assets/eventBus";

export default {
  name: "Son2",
  setup() {
    let deserve = reactive({desert: 0});

    return {...toRefs(deserve)}
  },
  created() {
    bus.on('pressChange', depress => this.desert = depress)
  }
}
</script>

<style lang="less" scoped>
#right {
  width: 400px;
  height: 200px;
  padding: 2px;
  float: left;
  border: 1px solid #a71d2a;
}
</style>
~~~

#### 父子之间的通信

##### 方式一

- 父组件

~~~vue
<template>
<h1>App组件</h1>
  数值为{{desire}}
  <button @click="desire++">点我+1</button>
 <Son :desk="desire"></Son>
</template>

<script>
import Son from "./components/Son.vue";
import {reactive, toRefs} from "vue";
export default {
  name: "App",
  components: { Son},
  setup(){
    let design= reactive({desire: 0});

    return {...toRefs(design)}
  }
}
</script>
~~~

- 子组件

~~~vue
<template>
  <div id="left">
    <h1>son组件</h1>
    <h3>数据的接受------desk{{ desk }}</h3>
  </div>
</template>

<script>

export default {
  name: "Son",
  props: ["desk"],
}
</script>
~~~

##### 方式二

- 父组件

~~~vue
<template>
<h1>App组件</h1>
  数值为{{desire}}
  <button @click="desire++">点我+1</button>
 <Son :desk="desire"></Son>
</template>

<script>
import Son from "./components/Son.vue";
import {provide, reactive, toRefs} from "vue";
//inject和provide
export default {
  name: "App",
  components: { Son},
  setup(){
    let design= reactive({desire: 0});
    provide("design",design);
    return {...toRefs(design)}
  }
}
</script>
~~~

- 子组件

~~~vue
<template>
  <div id="left">
    <h1>son组件</h1>
    <h3>数据的接受------desire{{ desire }}</h3>
  </div>
</template>

<script>

import {inject, toRefs} from "vue";

export default {
  name: "Son",
  setup(){
  // const desire= inject("design");
    return {...toRefs(inject("design"))}//...toRefs(desire)
  }
}
</script>
~~~

#### 子向父传递数据

- 父组件
  - 接受方式和之前一样，在传过来的组件添加事件就行

~~~vue
<template>
  <h1>App组件</h1>
  数值为{{ num }}
  <Son @designs="deserve"></Son>
</template>

<script>
import Son from "./components/Son.vue";
import {provide, reactive, toRefs} from "vue";

export default {
  name: "App",
  components: {Son},
  setup() {
    let design = reactive({num: 0});

    function deserve(v) {
      console.log(v);
      design.num = v;
    }

    return {...toRefs(design), deserve}
  }
}
</script>
~~~

- 子组件
- setup和data不一样
  - 子组件中`context.emit("发送名", 发送值)`
  - context是setup传参的一部分
    - 原型是这样setup(pros, context)

~~~vue
<template>
  <div id="left">
    <h1>son组件</h1>
    <h3>数据的发送------dish{{ dish }}</h3>
    <button @click="desire">+1</button>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  emits: ["designs"],
  name: "Son",
  setup(pros, context) {
    let disgusting = reactive({dish: 0});

    function desire() {
      disgusting.dish++;
      context.emit("designs", disgusting.dish)
    }

    return {...toRefs(disgusting), desire}
  }
}
</script>
~~~

#### 父子之间数据同步(使用的VUE3新版)

- 数据同步使用的

- 父组件

~~~vue
<template>
  <h1 @click="num++">App组件</h1>
  数值为{{ num }}
  <Son @designs="deserve"></Son>
</template>

<script>
import Son from "./components/Son.vue";
import {provide, reactive, toRefs} from "vue";

export default {
  name: "App",
  components: {Son},
  setup() {
    let design = reactive({num: 0});
    // 父接受子传的信息
    function deserve(v) {
      console.log(v);
      design.num = v;
    }
    // 父传子
    provide("design",design);
    return {...toRefs(design), deserve}
  }
}
</script>
~~~

- 子组件

~~~vue
<template>
  <div id="left">
    <h1 @click="add">son组件</h1>{{num}}
    <h3>数据的发送------dish{{ dish }}</h3>
    <button @click="desire">+1</button>
  </div>
</template>

<script>
import {inject, reactive, toRefs, watch} from "vue";

export default {
  emits: ["designs"],
  name: "Son",
  setup(pros, context) {
    // 子传父
    let disgusting = reactive({dish: 0});

    function desire() {
      disgusting.dish++;
      context.emit("designs", disgusting.dish)
    }
    // 子接受父的信息
    const desire1= inject("design");
    watch(()=>desire1.num,(n,o)=>{
      disgusting.dish=n;
    },{immediate:true,deep:true})

    return {...toRefs(disgusting), desire,...toRefs(desire1)}
  }
}
</script>
~~~

## axios使用

### 第一种方式

- 第一种方式相对来说比较啰嗦，定义全局变量就是为了少些点
- 但是现在几乎是要写到两行的

#### 在main.js中

- 将`createApp(App)`拆分,
- `baseURL`是URL不是URI

~~~JavaScript
import {createApp, provide} from 'vue';
import App from './App.vue';
import './index.css';
import axios from "axios";

//第一种方式开始
const app = createApp(App);
app.config.globalProperties.$https = axios;//定义到全局
axios.defaults.baseURL = "https://www.escook.cn";//设置基本URL后面直接使用
// 第一种方式结束
app.mount('#app');
~~~

#### 在发送端

~~~vue
<template>
  <button @click="sendpost">post请求1</button>
</template>

<script>
import {getCurrentInstance} from "vue";

export default {
  name: "SON1",
  setup(props, context) {
      //设置接受所定义的全局变量
    const currentInstance = getCurrentInstance();
    const {$https} = currentInstance.appContext.config.globalProperties;

    //post请求方式1
    async function sendpost() {
      const {data: res} = await $https.post("/api/post", {name: "zs"})
      console.log(res)
    }

    return {sendpost, sendPost2}
  }
}
</script>
~~~

#### 在请求端

~~~vue
<template>
  <button @click="sendget1">发送get1</button>
</template>

<script>
import {getCurrentInstance} from "vue";

export default {
  name: "SON2",
  setup(props, context) {
    const currentInstance = getCurrentInstance();
    const {$https} = currentInstance.appContext.config.globalProperties;

    //get请求方式一
    async function sendget1() {
      const {data: res} = await $https.get("/api/get", {name: "zs"});
      console.log(res);
    }

    return {sendget1}
  }
}
</script>
~~~

### 第二种方式

- 第二种方式对于第一种方式，相对来说比较容易和理解

#### 在main.js中

```JavaScript
import {createApp, provide} from 'vue';
import App from './App.vue';
import './index.css';
import axios from "axios";

//第二种方式
const app = createApp(App);
app.provide("httpsAxios", axios);

app.mount('#app');
```

#### 在发送端

- 注意这个代码只能放在setup()中并且不能被函数包裹，否则会报错
- `const httpsAxios = inject("httpsAxios");`

~~~vue
<template>
  <button @click="sendget1">发送get1</button>
</template>

<script>
import {getCurrentInstance, inject, toRefs} from "vue";

export default {
  name: "SON2",
  setup(props, context) {

	// get请求方式2 这个一定要定义在最外边
    const httpsAxios = inject("httpsAxios");

    async function sendget2() {
      const {data: res} = await httpsAxios.get("/api/get", {name: "zs"})
      console.log(res);
    }

    return { sendget2}
  }
}
</script>
~~~

#### 在请求端

~~~vue
<template>
  <button @click="sendPost2">post请求2</button>
</template>

<script>
import {inject} from "vue";

export default {
  name: "SON1",
  setup(props, context) {
    const httpsAxios = inject("httpsAxios");
      
    //    post请求方式2
    async function sendPost2() {
      const {data: res} = await httpsAxios.post("/api/post", {name: "zs"});
      console.log(res);
    }

    return {sendpost}
  }
}
</script>
~~~

## 自定义ref使用

- 使用步骤
  - 导入响应包
  - 声明变量并返回
  - 在标签中使用
  - 使用onMounted，如果不使用会输出不出来，因为要在创建节点之后获取

~~~vue
<template>
  <h1 ref="myapp">APP组件</h1>
</template>

<script>
import {provide, reactive, toRefs, ref, onMounted} from "vue";

export default {
  name: "App",
  setup(prop, context) {
    const myapp = ref(null)
    //一定要在加载完成之后，不然获取不到
    onMounted(() => {
      console.log(myapp.value.innerHTML);//使用和正常的使用就可以
    })
    return {myapp}//返回值在<template>中使用，这样就可以获取到了
  }
}
</script>
~~~

### 附记

- 这些东西使用在setup中时，必须写在最外层不能写在，对象，函数，等等一些

~~~JavaScript
 onBeforeMount(() => {
      // ... 
    })
    onMounted(() => {
      // ... 
    })
    onBeforeUpdate(() => {
      // ... 
    })
    onUpdated(() => {
      // ... 
    })
    onBeforeUnmount(() => {
      // ... 
    })
    onUnmounted(() => {
      // ... 
    })
    onActivated(() => {
      // ... 
    })
    onDeactivated(() => {
      // ... 
    })
    onErrorCaptured(() => {
      // ... 
    })
~~~

#### 当我们点击一个按钮时候，想让它获取焦点

- 在Vue3中是不可以使用$refs所以点击时要想另一种办法
- 当我们点击按钮时候，里面的值发生改变这个时候，我们可以使用`onUpdated`
- 第一种方式使用onUpdate

~~~vue
<template>
  <div>
    <h1>App 根组件</h1>
    <hr/>
    <input type="text" class="form-control" ref="definite" v-if="defeat"/>
    <button type="button" class="btn btn-primary" v-else @click="define">展示 input 输入框</button>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, ref, onBeforeMount, watch, onUpdated} from "vue";

export default {
  name: 'MyApp',
  setup(p, c) {
    let deer = reactive({
      defeat: false,
    })
    let definite = ref(null);
    // 点击按钮值发生改变
    function define() {
      deer.defeat = true;
    }
    //使用onUpdated在值发生改变时重新渲染页面
    onUpdated(()=>{
      definite.value.focus()
    })

    return {...toRefs(deer), define, definite}
  }
}
~~~

- 第二种方式使用nextTick

~~~JavaScript
// 点击按钮值发生改变
function define() {
    deer.defeat = true;
    nextTick(()=>{
        definite.value.focus()
    })
}
~~~

### keep-alive使用(离开页面数据不变)

- 当页面离开来回切换时，所定义的数据不变

- App中组件

~~~vue
<template>
  <div>
    <h1>App 根组件</h1>
    <hr/>
    <button type="button" class="btn btn-primary" @click="deliver='Home'">主页</button>
    <button type="button" class="btn btn-primary" @click="deliver='MyMovice'">电影</button>
    <keep-alive>
      <component  :is="deliver">{{ deliver }}</component>
    </keep-alive>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, ref, onBeforeMount, watch, nextTick} from "vue";
import MyMovice from "./components/MyMovice.vue";
import Home from "./components/Home.vue";

export default {
  name: 'MyApp',
  components: {
    MyMovice,
    Home
  },
  setup(p, c) {
    let deliver = ref("MyMovice")
    return {deliver}
  }
}
</script>
~~~

- MyMovice

~~~vue
<template>
<h1>MYMOVICE组件</h1>
</template>

<script>
export default {
  name: "MyMovice"
}
</script>
~~~

- Home

~~~vue
<template>
  <h1>HOME组件 {{delight}} </h1>
  <button class="btn btn-success"  @click="delight++">+1</button>
</template>

<script>
import {reactive, ref, toRefs} from "vue";

export default {
  name: "Home",
  setup() {
    let dlighted = reactive({
      delight: 0
    })
    return {...toRefs(dlighted)}
  }
}
</script>
~~~

## 插槽

### 基本用法

- App组件

~~~vue
<MyMovice>
    <button type="button" class="btn mr-5 btn-primary" @click="deliver='Home'">主页</button>
    <button type="button" class="btn btn-primary" @click="deliver='MyMovice'">电影</button>
</MyMovice>
~~~

- MyMovice
  - 在vue中声明`<slot></slot>`就可以使用插槽

```vue
<template>
<h1>MYMOVICE组件</h1>
<p>查重2</p>
<slot></slot>
<p>查重3</p>
</template>
```

### 后备内容

~~~vue
<template>
<h1>MYMOVICE组件</h1>
<p>查重2</p>
<slot>如果传递了数据这an数据就会被替换，如果没有传递参数，那么这段文字就会不被替换</slot>
<p>查重3</p>
</template>
~~~

### 声明具体插槽

- 如果写入了，name文字没有默认是default

~~~vue
<template>
<h1>MYMOVICE组件</h1>
<div>
<!--  头文件-->
  <header>
    <slot name="header"></slot>
  </header>
<!--  主题内容-->
  <main>
    <slot name="main"></slot>
  </main>
<!--根组件  -->
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
</template>
~~~

### 具体使用插槽，带有具有名字的

- 只有在默认标签中，可以不用写` <template v-slot:header>`

- APP文件

```vue
<MyMovice>
  <template v-slot:header>
    <h1>滕王阁序</h1>
  </template>
 <template v-slot:main>
   <p>豫章故郡，洪都新府。</p>
   <p>星分翼轸，地接衡庐</p>
   <p>襟三江而带五湖，控蛮荆而引瓯越。</p>
 </template>
  <template v-slot:footer>
    <p>落款：王勃</p>
  </template>
</MyMovice>
```

- MYMOVICE组件

```vue
<template>
<h1>MYMOVICE组件</h1>
<div>
<!--  头文件-->
  <header>
    <slot name="header"></slot>
  </header>
<!--  主题内容-->
  <main>
    <slot name="main"></slot>
  </main>
<!--根组件  -->
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
</template>
```

### 插槽简写

- 用#代替`v-slot:`

  - `<template v-slot:main>`可以简写为

  - `<template #main>`

### 用插槽的形式传递数据

- APP组件

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <MyMovice v-slot:default="scop">
      {{scop}}
    </MyMovice>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, ref, onBeforeMount, watch, nextTick} from "vue";
import MyMovice from "./components/MyMovice.vue";
import Home from "./components/Home.vue";

export default {
  name: 'MyApp',
  components: {
    MyMovice,
    Home
  },
  setup(p, c) {
    let deliver = ref("MyMovice")
    return {deliver}
  }
}
</script>
```

- 被插入的组件

~~~vue
<template>
<h1>MYMOVICE组件</h1>
<div>
<slot :info="demand" :deny="depart"></slot>
</div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "MyMovice",
  setup(){
    let demand=reactive({
      democracy:"民主",
      dentist:"牙医"
    })
    let depart=reactive({
      deparment:"部门"
    })
    return {demand,depart}
  }
}
</script>
~~~

#### 解释——插槽的形式传递数据？

- 在插槽中，被插入的插槽向，插入的插槽传递数据
- 被插入的插槽
  - `<slot :info="demand" :deny="depart"></slot>`
  - 其中`:info=`除了`:`,`info`是可以自定义的，但是等于号后面的数据是，来自`data`或者是`setup`中的

- 在接受方数据中
  - `<MyMovice v-slot:default="scop">`
  - 解释为
    - `<MyMovice v-slot:在插槽定义的名字(之前在插槽中name的名字)="这个是可以自定义的">`
- 注意：在`:`后面定义的变量要在,插入插槽的组件中，名字一样

+ 例如在被插入的插槽

```vue
<template>
<h1>MYMOVICE组件</h1>
<div>
<slot :info="demand" :deny="depart"></slot>
</div>
</template>
```

- 被传入数据的插槽

~~~vue
<MyMovice v-slot:default="{deny,info}">
  <p>{{ deny.deparment }}</p>
  <p> {{ info.democracy }}</p>
  <p> {{info.dentist}}</p>
</MyMovice>
~~~

- `:default`后面的数据名和`<slot :info="demand" :deny="depart"></slot>`要一致

### 插槽结构作用域prop——结构赋值方法(实际开发会用)

- App组件

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <MyMovice v-slot:default="{deny,info}">
      <p>{{ deny.deparment }}</p>
      <p> {{ info.democracy }}</p>
      <p> {{info.dentist}}</p>
    </MyMovice>
  </div>
</template>
```

> `v-solt`可以简写所以是

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <MyMovice #default="{deny,info}">
      <p>{{ deny.deparment }}</p>
      <p> {{ info.democracy }}</p>
      <p> {{info.dentist}}</p>
    </MyMovice>
  </div>
</template>
```

- 被插入的插槽

~~~vue
<template>
<h1>MYMOVICE组件</h1>
<div>
<slot :info="demand" :deny="depart"></slot>
</div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "MyMovice",
  setup(){
    let demand=reactive({
      democracy:"民主",
      dentist:"牙医"
    })
    let depart=reactive({
      deparment:"部门"
    })
    return {demand,depart}
  }
}
</script>
~~~

### 了解作用域插槽使用场景——表格

- 主窗口

~~~vue
<template>
  <div>
    <h1>App 根组件</h1>
    <MyMovice #default="{depature}">
      <td>{{ depature.id }}</td>
      <td> {{ depature.name }}</td>
      <td> <input type="checkbox" :checked=" depature.state"></td>
    </MyMovice>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, ref, onBeforeMount, watch, nextTick} from "vue";
import MyMovice from "./components/MyMovice.vue";
import Home from "./components/Home.vue";

export default {
  name: 'MyApp',
  components: {
    MyMovice,
    Home
  },
  setup(p, c) {
    let deliver = ref("MyMovice")
    return {deliver}
  }
}
</script>
~~~

- 插槽

~~~vue
<template>
  <h1>MYMOVICE组件</h1>
  <div>
    <table class="table table-hover table-success">
      <!--  表头-->
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>State</th>
      </tr>
      </thead>
      <!--  表身-->
      <tbody>
      <tr v-for="item in list" :key="item.id">
        <slot :depature="item"></slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "MyMovice",
  setup() {
    let demand = reactive({
      democracy: "民主",
      dentist: "牙医"
    })
    let depart = reactive({
      deparment: "部门"
    })
    let store = reactive({
      list: [
        {id: 1, name: '张三', state: true},
        {id: 2, name: '李四', state: false},
        {id: 3, name: '赵六', state: false},
      ],
    })
    return {demand, depart, ...toRefs(store)}
  }
}
</script>
~~~

## 自定义指令

### 基本使用

- 放在`directives`之后在`mounted`

~~~vue
<template>
  <div class="home-container">
    <input type="text" class="form-control" v-focus />
    <button type="button" class="btn btn-primary" >+1</button>
  </div>
</template>
<script>
export default {
  name: 'SON1',
  directives:{
    focus:{
      //当元绑定的元素插入到DOM中时会自动触发mounted函数
      mounted(el){
        el.focus();
      }
    }
  }
}
</script>

~~~

### 全局指令

- 在main.js中

~~~JavaScript
const app = createApp(App);
app.directive('focus',{
    mounted(el){el.focus()}
})
~~~

- 实际去使用

~~~vue
<template>
<h1>APP组件</h1>
  <input type="text" class="form-control" v-focus />
  <SON1></SON1>
</template>
~~~

### updated使用

- 当我们点击按钮时候，输入框会失去焦点，使用这个函数可以让她重复获取焦点

~~~JavaScript
const app = createApp(App);
app.directive('focus',{
    mounted(el){el.focus()},
    updated(el){el.focus()}
})
~~~

```vue
<template>
  <h1>APP组件</h1>
  <input type="text" class="form-control" v-focus/>
  <h3>MyHome 组件 --- {{ b }}</h3>
  <button type="button" class="btn btn-primary" @click="b++">+1</button>
</template>

<script>
import SON1 from "./components/SON1.vue";
import {reactive, toRefs} from "vue";
export default {
  name: "App",
  components: {SON1},
  setup() {
    let a = reactive({b: 0});

    return {...toRefs(a)}
  }
}
</script>
```

#### 自定义指令简写形式

- 如果mounted和updated函数逻辑完全相同，可以简写如下形式

~~~JavaScript
app.directive('focus',(el)=>{
    el.focus();
})
~~~

### 自定义指令的传参，指令传参

- main.js

```javascript
const app = createApp(App);
app.directive('color',(el,bing)=>{
    console.log(el.style.color,bing.value)
    el.style.color=bing.value;
})
```

- App组件

```vue
<template>
  <h1 v-color="'red'">APP组件</h1>
  <input type="text" class="form-control" v-color="'red'" v-focus/>
</template>
```

## 路由

### 介绍

- 安装最新路由版本
  - `npm install vue-router@next -S`

- 路由类似于table栏切换,当点击某一个链接时候就会在下方的,内容去渲染出我们点击的那个链接

### 基本使用

- 当点击页面上的a标签时，会转到对应的窗口组件中
- 使用时注意，要导入组件，并且要写到`component`中`:is`中记得`:is`下。is加冒号是因为组件是动态的如果不加冒号则是静态的,静态组件无法转换窗口
- 并且还要在`created`函数中声明,获取的是搜索栏中的信息所以使用的是`location.hash`
  - 将其对应的值转换成对应的窗口
    - 但是在实际的开发中是不使用`location.hash`我们使用vue提供的`vue-router`

~~~vue
<template>
  <h1>App组件</h1>
  <a href="#/home">HOME</a>
  <a href="#/movice">movice</a>
  <a href="#/about">About</a>
  <hr>
  <component :is="countName">
  </component>
</template>

<script>
import {inject, reactive, toRefs, ref} from "vue";
import MyAdepair from "./components/MyAdepair.vue"
import MyHomedesperate from "./components/MyHomedesperate.vue"
import MyMovicedespite from "./components/MyMovicedespite.vue"

export default {
  name: "App",
  components: { MyHomedesperate, MyAdepair, MyMovicedespite,},
  setup() {
    let countName = ref("MyHomedesperate");
    return {countName}
  },
  created() {
    window.onhashchange = () => {
      switch (location.hash) {
        case"#/home":
          this.countName = "MyHomedesperate"
          break;
        case "#/movice":
          this.countName = "MyMovicedespite"
          break;
        case "#/about":
          this.countName = "MyAdepair"
          break;
      }
    }
  }
}
</script>
~~~

### vue-router使用——普通的

#### 步骤

- 别忘了在最后导出

1. 创建`router.js`并且导入两个包`createRouter,createWebHashHistory`

~~~JavaScript
//导入createRouter和createWebHashHistory两个包
import {createRouter,createWebHashHistory} from "vue-router";
//将需要进行路由的组件导入进来
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";
//创建路由对象
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        // path是指点击标签的链接
        //component是指要展示的对应组件
        {path:"/home",component:MyAdepair},
        {path:"/movice",component:MyHomedesperate},
        {path:"/about",component:MyMovicedespite},
    ]
});
//最后一定要导出。因为要在main.js中去使用
export default router
~~~

2. 在main.js中导入`router.js`

~~~javascript
// 在main.js中导入路由文件
import router from "./router"
// 将app拆分
const app = createApp(App);
// 最后使用use使用就行
app.use(router)
~~~

3. 在App组件中

~~~vue
<template>
  <h1>App组件</h1>
<!--创建链接，这里to不写#是因为to可以帮我们自动加上#-->
  <router-link to="/home">首页</router-link>&nbsp;
  <router-link to="/movice">电影</router-link>&nbsp;
  <router-link to="/about">关于</router-link>
  <hr>
<!--声明占位符-->
  <router-view>  </router-view>
</template>
~~~

### vue-router高级用法

#### 路由重定向

- 使用`redirect`

~~~javascript
import {createRouter, createWebHashHistory} from "vue-router";
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";

//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),//指定路由工作模式
    routes: [
        {path: "/", redirect: "/home"},//当访问根路径时自动跳转到 "/home"
        {path: "/home", component: MyAdepair},
        {path: "/movice", component: MyHomedesperate},
        {path: "/about", component: MyMovicedespite},
    ]
});

export default router
~~~

#### 路由的高亮显示

- 在vue中，当我们点击路由的链接被激活时候，会提供一个class类名`router-link-active`
- 实现1
  - 依据这个类名就可以使用了

~~~css
.router-link-active{
  background-color: #1e7e34;
  color: #9fcdff;
}
~~~

- 自定义路由类名

~~~JavaScript
linkActiveClass:"router-active",//添加自定义类名
~~~

~~~JavaScript
import {createRouter, createWebHashHistory} from "vue-router";
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";

//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),//指定路由工作模式
    linkActiveClass:"router-active",//添加自定义类名
    routes: [
        {path: "/", redirect: "/home"},
        {path: "/home", component: MyHomedesperate},
        {path: "/movice", component: MyAdepair},
        {path: "/about", component: MyMovicedespite},
    ]
});

export default router

~~~

- 在使用时候就可以用`router-active`类名去定义

~~~css
/*默认的*/
.router-link-active{
  background-color: #1e7e34;
  color: #9fcdff;
}
/*自定义的*/
.router-active{
  background-color: #1e7e34;
  color: #9fcdff;
}
~~~

#### 嵌套路由

- 第一步——声明子路由链接在`.vue`
  - 声明路由链接
  - 和路由展示标签

~~~vue
<template>
 <h1>about组件</h1>
<!--  声明关于页面中，两个子路由连链接-->
  <router-link to="/about/tab1">tab1</router-link>
  <router-link to="/about/tab2">tab2</router-link>
<!--  在关于页面中，声明tab1 和 tab2 的路由占位符-->
  <router-view></router-view>
</template>
~~~

- 第二步——通过children属性声明子路由规则
  - 在路由规则中除了有`redirect`、`path`、`component`还有`children`
  - 注意在子路由中是不要加`/`的
    - 要创建并导入组件

~~~javascript
import {createRouter, createWebHashHistory} from "vue-router";
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";
import tab1 from "./components/tab1.vue";
import tab2 from "./components/tab2.vue";
//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),//指定路由工作模式
    linkActiveClass: "router-active",//添加自定义类名高亮路由类
    routes: [
        {path: "/", redirect: "/home"},
        {path: "/home", component: MyHomedesperate},
        {path: "/movice", component: MyMovicedespite},
        //子路由对象 在这个里面不要加 /
        {
            path: "/about", component: MyAdepair, children: [
                {path: "tab1", component: tab1},
                {path: "tab2", component: tab2}
            ]
        },
    ]
});

export default router;
~~~

#### 嵌套路由——字路由重定向

- 在路由中，添加子路由的链接
- 使用`redirect:"/about/tab1", `

~~~JavaScript
import {createRouter, createWebHashHistory} from "vue-router";
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";
import tab1 from "./components/tab1.vue";
import tab2 from "./components/tab2.vue";
//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),//指定路由工作模式
    linkActiveClass: "router-active",//添加自定义类名高亮路由类
    routes: [
        {path: "/", redirect: "/home"},
        {path: "/home", component: MyHomedesperate},
        {path: "/movice", component: MyMovicedespite},
        //子路由对象 在这个里面不要加 /
        {
            path: "/about",
            redirect:"/about/tab1", 
            component: MyAdepair, 
            children: [
                {path: "tab1", component: tab1},
                {path: "tab2", component: tab2}
            ]
        },
    ]
});

export default router

~~~

#### 高级路由——动态路由使用

- 在原有的基础上加上`/:这个随便取都行`

```JavaScript
{path: "/movice/:id", component: MyMovicedespite},
```

- 完整
  - router.js

~~~JavaScript
import {createRouter, createWebHashHistory} from "vue-router";
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";
import tab1 from "./components/tab1.vue";
import tab2 from "./components/tab2.vue";
//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),//指定路由工作模式
    linkActiveClass: "router-active",//添加自定义类名高亮路由类
    routes: [
        {path: "/", redirect: "/home"},
        {path: "/home", component: MyHomedesperate},
        {path: "/movice/:id", component: MyMovicedespite},
        //子路由对象 在这个里面不要加 /
        {
            path: "/about",
            redirect:"/about/tab1",
            component: MyAdepair,
            children: [
                {path: "tab1", component: tab1},
                {path: "tab2", component: tab2}
            ]
        },
    ]
});

export default router;
~~~

- App组件

~~~vue
<template>
  <h1>App组件</h1>
  <router-link to="/home">首页</router-link>&nbsp;
  <router-link to="/movice/1">电影1</router-link>&nbsp;
  <router-link to="/movice/2">电影2</router-link>&nbsp;
  <router-link to="/movice/3">电影3</router-link>&nbsp;
  <router-link to="/about">关于</router-link>
  <hr>
<!--声明占位符-->
  <router-view>  </router-view>
</template>
~~~

#### 参数对象——获取参数值

##### 方法一

- 定义在组件后面的名字要一样，之前定义的是id如果换成mid那么对应的`$route.params.mid`也要改

~~~JavaScript
$route.params.id//id是定义在组件中 `/后面的名字`要和这个一样
~~~

##### 方法二

- 在router.加上开启props

~~~JavaScript
props:true
//详细的
{path: "/movice/:id", component: MyMovicedespite,props:true},
~~~

- 完整的

~~~JavaScript
import {createRouter, createWebHashHistory} from "vue-router";
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";
import tab1 from "./components/tab1.vue";
import tab2 from "./components/tab2.vue";
//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),//指定路由工作模式
    linkActiveClass: "router-active",//添加自定义类名高亮路由类
    routes: [
        {path: "/", redirect: "/home"},
        {path: "/home", component: MyHomedesperate},
        {path: "/movice/:id", component: MyMovicedespite,props:true},
        //子路由对象 在这个里面不要加 /
        {
            path: "/about",
            redirect:"/about/tab1",
            component: MyAdepair,
            children: [
                {path: "tab1", component: tab1},
                {path: "tab2", component: tab2}
            ]
        },
    ]
});

export default router;
~~~

- 在组件中

~~~vue
<template>
  MyMovicedespite
  <h3>----{{$route.params.id}}</h3><!--不使用传参时，就这么写-->
  <h3>----{{id}}</h3><!--使用传参时就这么写-->
</template>

<script>
export default {
  name: "MyMovicedespite",
  props:["id"]//接受传参 这里id是在router `/movice/:id`
}
</script>
~~~

#### 编程式导航——$router.push('地址')或者$router.go('地址')

- $router.go('地址')
  - 是为了事项导航的前进和后退

~~~vue
<template>
  MyHomedesperate——当我们点击按钮时候可以跳转到指定的页面中去
  <button @click="goToMovice(3)" class="btn-success">跳转到Movice</button>
</template>

<script>
import {useRouter} from "vue-router";//在vue3中是没有this的所以导入这个可以使用

export default {
  name: "MyHomedesperate",
  setup(props, context) {
    const router = useRouter();//声明router 其实可以放在全局的但是为了方便就放在这了

    // 回到上一个
    function goToMovice(id) {
      router.push(`/movice/${id}`)
    }

    return {goToMovice}
  }
}
</script>
~~~

- $router.push('地址')
  - 跳转到指定的hash地址

~~~vue
<template>
  MyHomedesperate——点击按钮时候可以回退到之前访问的路由中去
  <button class="btn btn-danger" @click="goBack()">后退</button>
</template>

<script>
import {useRouter} from "vue-router"

export default {
  name: "MyHomedesperate",
  setup(props, context) {
    const router = useRouter();

    //回到上一个
    function goBack() {
      router.go(-1)
    }

    return {goToMovice, goBack}
  }
}
</script>
~~~

#### 命名路由——使用命名实现声明式导航

- 使用命令路由时要在`router.js`中指定name名字

~~~JavaScript
{name: "mov", path: "/movice/:id", component: MyMovicedespite, props: true},
~~~

- 之后在要使用的组件中导入
- 因为vue3没有this，所以使用

~~~JavaScript
import {useRouter} from "vue-router";
export default {
    name: "dessert",
    setup(){
        const router=useRouter();
        router.push(对应的参数);
    }
~~~

- 在组件中
  - 其中to因为是动态的所以在前面要加上`:to`要加冒号

~~~VUE
<template>
<h3>MyHOME——声明式导航</h3>
  <router-link :to="{name:'mov',params:{id:3}}">去电影</router-link>
  <button class="btn btn-success" @click="goMovice(3)" >去电影</button>
  <router-view></router-view>
</template>

<script>
import {useRouter} from "vue-router";//导入包
export default {
  name: "dessert",
  setup(){
    const router=useRouter();//使用
    function goMovice(id){
        // 跳转
      router.push({
        name:"mov",
        params:{
          id:id
        }
      })
    }
    return{goMovice}
  }
}
~~~

### 路由高级使用——导航守卫

- 全局导航守卫

- 定义一个router.beforeEach(t(o,from,next)={})

  - to 表示目标的对象

  - from 当前导航正要离开的对象

  - next 是一个函数，表示放行

- 只要next()函数不被使用就无法看见对应的内容

##### 判断用户在哪个页面,然后对其操作

```javascript
router.beforeEach((to,from,next)=>{
   // 如果path是home代表正在访问home如果是的，那么久允许放行
    if(to.path==="/home"){
       next();
    }
})
```

##### next(false)强制用户停留在当前页面

~~~JavaScript
import {createRouter, createWebHashHistory} from "vue-router";
import MyAdepair from "./components/MyAdepair.vue";
import MyHomedesperate from "./components/MyHomedesperate.vue";
import MyMovicedespite from "./components/MyMovicedespite.vue";
import tab1 from "./components/tab1.vue";
import tab2 from "./components/tab2.vue";
import dessert from "./components/dessert.vue";

//创建路由对象
const router = createRouter({
    history: createWebHashHistory(),//指定路由工作模式
    linkActiveClass: "router-active",//添加自定义类名高亮路由类
    routes: [
        {path: "/", redirect: "/home"},
        {path: "/home", component: MyHomedesperate},
        {path: "/dessert", component: dessert},
        {name: "mov", path: "/movice/:id", component: MyMovicedespite, props: true},
        //子路由对象 在这个里面不要加 /
        {
            path: "/about",
            redirect: "/about/tab1",
            component: MyAdepair,
            children: [
                {path: "tab1", component: tab1},
                {path: "tab2", component: tab2}
            ]
        },
    ]
});
/*
router.beforeEach((to,from,netx)=>{
    // -  to 表示目标的对象
    // -  from 当前导航正要离开的对象
    // -  next 是一个函数，表示放行
netx();//被使用时才可以看见定义的内容
})
*/

router.beforeEach((to,from,next)=>{
   // 如果path是home代表正在访问home如果是的，那么久允许放行
    if(to.path==="/home"){
       next(false);
    }
})
export default router
~~~

##### 强制跳转到指定页面next("/movice")

- 如果里面传的是hash地址那么就可以跳转到指定页面了

```javascript
router.beforeEach((to,from,next)=>{
   // 如果path是home代表正在访问home如果是的，那么久允许放行

    if(to.path==="/home"){
        next("/movice");
    }else {
        next()
    }
})
```

##### 获取token值如果存在就让其访问反之不能

```JavaScript
router.beforeEach((to,from,next)=>{
   // 如果path是home代表正在访问home如果是的，那么久允许放行
const tokenstr=localStorage.getItem("token");
if(to.path==="/home"&& !tokenstr){
    next("/dessert");
}else {
    next();
}
})
```

## 创建Vue方法

### 通过cli创建

#### 介绍

- `npm install -g @vue/cli`
- 查看vue-cli 版本`vue --version`

#### 创建

- `vue create 项目名称`

### 创建vue可视化面板

- `vur ui`

## 拦截请求

- 失败的的函数可以不写

### 拦截请求

```JavaScript
import axios from "axios";
// 拦截器
axios.interceptors.request.use((config) => {
    return config;
},(error)=>{
    return Promise.error.reject(error)
})

app.provide("httpsAxios", axios);
```

### 请求拦截——token认证

```JavaScript
import axios from "axios";
const app = createApp(App);
// 拦截器
axios.interceptors.request.use((config) => {
    config.headers.Authorzidingyi="zi ding yi ziduan "
    return config;
},(error)=>{
    return Promise.error.reject(error)
})
app.provide("httpsAxios", axios);
```

### 实现ElemntUI

#### 安装

- 安装element ui`npm i element-ui -S`

##### 在main.js中

```JavaScript
const app = createApp(App);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
```

#### 按需引入

##### 创建babel.config.js

- `npm i babel-plugin-component -D`

```javascript
module.exports = {
    "presets": [["es2015", {"modules": false}]],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

- 引入我们需要的包，这样构建的时候不会显得很大

- 在main .js中

```JavaScript
//按需引入组件
import {Button} from "element-ui"
```

### Vue3引入

- `npm install --save element-plus`

```javascript
import App from './App.vue';
import element from 'element-plus';
import 'element-plus/theme-chalk/index.css'
app.use(element)
```

### 请求拦截器——展示Loading效果

#### 网址是

#### - [element ui 提供的 Loading 效果组件](https://element.eleme.cn/#/zh-CN/component/loading)

```JavaScript
import axios from "axios";
const app = createApp(App);
import ElementUI from "element-ui";
vue.use(ElementUI)
//显示loading效果
import {Loading} from "element-ui";
let loadingInstance=null;
axios.interceptors.request.use(config=>{
    loadingInstance=loading.service({funllscreen:truet})
})
```

### 关闭拦截器loading效果

```JavaScript
import App from './App.vue';
import axios from "axios";
const app = createApp(App);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
vue.use(ElementUI)
axios.interceptors.response.use(response=>{
    loadingInstance.close();
    return response
})
```

## 跨域

### 解决跨域问题

- 创建vue.config.js
  - 可以这么简写


~~~JavaScript
module.exports = {
    devServer: {
        proxy: 'http://c.m.163.com'//网址为要访问的对象
    }
}
~~~

- 详细的

```JavaScript
module.exports = {
    devServer: {
        proxy: {
            '/nc/article/headline/T1348647853363': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                //http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html
                target:  "https://c.m.163.com",
                // target:  "https://www.baidu.com/",
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
```

- 在main.js中
- 这个地址可以写"http://localhost:8080"也可以写网址的前半部分
  - 例如完整的URL`http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html`
  - 在这里可以拆分写成`/nc/article/headline/`

```JavaScript
import axios from "axios";
axios.defaults.baseURL="http://localhost:8080"
```

### 详细介绍地址

[详细的解释](https://www.jb51.net/article/235490.htm)

### 安装npm错误

- `npm install --force`



# 尚品汇初始化

## 安装npm/yarn

### npm 

#### 设置缓存目录

```shell
npm config set prefix "D:\nodejs\node_global"
npm config set cache "D:\nodejs\node_cache"
```

#### 安装npm

- 安装并设置淘宝镜像
  - `npm config set registry https://registry.npm.taobao.org`

##### 安装npm稳定

- `npm install npm@latest -g`

##### 安装最新版

- `npm install npm@next -g`

### yarn

#### 安装yarn

- 使用npm安装yarn
  - `npm install -g yarn`

#### 设置yarn镜像

- `yarn config set registry https://registry.npm.taobao.org`

## 初始化

### 需要下载的包

```shell
npm i vue-router vuex less less-loader --save
npm i nprogress axios  mockjs  mitt -D
npm i vue-lazyload -S
npm i vue3-lazyload
npm install vee-validate --save
npm install swiper@5.0.0 --save
npm install webpackbar --save
```

#### 下载包错误/用不了？

###### axios

- axios不是vite中开发的所以在这边可以直接使用，不需要package.json中声明

###### vuex

- 这个是刚接触的，但是在vue3中使用也不是很难
- 基本模板

~~~JavaScript
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});
~~~

- 在`main.js`使用

~~~JavaScript
import store from './store';
app.use(store);

~~~

- 在其他组件使用

~~~JavaScript
import { useStore } from 'vuex' // 引入useStore 方法
const store = useStore()  // 该方法用于返回store 实例
console.log(store)  // store 实例对象
~~~

###### mockjs

- 是模拟数据用的，比如在没有服务器的情况下，模拟向服务器发请求
  - 这些请求的参数在`json`文件中
- 这次我们使用的是`banner.json`和`floor.json`

> 文件的类型就是JSON文件，写几个模拟返回数据的东西就行

###### swiper

- swiper在这边下载的都是最新的，如果想用就将老师的文件引入进来就行

### 创建文件

- `vue create app_v3`

### 打包显示进度条

- 下载`npm install webpackbar --save`
- 引入下面的

```JavaScript
const WebpackBar = require('webpackbar');
module.exports = defineConfig({
 configureWebpack: {
        plugins: [new WebpackBar()],
    },
})
```

### 使用的版本vue3

### 关闭eslint

````javascript
module.exports={
//  关闭eslint
  lintOnSave:false
}
````

### 自动打开浏览器

- 在package.json中添加

````josn
  "scripts": {
  "serve": "vue-cli-service serve --open",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint"
  },  
````

### 思路

1. 写HTML+CSS
2. 拆分组件
3. 获取服务器的数据动态展示
4. 完成响应的业务逻辑

> 创建组件时候，组件结构+组件样式+图片资源

### 浏览器打开 0.0.0.0:8080

~~~javascript
//设置地址
devServer: {host: 'localhost', port: 8080,},
~~~

### 注意！！！

#### 第一次数据没有值

- 这个情况，第一次输出没有值但是可以使用
- 如果真的想看到值可以将`reacvite`换成`ref`

> 这种写法可以但是相对比较麻烦，但是可以方便我们调试

# 商品汇开始

## 初步搭建

### 1.创建项目

~~~shell
vue create commodity_exchange
~~~

### 2.语法报错

- 在`vue.config.js`下添加

~~~JavaScript
lintOnSave: false,//防止eslint报错
~~~

### 3.文件夹简写名

- 配置别名使用@符就行

~~~JSON
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}
~~~

## 完成Header和Footer

### Header组件

1. 在`src/components/Header/index.vue`创建`index.vue`文件
2. 将文件Header导入是沛鸿老师的
   - 将页面和样式引入
3. 之后将images放在Header组件下
4. 这是发现样式不对要清除样式
   - 在`public/index.html`下引入

```html
<link rel="stylesheet" href="reset.css">
```

- 要导入Header组件

~~~vue
<template>
  <Header/>
</template>
<script>
import Header from "@/components/Header/index";
export default {
  name:"App",
  components:{Header},
}
</script>
~~~

### Footer组件

- 创建`index.vue`在`src/components/Footer/index.vue`

1. 将文件页面和样式导入
2. 有个底部的微信二维码给放在`src/components/Footer/images/wx_cz.jpg`
3. 之后在`App.vue`导入Footer组件

## 路由搭建

- 创建page文件夹`src/Page`在这个文件夹下建立
  - Home
  - Login
  - Search
  - Registers

### 创建router文件夹

1. `src/router/index.js`先创建index.js文件
2. 再创建`src/router/router.js`文件
3. 将下面代码导入到router.js中

~~~JavaScript
export const routes = [
    {path: "/",component:()=>import("@/Page/Home")},
    {path: "/home", component: () => import("@/Page/Home")},
    {path: "/search", component: () => import("@/Page/Search")},
    {path: "/login", component: () => import("@/Page/Login")},
    {path: "/register", component: () => import("@/Page/Register")}
]
~~~

4. 之后在`src/router/index.js`使用

```JavaScript
import {createRouter, createWebHistory} from 'vue-router';
import {routes} from "@/router/router";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
```

5. 在APP.VUE中引入`router-view`

~~~vue
<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>
~~~

### Header中改写

- button要添加gosearch方法

```vue
<router-link to="/login">登录</router-link>
<router-link class="register" to="/register">免费注册</router-link>
······
<!--头部第二行 搜索区域-->
<div class="bottom">
    <h1 class="logoArea">
        <router-link class="logo" >
            <img src="./images/logo.png" alt="">
        </router-link>
    </h1>
</div>
······
<button class="sui-btn btn-xlarge btn-danger" type="button" @click="gosearch">搜索</button>
```

#### gosearch方法

- 需要引入的

```JavaScript
import {reactive, toRefs} from "vue";
import {useRouter} from "vue-router";
```

- 在Header组件中添加gosearch方法

~~~JavaScript
  setup() {
    const UseRouter = useRouter();
    const Fun = reactive({
      gosearch() {
        // this.$router.push("search");
        UseRouter.push("search");
      }
    });

    return {...toRefs(Fun)}
  }
~~~

# 尚品汇建立

## 基本搭建

### Footer是否显示

- 在登录或者注册页面时候不需要显示Footer组件这时候需要隐藏

#### App组件下

```vue
<Footer v-if="$route.meta.show"></Footer>
```

#### router下

- 添加meta属性，show为布尔值

```JavaScript
export const routes = [
    {path: "/", redirect:"/home"},
    {path: "/home", component: () => import("@/Page/Home"), meta: {show: true}},
    {path: "/search", component: () => import("@/Page/Search"), meta: {show: true}},
    {path: "/login", component: () => import("@/Page/Login"), meta: {show: false}},
    {path: "/register", component: () => import("@/Page/Register"), meta: {show: false}}
]
```

### Header搜索传参

- 点击搜索按钮传递参数

```vue
<input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyWord"/>
```

- 定义keyword关键字传递参数使用

```JavaScript
setup() {
  const UseRouter = useRouter();
  const Str = reactive({
    keyWord: "",
  })
  const Fun = reactive({
    gosearch() {
      UseRouter.push("search");
      UseRouter.push({name: "search", params: {keyword: Str.keyWord}, query: {k: Str.keyWord.toUpperCase()}})
    }
  });


  return {...toRefs(Fun), ...toRefs(Str)}
}
```

## 三级联动

### TypeNav注册全局

- 拆分结构

#### 1.创建TypeNav

1. 在src/components/TypeNav/TypeNav.vue创建

2. 之后将样式和文件引入


#### 2.注册全局组件

- 在main.js下

```JavaScript
//引入三级联动组件
import TypeNav from "@/Page/Home/TypeNav";
app.component(TypeNav.name,TypeNav);
```

#### 3.Home引入

- src/Page/Home/TypeNav.vue
- 引入TypeNav

```vue
<template>
	<TypeNav/>
</template>
```

### 拆分静态组件

- 分别为

1. ListContainer
2. Recommend
3. Rank
4. Like
5. Floor
6. Brand

- 拆分完成之后在Home文件夹下引入

```vue
<template>
  <TypeNav/>
  <ListContainer/>
  <Recommend/>
  <Rank/>
  <Like/>
  <Floor/>
  <Brand/>
</template>
<script>
import ListContainer from "@/Page/Home/ListContainer";
import Recommend from "@/Page/Home/Recommend";
import Rank from "@/Page/Home/Rank";
import Like from "@/Page/Home/Like";
import Floor from "@/Page/Home/Floor";
import Brand from "@/Page/Home/Brand";
export default {
  name: "Home",
  components: {Brand, Floor, Rank, Recommend, ListContainer,Like}
}
</script>
```

### axios二次封装

- 基本模板
  - 配置响应拦截器和请求拦截器
- 但是我们项目比较大，所以在axios中需要将请求模块单独拎出来

#### request

- src/api/request.js

```JavaScript
//对axios二次封装
import axios from "axios";

/**
 * 利用axios 对象的方法create 去创建一个axios实例
 * request就是axios只不过稍微配置了下
 * */

const request = axios.create({
    baseURL: "/api",//请求的基础路径
    timeout: 5000,//超时时间
});

//请求拦截器
request.interceptors.request.use((config) => {
    return config;
});

//响应拦截器
request.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(new Error("失败"));
});

export default request;
```

#### API统一管理

- src/api/index.js

##### 跨域

- 地址为http://gmall-h5-api.atguigu.cn

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
};
```

##### 自己写的

- 将地址替换为http://gmall-h5-api.atguigu.cn

```JavaScript
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,//防止eslint报错
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
            },
        },
    },
})
```

### 安装进度条

~~~shell
npm i nprogress -D
~~~

- 引入进度条和样式

```JavaScript
/**
 * 进度条
 * strat()开始动
 * done()结束
 * 引入进度条样式
 * */
import nprogress from "nprogress";
import "nprogress/nprogress.css";
```

- 分别在响应拦截器中添加

```JavaScript
request.interceptors.request.use((config) => {
    nprogress.start();//进度条开始
    return config;
});

//响应拦截器
request.interceptors.response.use((res) => {
    nprogress.done();//进度条结束
    return res.data;
}, (error) => {
    return Promise.reject(new Error("失败"));
});
```

### 创建store仓库

- 新建文件夹store，在下面建立index.js文件
- 后期我们要将home和search模块分开使用，所以还要在建立两个小仓库

#### 仓库基本模板

```JavaScript
import {createStore} from 'vuex'

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
});
```

#### 大仓库

```JavaScript
import {createStore} from 'vuex'
import home from "@/store/home";
import search from "@/store/search";

export default createStore({
    modules: {
        home, search
    }
});
```

#### home和search

```JavaScript
import {createStore} from 'vuex'

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
});
```

> 做到这，要将typenav要移到公共的目录下

### TypeNav展示

1. 在typenav下建立mounted函数，调用仓库函数

```JavaScript
mounted() {
  home.dispatch("CategoryList");
},
```

2. home中仓库构建

```JavaScript
import {createStore} from 'vuex'
import {BaseCategoryList, reqBaseCategoryList} from "@/api";

export default createStore({
    state: {
        CategoryList: [],//三级联动数据
    },
    getters: {},
    mutations: {
        CATEGORYLIST(state, CategoryList) {
            //将数据传递给state
            state.CategoryList = CategoryList;
        }
    },
    actions: {
        // 三级联动初始化展示
        async CategoryList({commit}) {
            let result = await reqBaseCategoryList();
            //将数据传递给 mutations->CATEGORYLIST
            if (result.code === 200) commit("CATEGORYLIST", result.data);
        }
    },
    modules: {}
});
```

3. typenav中js

```JavaScript
import home from "@/store/home";
import {reactive, toRefs, computed, watch, h} from "vue";
import {mapState, useStore} from "vuex";

export default {
  name: "TypeNav",
  setup() {
    const Str = reactive({
      CategoryList: computed(()=>home.state.CategoryList)
    });

    return {...toRefs(Str)}
  },
  mounted() {
    home.dispatch("CategoryList");
  },
}
```

4. 三级联动页面

```html
<div class="sort">
  <div class="all-sort-list2">
    <div class="item" v-for="(c1,index) in CategoryList" :key="c1.categoryId">
      <h3>
        <a href="">{{c1.categoryName}}</a>
      </h3>
      <div class="item-list clearfix">
        <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
          <dl class="fore">
            <dt>
              <a href="">{{c2.categoryName}}</a>
            </dt>
            <dd>
              <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                <a href="">{{ c3.categoryName }}</a>
              </em>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 鼠标经过

#### 添加背景色

- 当鼠标经过商品分类时添加一个类名背景色
- 变量名初始值为
  - 目的是为了刚刷新没有经过分类时是没有颜色的值为-1
- `@mouseleave="cuurentHover(-1)"`
  - 鼠标离开时变量名恢复原来颜色值为-1
- `@mouseenter="cuurentHover(index)"`
  - 将当前的index值传入，与当前类名值进行判断相同添加颜色不相同不添加

```vue
<div @mouseleave="cuurentHover(-1)">
 ...
    <div class="item"  v-for="(c1,index) in CategoryList" :key="c1.categoryId" :class="{current:currentIndex==index}">
 ...
        <h3 @mouseenter="cuurentHover(index)" >... </h3>
 ...
</div>
```

##### JS

```JavaScript
//内容
const Str = reactive({
  CategoryList: computed(()=>home.state.CategoryList),
  currentIndex:-1,//初始值
});

//函数
const Fun=reactive({
  //鼠标经过添加类名
  cuurentHover(index){
    Str.currentIndex=index;
  }
})
return {...toRefs(Str),...toRefs(Fun)}
```

#### 右侧商品显示隐藏

- 当商品当前索引等于currentIndex`currentIndex`值时代表经过当前

```vue
···
<div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
···
```

#### 防抖与节流

- 防抖和节流都是lodash

~~~shell
npm i --save lodash
~~~

##### 将lodash导入

```javascript
import _ from "lodash";//全部引入
import {throttle} from "lodash";//部分引入
```

- 在鼠标经过修改currentindex值时添加节流函数

```JavaScript
cuurentHover: throttle(function (index){
    Str.currentIndex = index;
},10)//延时时间为10ms
})
```

### 路由跳转

#### 路由跳转类别

- 声明式导航
  - router-link
- 编程式
  - 使用函数push或者replace

#### 编程式传参

- 判断属于那一个分类，之后进行传参
- 整理参数之后跳转
  - 这时判断一下是不是有categoryName有跳转没有不跳转

```JavaScript
// 路由跳转到搜索页
goSearch(event) {
    let result = event.target;
    let {categoryname, category1id, category2id, category3id} = result.dataset;
    let loacion = {name: 'search'};
    let query = {categoryName: categoryname};

    //判断是哪个 category1id
    if (category1id) {
        query.category1id = category1id;
    } else if (category2id) {
        query.category2id = category2id;
    } else if (category3id) {
        query.category3id = category3id;
    }
    //重新整理参数
    loacion.query = query;
    // 判断是不是为空值，如果是空值从不跳转
    loacion.query.categoryName !== undefined ? UseRouter.push(loacion): false;
},
```

### TypeNav动画和显示

#### TypeNav显示与隐藏

- 只要不是在home路由下希望刚进入页面就隐藏，鼠标经过显示

```JavaScript
mounted() {
  home.dispatch("CategoryList");
  //页面被加载时只要不是home路由下就隐藏
  if (useRoute().path !== "/home") this.show = false;
},
```

##### 当鼠标经过时显示

- JS

```JavaScript
//鼠标经过添加类名
cuurentHover: throttle(function (index) {
  Str.currentIndex = index;
  if (UseRoute.path !== "/home") Str.currentIndex === -1 ? Str.show = false : Str.show = true;
}, 10),
```

- 页面
  - 鼠标经过时传入值为-2这样不会刚被加载就有背景色

```vue
<div @mouseleave="cuurentHover(-1)" @click="goSearch" @mouseenter="cuurentHover(-2)">
  ···
  <!--        过渡动画-->
 <transition name="sort">
   <div class="sort" v-show="show">
       ···
   </div>
 </transition>
</div>
```

- less
  - 过渡动画

```less
  //  过渡动画
  .sort-enter-from {
    height: 0;
    background-color: #c81623;
  }

  .sort-enter-to {
    height: 561px;
  }

  .sort-enter-active {
    transition: all .8s ease-out;
  }
}
```

### 三级联动请求转移位置

- 放在App中考虑性能

```JavaScript
mounted() {
  //获取三级联动
  home.dispatch("CategoryList");
}
```

### 两个数据携带

- 有params参数和query参数，连两个参数在使用时候点击一方如果有要携带过去，不能替换当前地址栏中的数据

#### params

```JavaScript
// 路由跳转到搜索页
goSearch(event) {
  let result = event.target;
  let {categoryname, category1id, category2id, category3id} = result.dataset;
  let loacion = {name: 'search'};
  let query = {categoryName: categoryname};
  //判断是哪个 category1id
  if (category1id) {
    query.category1id = category1id;
  } else if (category2id) {
    query.category2id = category2id;
  } else if (category3id) {
    query.category3id = category3id;
  }
  //重新整理参数 如果有Parmas参数要携带过去
  if (UseRoute.params) {
    loacion.query = query;
    loacion.params = UseRoute.params;
    // 判断是不是为空值，如果是空值从不跳转
    loacion.query.categoryName !== undefined ? UseRouter.push(loacion) : false;
  }
},
```

#### query

```JavaScript
// 搜索函数
gosearch(event) {
    // 如果有query参数也要携带过去
    if (UseRoute.query) {
        let loction = {name: "search", params: {keyword: Str.keyWord || undefined}}
        loction.query = UseRoute.query;
        UseRouter.push(loction)
    }
}
```

## Mockjs

### 初始化添加

- 下载mockjs
  - `npm i -D mockjs`

- 将这些有mock数据的图片添加到public/images文件下

> 但是这些图片在那些文件中暂时不要删除，会报错，但是webstrom会帮我们自动更改路径但是最好是留到最后再删

#### banner.json

```JSON
[
  {
    "id": "1",
    "imgUrl": "/images/banner1.jpg"
  },
  {
    "id": "2",
    "imgUrl": "/images/banner2.jpg"
  },
  {
    "id": "3",
    "imgUrl": "/images/banner3.jpg"
  },
  {
    "id": "4",
    "imgUrl": "/images/banner4.jpg"
  }
]
```

#### floor.json

```JSON
[
  {
    "id": "001",
    "name": "家用电器",
    "keywords": [
      "节能补贴",
      "4K电视",
      "空气净化器",
      "IH电饭煲",
      "滚筒洗衣机",
      "电热水器"
    ],
    "imgUrl": "/images/floor-1-1.png",
    "navList": [
      {
        "url": "#",
        "text": "热门"
      },
      {
        "url": "#",
        "text": "大家电"
      },
      {
        "url": "#",
        "text": "生活电器"
      },
      {
        "url": "#",
        "text": "厨房电器"
      },
      {
        "url": "#",
        "text": "应季电器"
      },
      {
        "url": "#",
        "text": "空气/净水"
      },
      {
        "url": "#",
        "text": "高端电器"
      }
    ],
    "carouselList": [
      {
        "id": "0011",
        "imgUrl": "/images/floor-1-b01.png"
      },
      {
        "id": "0012",
        "imgUrl": "/images/floor-1-b02.png"
      },
      {
        "id": "0013",
        "imgUrl": "/images/floor-1-b03.png"
      }
    ],
    "recommendList": [
      "/images/floor-1-2.png",
      "/images/floor-1-3.png",
      "/images/floor-1-5.png",
      "/images/floor-1-6.png"
    ],
    "bigImg": "/images/floor-1-4.png"
  },
  {
    "id": "002",
    "name": "手机通讯",
    "keywords": [
      "节能补贴2",
      "4K电视2",
      "空气净化器2",
      "IH电饭煲2",
      "滚筒洗衣机2",
      "电热水器2"
    ],
    "imgUrl": "/images/floor-1-1.png",
    "navList": [
      {
        "url": "#",
        "text": "热门2"
      },
      {
        "url": "#",
        "text": "大家电2"
      },
      {
        "url": "#",
        "text": "生活电器2"
      },
      {
        "url": "#",
        "text": "厨房电器2"
      },
      {
        "url": "#",
        "text": "应季电器2"
      },
      {
        "url": "#",
        "text": "空气/净水2"
      },
      {
        "url": "#",
        "text": "高端电器2"
      }
    ],
    "carouselList": [
      {
        "id": "0011",
        "imgUrl": "/images/floor-1-b01.png"
      },
      {
        "id": "0012",
        "imgUrl": "/images/floor-1-b02.png"
      },
      {
        "id": "0013",
        "imgUrl": "/images/floor-1-b03.png"
      }
    ],
    "recommendList": [
      "/images/floor-1-2.png",
      "/images/floor-1-3.png",
      "/images/floor-1-5.png",
      "/images/floor-1-6.png"
    ],
    "bigImg": "/images/floor-1-4.png"
  }
]
```

#### 写mockjs模拟数据

- 先将数据模拟好，步骤操作完之后需要在mainjs中引入我们这些写好的数据

```JavaScript
import Mock from "mockjs";

//引入数据
import banner from "./banners.json";
import floor from "./floor.json";

//mock数据 模拟数据---需要在mainjs引入
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});
```

##### main.js引入

```JavaScript
//引入mock我们写的
import "@/Mockjs/mockServe";
```

### banner获取

#### 请求操作

##### 创建独有请求

- 在路径src/api/MockRuquest.js下
- 原理就是将下面代码中的` baseURL: "/mock",//请求的基础路径`baseURL改为mock

> 如果在本来的请求文件修改就会造成之前请求失效，所以需要重新创建一个文件做单独使用

```JavaScript
/**
 * 对axios二次封装
 * 利用axios 对象的方法create 去创建一个axios实例
 * request就是axios只不过稍微配置了下
 * */
import axios from "axios";
/**
 * 进度条
 * strat()开始动
 * done()结束
 * 引入进度条样式
 * */
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const request = axios.create({
    baseURL: "/mock",//请求的基础路径
    timeout: 5000,//超时时间
});

//请求拦截器
request.interceptors.request.use((config) => {
    nprogress.start();//进度条开始
    return config;
});

//响应拦截器
request.interceptors.response.use((res) => {
    nprogress.done();//进度条结束
    return res.data;
}, (error) => {
    return Promise.reject(new Error("失败"));
});

export default request;
```

##### 开始发请求

- 在路径src/api/index.js下
- 发送请求

```JavaScript
//mockjs 请求数据
export const reqGetBannerList = () => mockRequest({url: "/banner",method:"get"});
```

#### 三连环

- 在路径src/Page/Home/ListContainer.vue下
- 当组件一挂载就请求

```JavaScript
mounted() {
  home.dispatch("getBannerList");
}
```

#### 仓库中

###### ation

```JavaScript
async getBannerList({commit}) {
    let result = await reqGetBannerList();
    console.log(result)
    if (result.code === 200) commit("GETBANNERLIST",result.data)
},
```

###### mutations

```JavaScript
GETBANNERLIST(state, GetBannerList) {
    state.GetBannerList = GetBannerList
}
```

###### state

```JavaScript
state: {
    CategoryList: [],//三级联动数据
    GetBannerList: [],//轮播图
},
```

## 轮播图使用

- 下载轮播图插件

~~~shell
 npm i swiper@5.4.5  -D 
~~~

- 在mainjs中引入

```JavaScript
//引入轮播图样式
import "swiper/css/swiper.min.css";
```

- 轮播图激活函数

```JavaScript
var mySwiper = new Swiper(this.$refs.mySwiper, {
  loop: true, // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
```

### 首页轮播图

#### Bnner轮播

##### 三连环

- 在路径src/Page/Home/ListContainer.vue下
- 当组件一挂载就请求

```JavaScript
mounted() {
  home.dispatch("getBannerList");
}
```

###### 仓库中

- ation 

```JavaScript
async getBannerList({commit}) {
    let result = await reqGetBannerList();
    console.log(result)
    if (result.code === 200) commit("GETBANNERLIST",result.data)
},
```

- mutations

```JavaScript
GETBANNERLIST(state, GetBannerList) {
    state.GetBannerList = GetBannerList
}
```

- state 

```JavaScript
state: {
    CategoryList: [],//三级联动数据
    GetBannerList: [],//轮播
},
```

- 页面展示

```html
<!--banner轮播-->
<div class="swiper-container" id="mySwiper" ref="mySwiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide" v-for="(carous,index) in BannerList" :key="carous.id">
      <img :src="carous.imgUrl" />
    </div>
  </div>
```

- 函数构造
  - 向仓库中提取数据

```JavaScript
const Str=reactive({
  BannerList:computed(()=>home.state.GetBannerList||[])
});
```

- 在路径src/Page/Home/ListContainer.vue下
  - 在mounted中放入watch+nextick结合监视

```JavaScript
watch(() => this.BannerList, () => {
  nextTick(() => {
    var mySwiper = new Swiper(this.$refs.mySwiper, {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });
}, {deep: true});
```

- 引入轮播图

```JavaScript
import Swiper from "swiper";// 引入轮播图
```

#### Floor轮播

##### 1.发送请求

```JavaScript
//mockjs 请求数据 floor
export const reqGetFloorList = () => mockRequest({url: "/floor",method:"get"});
```

##### 三连环

###### 仓库中

```JavaScript
import {createStore} from 'vuex'
import {BaseCategoryList, reqBaseCategoryList, reqGetBannerList, reqGetFloorList} from "@/api";

export default createStore({
    state: {
     	···
        GetFloorList: [],//floor轮播图
    },
    getters: {},
    mutations: {
        ···
        REQGETFLOORLIST(state, GetFloorList) {
            state.GetFloorList = GetFloorList;
        },
    },
    actions: {
        ···
        // 获取floor数据
        async getFloorList({commit}) {
            let result = await reqGetFloorList();
            if (result.code === 200) commit("REQGETFLOORLIST", result.data);
            console.log(result)
        },
    },
});

```

##### 循环Home中组件

- src/Page/Home/index.vue

###### 页面

- 将数据传入到floor子组件中

```JavaScript
<Floor v-for="(Flooritem,index) in FloorList" :key="index" :List="Flooritem"/>
```

###### 函数

```JavaScript
setup() {
  const Str = reactive({
    FloorList: computed(() => home.state.GetFloorList || []),
  });

  return {...toRefs(Str)}
},
mounted() {
  home.dispatch("getFloorList");
}
```

##### 添加轮播插件

###### 在Floor中

- 页面

```vue
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ List.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active">
              <a href="#tab1" data-toggle="tab">热门</a>
            </li>
            <li v-for="(nav,index) in List.navList" :key="index">
              <a :href="nav.url" data-toggle="tab">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list" >
                <li v-for="(keywords,index) in List.keywords" :key="index">{{ keywords }}</li>
              </ul>
              <img :src="List.imgUrl"/>
            </div>
            <div class="floorBanner">
              <div class="swiper-container" id="mySwiper" ref="floor1Swiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(carouse,index) in List.carouselList" :key="carouse.id">
                    <img :src="carouse.imgUrl">
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
            <div class="split" >
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="List.recommendList[0]"/>
              </div> <div class="floor-conver-pit">
                <img :src="List.recommendList[1]"/>
              </div>
            </div>
            <div class="split center">
              <img :src="List.bigImg"/>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
            <div class="floor-conver-pit">
            <img :src="List.recommendList[2]"/>
          </div> <div class="floor-conver-pit">
            <img :src="List.recommendList[3]"/>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
```

- 函数
  - 子组件接受父组件的prop参数---List

```JavaScript
export default {
  name: "Floor",
  props:["List"],
  setup() {

  },
  mounted() {
    watch(() => this.List, () => {
      nextTick(() => {
        var mySwiper = new Swiper(this.$refs.floor1Swiper, {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      });
    }, {deep: true});
  }
}
```

## 商品会进阶

## search模块

### 初始化

- 将组件引入到Home/Search
- 发送请求获取search列表

#### 发请求

```JavaScript
//请求商品列表 /api/list post
export const reqSearchInfo= (parmas) => request({url: '/list', data: parmas, method: 'post'});
```

#### 三连环

```JavaScript
import {createStore, mapGetters} from 'vuex'
import {reqSearchInfo} from "@/api";


export default createStore({
    namespaced: true,
    state: {
        SearchInfoList: [],
        goodsList:[],
        attrsList:[],
        trademarkList:[]
    },
    getters: {},
    mutations: {
        GETSEARCHINFO(state, SearchInfoList) {
            state.SearchInfoList = SearchInfoList;
            state.goodsList=SearchInfoList.goodsList;
            state.attrsList=SearchInfoList.attrsList;
            state.trademarkList=SearchInfoList.trademarkList;
        },
    },
    actions: {
        //获取搜索列表
        async GetSearchInfo({commit}, parmas = {}) {
            let result = await reqSearchInfo(parmas);
            console.log(result)
            if (result.code === 200) commit("GETSEARCHINFO", result.data);
        },
    },
    modules: {},
});

```

#### 触发三连环

```JavaScript
mounted() {
  search.dispatch("GetSearchInfo",{
    //一级分类
    "category1Id": "",
    //二级分类
    "category2Id": "",
    //三级分类
    "category3Id": "",
    //分类名字
    "categoryName": "",
    //关键字
    "keyword": "",
    //排序
    "order": "1:asc",
    //分液器第几页
    "pageNo": 1,
    //每一页展示数据
    "pageSize": 10,
    //平台售卖属性参数
    "props": [],
    "trademark": ""
  });
}
```

### SearchSelector.vue

- 渲染内容

#### 页面

```vue
<div class="clearfix selector">
  <div class="type-wrap logo">
    <div class="fl key brand">品牌</div>
    <div class="value logos">
      <ul class="logo-list">
        <li v-for="(trademark,index) in trademarkList" :key="trademark.id">{{ trademark.tmName }}</li>
      </ul>
    </div>
    <div class="ext">
      <a href="javascript:void(0);" class="sui-btn">多选</a>
      <a href="javascript:void(0);">更多</a>
    </div>
  </div>
  <div class="type-wrap" v-for="(attrs,index) in attrsList" :key="attrs.id">
    <div class="fl key">{{ attrs.attrName }}</div>
    <div class="fl value">
      <ul class="type-list">
        <li v-for="(attrValue,index) in attrs.attrValueList" :key="attrValue.id">
          <a>{{attrValue}}</a>
        </li>
      </ul>
    </div>
    <div class="fl ext"></div>
  </div>
```

#### 函数

```JavaScript
setup(){

  const Str=reactive({
    attrsList: computed(() => search.state.attrsList),
    trademarkList: computed(() => search.state.trademarkList),
  });

  return{...toRefs(Str)}
},
```

### 移出关键字

#### search

```JavaScript
const CurrentInstance = getCurrentInstance();
 const {$bus} = CurrentInstance.appContext.config.globalProperties;
    const Fun = reactive({
  ···
      //  移出关键字
      Removkeyword() {
        Str.SearchParams.keyword = undefined;
        Fun.GetData();
        $bus.emit("clear");//清除文本框搜索文字
        if (UseRoute.query) UseRouter.push({name: "search", query: UseRoute.query});
      },
    });
```

#### Header

```JavaScript
onMounted(() => $bus.on("clear", () => Str.keyWord = ''))
```

### 搜索所有函数

#### 页面

```vue
<div class="details clearfix">
  <div class="sui-navbar">
    <div class="navbar-inner filter">
      <ul class="sui-nav">
        <li :class="{active:SearchParams.order.indexOf('1')!==-1}" @click="ChangeClass(1)">
          <a href="javascript:;">综合<span v-if="SearchParams.order.indexOf('1:asc')!==-1">↑</span><span
              v-if="SearchParams.order.indexOf('1:desc')!==-1">↓</span></a>
        </li>
        <li :class="{active:SearchParams.order.indexOf('2')!==-1}" @click="ChangeClass(2)">
          <a href="javascript:;">价格<span v-if="SearchParams.order.indexOf('2:asc')!==-1">↑</span><span
              v-if="SearchParams.order.indexOf('2:desc')!==-1">↓</span></a>
        </li>
      </ul>
    </div>
  </div>
```

#### 函数

```javascript
     //删除 trademark关键字
      Removetrademark() {
        Str.SearchParams.trademark = undefined;
        Fun.GetData();
      },
      //  trademarkInfo 自定义时间回调
      trademarkInfo(id, name) {
        Str.SearchParams.trademark = `${id}:${name}`;
        Fun.GetData();
      },
      //  点击售卖属性
      attrInfo(id, name, value) {
        let Info = `${id}:${value}:${name}`;
        if (Str.SearchParams.props.indexOf(Info) === -1) {
          Str.SearchParams.props.push(Info);
          Fun.GetData();
        }
      },
      //  删除售卖属性某个值
      Removeprops(index) {
        let a = Str.SearchParams.props.splice(index, 1);
        Fun.GetData();
      },
      //  改变类名
      ChangeClass(number) {
        let order = "asc";
        // 当前点击的时候传递两个数字一个1和2；1是综合2是价格；
        // 判断当前是不是asc之类的是的就取反，之后在页面上渲染就行
        Str.SearchParams.order.indexOf("asc") === -1 ? order = "asc" : order = "desc";
        Str.SearchParams.order = `${number}:${order}`;
        Fun.GetData();
      },
```

##### search子组件

- 子组件需要向父组件传递参数用到自定义事件

```JavaScript
//将信息传递给父组件点击品牌名称时候
trademarkhandle(trademark) {
  context.emit("trademarkhandle", trademark.tmId, trademark.tmName);//将参数传递给父组件search
},
//  点击平台售卖属性
attrInfo(id,name, value) {
  context.emit("attrInfo",id,name,value);//将参数传递给父组件search
},
```

## 分页器

### 简介

- 当前第几个
  - pageNo
- 每页多少条数据
  - pageSize
- 一共多少数据
  - total

#### 注意点

- 连续是奇数因为要对称好看

### 初始化

#### 新建

- 在src/components/Pagenation/index.vue新建vue文件

##### 引入内容

```vue
<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>9</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
```

#### 引入

```JavaScript
//分页器
import Pagenation from "@/components/Pagenation";
app.component(Pagenation);
```

### 开始

#### 页面

##### 按钮禁用

- 页面页码等于1时，需要禁用按钮
- 页面页码等于最后一个数的时候要禁用按钮

##### 传递参数

- 要在函数声明否则用不了

~~~JavaScript
emits: ["getPageNo"],
~~~

1. 如果是第一页，`GetPageNo(1)`传递第一页
2. 如果是其他不是最后一页传递参数`GetPageNo(totalPages)`或者我们写的`totalPage()`函数也行
3. 点击页码时传递`GetPageNo(page)`
4. 上一页`GetPageNo(pageNo-1)`
5. 下一页`GetPageNo(pageNo+1)`

##### 动态类名

- 如果当前页是第一页那么需要将第一页这个按钮设置背景色

  - ~~~html
    <button :class="{active:pageNo===1}" v-if="PageNum().start>1" @click="GetPageNo(1)">1</button>
    ~~~

- 如果当前页是中间的，给点击的页码添加类名

  - ~~~vue
    <button :class="{active:pageNo===page}" ··· @click="GetPageNo(page)">
    ~~~

- 如果是最后一页

  - ~~~html
    <button :class="{active:pageNo===totalPage()}">{{ totalPage() }}</button>
    ~~~

```vue
<template>
  <div class="pagination">
    <button  :disabled="pageNo===1" @click="GetPageNo(pageNo-1)">上一页</button>
    <button :class="{active:pageNo===1}" v-if="PageNum().start>1" @click="GetPageNo(1)">1</button>

    <button v-if="PageNum().start>2">···</button>
    <button :class="{active:pageNo===page}" v-for="(page,index) in PageNum().end" :key="index" v-show="PageNum().start<=page" @click="GetPageNo(page)">
      {{ page }}
    </button>
    <button v-if="PageNum().end<totalPage()-1">···</button>

    <button :class="{active:pageNo===totalPage()}" v-if="PageNum().end<totalPage()" @click="GetPageNo(totalPages)">{{ totalPage() }}</button>
    <button :disabled="pageNo>=totalPage()"  @click="GetPageNo(pageNo+1)" >下一页</button>

    <button style="margin-left: 30px">共 {{ totalPage() }} 页</button>
  </div>
</template>
```

#### 函数

##### 一共多少页

- 用一共的数据除以一页需要展示的数据
  - 当页面有小数时候向上取整因为页码要多，多出的数据也要展示

##### 起始页和结束

- 连续的页数小于总页数
  - 起始页为1
  - 结束页为总共的页数
- 正常的情况
  - 起始页为当前页减去连续的页码除以2向下取整
  - 结束页为前页加上连续的页码除以2向下取整
    - 起始页小于等于1时：起始页为1；结束页为连续的页码
    - 结束页大于最后的页数：起始页不变；结束页为一共的页数

```JavaScript
import {reactive, toRefs} from "vue";

export default {
  name: "Pagination",
  emits: ["getPageNo"],
  props: ["pageNo", "pageSize", "total", "countinous", "totalPages"],
  setup(prop, context) {

    const Fun = reactive({
      // 共多少页
      totalPage() {
        const {pageNo, pageSize, total, countinous, totalPages} = prop;
        return Math.ceil(total / pageSize);
        // return totalPages;
      },
      //  起始页和结束页
      PageNum() {
        const {pageNo, pageSize, total, countinous, totalPages} = prop;
        let start = 0, end = 0;
        //  判断连续页数小于总页数
        if (countinous > Fun.totalPage()) {
          start = 1;
          end = Fun.totalPage();
        } else {
          start = pageNo - parseInt(countinous / 2);//开始数字
          end = pageNo + parseInt(countinous / 2);//结束数字
          if (start <= 1) {
            start = 1;
            end = countinous;
          }
          if (end > totalPages) {
            start = Fun.totalPage() - countinous + 1;
            end = totalPages;
          }
        }

        return {start, end};
      },
      //  获取当前页码
      GetPageNo(index) {
        if (index >= Fun.totalPage()) index = Fun.totalPage();
        if (index <= 1) index = 1;
        context.emit("getPageNo", index);
      }
    });


    return {...toRefs(Fun)}
  },
}
```

# 商品详情页

## 页面回到顶部

- vue3中使用的是`left`和`top`

```JavaScript
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {left: 0, top: 0}
    }
})
```

## 路由

- 路由中需要添加detail路径
- 因为要传入id所以后面是动态的`:skuid`

```JavaScript
{path: "/detail/:skuid", component: () => import("@/views/Detail/index"), meta: {show: true}}
```

## 三连环

### 仓库中

- 新建detailJS文件

### 请求

- 请求结束之后放在detail.js中进行三连环操作

```JavaScript
//获取产品ID
export const reqGoodsInfo = (skuid) => request({url: `/item/${skuid}`, method: 'get'});
```

### detail.js

- 其实只需要一个GoodInfo就行，但是有时候请求回来的不成功，未加载出来所以需要在仓库中分离一部分我们需要的，防止加载不成功
- 因为getters不知道怎么写，之间尝试但是失败了

```javascript
state: {
    GoodInfo: [],//请求回来的全部数据
    categoryView: [],//面包屑
    skuInfo: [],//商品的基本数据，价格名称等
},
mutations: {
    //    获取产品信息
    GETGOODINFO(state, GoodInfo) {
        state.GoodInfo = GoodInfo;
        state.categoryView = GoodInfo.categoryView;
        state.skuInfo = GoodInfo.skuInfo;
    },
},
actions: {
    //    获取产品信息
    async getGoodInfo({commit}, skuid) {
        let result = await reqGoodsInfo(skuid);
        if (result.code === 200) commit("GETGOODINFO", result.data);
    },
},
```

### 页面

#### 面包屑

- 这里面是数组的数据，但是我们只需要这些也只有这些

```vue
<!-- 导航路径区域 -->
<div class="conPoin">
    <span v-if="CategoryList.category1Name">{{ CategoryList.category1Name }}</span>
    <span v-if="CategoryList.category2Name">{{ CategoryList.category2Name }}</span>
    <span v-if="CategoryList.category3Name">{{ CategoryList.category3Name }}</span>
</div>
```

#### 传给子组件

- skuDefaultImg
  - 默认图片，轮播图还没加载时候就是这个图片
  - 这样好处就是，可以直接传递给子组件，之后再将skuImageList传给子组件时候会有一个缓冲的时期
- 之后就是价格名称等操作，这里省略

```vue
<!-- 左侧放大镜区域 -->
<div class="previewWrap">
  <!--放大镜效果-->
  <Zoom :skuDefaultImg="skuInfoList.skuDefaultImg" :skuImageList="skuInfoList.skuImageList"/>
  <!-- 小图列表 -->
  <ImageList :skuImageList="skuInfoList.skuImageList"/>
</div>
```

### 文本框

- 定义两个变量：skuNum和temporary

- isNaN如果是数字为false反之是符号或者字符串或者小数为true
  - 满足这个条件将temporary赋值skunum
- 反之如果输入的值小于等于1那么就将之前的值赋值给刚刚的值
- 如果是小数将小数取整

```JavaScript
//  判断用户输入
skuNumChange(e) {
    let value = e.target.value * 1;
    if (isNaN(value)) Str.skuNum = Str.temporary;//如果是字符串，为1
    else if (value <= 1) Str.skuNum = Str.temporary;//如果是负数取绝对值
    else Str.skuNum = parseInt(value);//如果是小数取整
    Str.temporary=Str.skuNum;
},
```

## 轮播图点击

### 兄弟组件

- 两个组件一个是轮播组件和Zoom组件
- 需要将在轮播图的图片显示在放大镜(Zoom上)

#### ImageList.vue

- 线遍历轮播图图片在页面中显示

```vue
<div class="swiper-slide" v-for="(img,index) in skuImageList" :key="img.id">
  <img
      :src="img.imgUrl"
      :title="img.imgName" alt="图片未加载成功,请重试......"
      @click="EmitIndex(index)"
  >
</div>
```

- 设定函数EmitIndex将当前的索引传递给兄弟组件

```JavaScript
 props: ["skuImageList"],//父组件传过来的轮播图图片
 setup() {
   const CurrentInstance = getCurrentInstance();
   const {$bus} = CurrentInstance.appContext.config.globalProperties;

   const Fun=reactive({
     EmitIndex(index){
       $bus.emit("getIndex",index)
     }
   });

return{...toRefs(Fun)}
 },
```

- 轮播图函数

```JavaScript
//引入轮播组件，watch监听别写错对象
watch(() => this.skuImageList, () => {
  nextTick(() => {
    new Swiper(this.$refs.mySwiper, {
      // loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 3,// 每次显示几个
      slidesPerGroup: 1,// 每次切换图片个数
    });
  });
}, {immediate: true, deep: true});
```

#### 加类名&传递索引值

- 将当前点击的图片在Zoom上显示

- 页面

~~~vue
 <img
            :class="{active:index===activeIndex}"
            :src="img.imgUrl"
            :title="img.imgName" alt="图片未加载成功,请重试......"
            @click="EmitIndex(index)"
        >
~~~

- 函数

```JavaScript
const Str=reactive({
	activeIndex:0,
})

const Fun=reactive({
    EmitIndex(index){
    $bus.emit("getIndex",index);
    Str.activeIndex=index;//给当前点击的图片加上类名
    }
});
```

## 放大镜

```vue
<template>
  <div class="spec-preview">
    <img :src="imgUrl"/>
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>
<script>
 setup(prop, context) {

    const Str = reactive({
      imgUrl: prop.skuDefaultImg || "",
      imgIndex: 0,
      mask: ref(null),
      big: ref(null),
    })
    const Fun = reactive({
      // 制作放大镜
      handler(e) {
        const {mask, big} = Str;//解构Str中数据
        let Mask = mask;
        //减去蒙版的高度和宽度各一半，因为要知道蒙版距离
        let left = e.offsetX - Mask.offsetWidth / 2;
        let top = e.offsetY - Mask.offsetHeight / 2;
        /* 判断条件，判断距离左边和上面再合法的范围内
        * 左边不能小于0
        * 左边不能越界
        * 上面不能小于0
        * 上面不能越界
        * 之后将左和右的值赋值要加“px”
        * */
        if (left <= 0) left = 0;
        if (left >= Mask.offsetWidth) left = Mask.offsetWidth;
        if (top <= 0) top = 0;
        if (top >= Mask.offsetHeight) top = Mask.offsetHeight;
        mask.style.left = left + "px";
        mask.style.top = top + "px";
        //  大图
        big.style.left = -2 * left + "px";
        big.style.top = -2 * top + "px";
      },
    });

    //  监视轮播图，不设置为已进入就加载，因为那会数据还没传过来
    watch([() => prop.skuImageList, () => Str.imgIndex], () => {
      Str.imgUrl = prop.skuImageList[Str.imgIndex].imgUrl
    }, {deep: true});

    return {...toRefs(Fun), ...toRefs(Str)}
  },
</script>
```

## 添加购物车

### 发请求

```JavaScript
//更新购物车
//将产品添加到购物车
export const reqAddUpadateShopCart = (skuId, skuNum) => request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post"
});
```

### 三连环

```JavaScript
import {createStore} from 'vuex';
import {reqAddUpadateShopCart, reqGoodsInfo} from "@/api";

export default createStore({
    actions: {
       //添加购物车
        async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
            let result = await reqAddUpadateShopCart(skuId, skuNum);
            return result.code === 200 ? "ok" : Promise.reject(new Error("faile"));
        }
    },
});
```

#### 路由

```JavaScript
export const routes = [
   ···
    {path: "/addcartsuccess",component:()=>import("@/views/AddCartSuccess/index"),meta: {show: true},name:"addcartsuccess"}
]
```

#### 函数

- 利用本地存储，这样页面刷新的时候不会丢失

  - ~~~javascript
    //存储skuinfo
     sessionStorage.setItem("SKUINFO",JSON.stringify(Str.skuInfoList));
    ~~~

```JavaScript
//  添加购物车
async addShopCart() {
  //存储skuinfo
  sessionStorage.setItem("SKUINFO",JSON.stringify(Str.skuInfoList));
  // 发请求--将产品添加到数据库，通知服务器
  //  服务器存储成功--进行路由跳转
  try {
    await detail.dispatch("addOrUpdateShopCart", {skuId: UseRoute.params.skuid, skuNum: Str.skuNum});
    UseRouter.push({name:"addcartsuccess",query:{skuNum:Str.skuNum}});
  } catch (e) {
    //  失败给出提示
    alert(e.message);
  }
}
```

## 添加购物车成功

### 页面

- 两个router-link跳转相应的页面中
  - 详情页要带id值

```vue
<div class="goods">
  <div class="left-good">
    <div class="left-pic">
      <img :src="skuInfo.skuDefaultImg">
    </div>
    <div class="right-info">
      <p class="title">{{ skuInfo.skuName }}</p>
      <p class="attr">价格:{{ skuInfo.price }}</p>
      <p class="attr">数量：{{ skuNum }}</p>
      <p class="attr" v-for="(spuSaleAttr,index) in skuInfo.skuSaleAttrValueList" :key="spuSaleAttr.id">{{spuSaleAttr.saleAttrName}}:{{spuSaleAttr.saleAttrValueName}}</p>
    </div>
  </div>
  <div class="right-gocart">
    <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>
    <router-link class="sui-btn btn-xlarge" to="shopcart" >去购物车结算</router-link>
  </div>
</div>
```

### 函数

- 读取本地存储的数据进行展示

```JavaScript
const UseRouter = useRouter();
const UseRoute = useRoute();

const Str = reactive({
  skuInfo: JSON.parse(sessionStorage.getItem("SKUINFO")),
  skuNum: UseRoute.query.skuNum
});
```

## 跳转到购物车

### 路由

```JavaScript
{path: "/shopcart",component:()=>import("@/views/ShopCart/index"),meta: {show: true},name:"shopcart"},
```

### 设置UUID

- src/utils/uuid_token.js

```JavaScript
import {v4 as uuidv4} from "uuid";//引入UUID

export const GetUuid = () => {
    //获取UUID
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    //判断是否存在，存在获取不存在设置UUID
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    return uuid_token;
}
```

#### 使用UUID

- src/store/detail.js

~~~JavaScript
import {createStore} from 'vuex';
import {reqAddUpadateShopCart, reqGoodsInfo} from "@/api";
import {GetUuid} from "@/utils/uuid_token";


export default createStore({
    state: {
        GetUuid:GetUuid(),
    },
}
~~~

- src/api/request.js

```JavaScript
//请求拦截器
request.interceptors.request.use((config) => {
    nprogress.start();//进度条开始
    if(detail.state.GetUuid)config.headers.userTempId=detail.state.GetUuid
    return config;
});
```

### 设置仓库shopcart

#### 获取购物车列表

```JavaScript
//获取购物车列表 /cart/cartList
export const reqGetCartList = () => request({url: "/cart/cartList", method: "get"});
```

#### 仓库中使用购物车

- src/store/ShopCart.js
- 引入仓库文件

```JavaScript
import {createStore} from 'vuex'
import home from "@/store/home";
import search from "@/store/search";
import detail from "@/store/detail";
import ShopCart from "@/store/ShopCart";

export default createStore({
    modules: {
        home, search, detail, ShopCart
    },
});
```

