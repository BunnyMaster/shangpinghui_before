import {createStore} from 'vuex'
import home from "@/store/home";
import search from "@/store/search";
import detail from "@/store/detail";
import ShopCart from "@/store/ShopCart";
import User from "@/store/User";
import Trade from "@/store/Trade";

export default createStore({
    modules: {
        home, search, detail, ShopCart,User,Trade
    },
});
