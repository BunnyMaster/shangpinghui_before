import {createStore} from "vuex";
import {reqGetCode, reqLogOut, reqRegister, reqUserInfo, reqUserLogin} from "@/api";
import {UserToken} from "@/utils/uuid_token";

export default createStore({
    state: {
        code: "",
        token: undefined,
        UserInfo: {},
        loginName: undefined,
    },
    mutations: {
        GETCODE(state, code) {
            state.code = code;
        },
        USERLOGIN(state, data) {
            state.token = data.token;
        },
        USERINFO(state, data) {
            state.UserInfo = data;
            state.loginName = data.loginName;
        },
        CLEARUSERINFO(state) {
            state.token = undefined;
            localStorage.removeItem("USERTOKEN");
            localStorage.removeItem("UserInfo");
            state.loginName="";
        }
    },
    actions: {
        //    获取验证码
        async GetCode({commit}, phone) {
            let result = await reqGetCode(phone);
            return result.code === 200 ? commit("GETCODE", result.data) : Promise.reject(new Error("获取验证码失败"));
        },
        //    用户注册
        async UserRegister({commit}, user) {
            let result = await reqRegister(user);
            console.log(result);
            return result.code === 200 ? result.message : Promise.reject(new Error(result.message));
        },
        //    登录业务
        async UserLogin({commit}, data) {
            let result = await reqUserLogin(data);
            if (result.code === 200) {
                commit("USERLOGIN", result.data);
                UserToken();
            } else return Promise.reject(new Error(result.message));
        },
        //获取用户信息
        async UserInfo({commit}) {
            let result = await reqUserInfo();
            result.code === 200 ? commit("USERINFO", result.data) : console.log(result.message);
        },
        //   退出登录
        async LogOut({commit}) {
            let result = await reqLogOut();
            result.code === 200 ? commit("CLEARUSERINFO") : Promise.reject(new Error(result))
        },
    },
    getters: {},
    modules: {},
});