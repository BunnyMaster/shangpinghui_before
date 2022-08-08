<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in skuImageList" :key="img.id">
        <img
            :class="{active:index===activeIndex}"
            :src="img.imgUrl"
            :title="img.imgName" alt="图片未加载成功,请重试......"
            @click="EmitIndex(index)"
        >
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper';
import {watch, nextTick, reactive, toRefs,getCurrentInstance} from "vue";

export default {
  name: "ImageList",
  props: ["skuImageList"],
  setup() {
    const CurrentInstance = getCurrentInstance();
    const {$bus} = CurrentInstance.appContext.config.globalProperties;

    const Str=reactive({
      activeIndex:0,
    })

    const Fun=reactive({
      EmitIndex(index){
        $bus.emit("getIndex",index);
        Str.activeIndex=index;//给当前点击的图片加上类名
      }
    });

 return{...toRefs(Fun),...toRefs(Str)}
  },
  mounted() {
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
  }
}
</script>

<style lang="less" scoped>
.active{
  border: 2px solid #f60;
}
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>