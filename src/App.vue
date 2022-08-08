<template>
  <Header/>
  <router-view/>
  <Footer v-if="$route.meta.show"></Footer>
</template>

<script>
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
import {reactive, toRefs} from "vue";
import {useRoute} from "vue-router";
import User from "@/store/User";
import home from "@/store/home";

export default {
  name: "App",
  components: {Header, Footer},
  setup() {
    const UseRoute = useRoute();
    const Fun = reactive({

    });
    return {...toRefs(Fun)}
  },
  mounted() {
    //获取三级联动
    home.dispatch("CategoryList");
  }
}

</script>
<style lang="less">

</style>
