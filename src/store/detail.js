import {createStore} from 'vuex';
import {reqAddUpadateShopCart, reqGoodsInfo} from "@/api";
import {GetUuid} from "@/utils/uuid_token";


export default createStore({
    state: {
        GoodInfo: [],
        categoryView: [],
        skuInfo: [],
        GetUuid:GetUuid(),
    },
    getters: {},
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
        //添加购物车
        async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
            let result = await reqAddUpadateShopCart(skuId, skuNum);
            return result.code === 200 ? "ok" :Promise.reject(new Error("添加购物车失败"));
        }
    },
    modules: {}
});
