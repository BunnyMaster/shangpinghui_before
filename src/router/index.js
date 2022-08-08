import {createRouter, createWebHistory} from 'vue-router';
import {routes} from "@/router/router";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if(to.path!=="/trade")return {left: 0, top: 0}
    }
})

export default router
