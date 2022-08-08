import {createStore} from "vuex";
import {reqChangeStaueById, reqDeleteCartById, reqGetCartList} from "@/api";

export default createStore({
    state: {
        CartList: {},
        cartInfoList: []
    },
    mutations: {
        //    获取购物车数据
        GETCARTLIST(state, CartList) {
            state.CartList = CartList;
            CartList[0]?state.cartInfoList = CartList[0].cartInfoList:"";
        },
    },
    actions: {
        //    获取购物车数据
        async GetCartList({commit}) {
            let result = await reqGetCartList();
            if (result.code === 200) commit("GETCARTLIST", result.data);
        },
        //    删除购物车商品
        async deleteCartListById({commit}, skuId) {
            let result = await reqDeleteCartById(skuId);
            return result.code === 200 ? "ok" : Promise.reject(new Error(" 删除购物车商品失败"))
        },
        //    修改商品选中状态
        async ChangeCartStaueById({commit}, {skuId, isChecked}) {
            let result = await reqChangeStaueById(skuId, isChecked);
            result.code === 200 ? "ok" : Promise.reject(new Error("修改商品选中状态失败"));
        },
        //    删除选中的商品
        async deleteCheckedCart({commit, state, dispatch}) {
            let PromiseAll = [];
            await state.cartInfoList.forEach(item => {
                let temp = item.isChecked === "1" || item.isChecked === 1 ? dispatch("deleteCartListById", item.skuId) : "";
                PromiseAll.push(temp)
            });
            //返回全部的是否成功只要有一个失败就都失败 http://192.168.3.10:8080/Search
            return Promise.all(PromiseAll);
        },
        //    点击全选就是全选
        async UpdateAllCartChecked({state, dispatch}, isChecked) {
            let PromiseAll = [];
            await state.cartInfoList.forEach(item => {
                let result = dispatch("ChangeCartStaueById", {skuId: item.skuId, isChecked});
                PromiseAll.push(result);
            });
            return Promise.all(PromiseAll);
        },
    },
    getters: {}
})