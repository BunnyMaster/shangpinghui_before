import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
const app = createApp(App);


//引入三级联动组件
import TypeNav from "@/components/TypeNav/TypeNav";
app.component(TypeNav.name,TypeNav);

//引入mock我们写的
import "@/Mockjs/mockServe";

//引入轮播图样式
import "swiper/css/swiper.min.css";

//全局 $bus
import mitt from "mitt";
app.config.globalProperties.$bus = new mitt();// $bus 用于无关系组件通信

//分页器
import Pagenation from "@/components/Pagenation";
app.component(Pagenation);

//全部的请求接口
import * as API from "@/api/index";
app.config.globalProperties.$API=API;

//饿了吗UI
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);

//表单验证
import Validate from "@/plugins/vee-validate";
app.use(Validate);

//懒加载
import VueLazyLoad from 'vue3-lazyload'
import lazyimg from "@/assets/lazyload.jpg";
// import lazyimg from "@/assets/logo.png";
app.use(VueLazyLoad,{
    loading:lazyimg
});

app.use(store).use(router).mount('#app');