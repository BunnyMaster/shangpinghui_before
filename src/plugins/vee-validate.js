import {required, email, min, between, numeric,ValidationObserver,ValidationProvider} from 'vee-validate/dist/vee-validate';
import {extend} from "vee-validate/dist/vee-validate.esm"
// import zh_CN from 'vee-validate/dist/locale/zh_CN.json';

// localize('zh_cn', zh_CN) // 配置中文
export default {
    install(Vue) {
        Vue.component('ValidationObserver', ValidationObserver)
        Vue.component('ValidationProvider', ValidationProvider)

    }
}