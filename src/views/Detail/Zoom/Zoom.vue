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
import {reactive, toRefs, getCurrentInstance, watch, ref} from "vue";

export default {
  name: "Zoom",
  props: ["skuDefaultImg", "skuImageList"],
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
  mounted() {
    const CurrentInstance = getCurrentInstance();
    const {$bus} = CurrentInstance.appContext.config.globalProperties;
    $bus.on("getIndex", index => this.imgIndex = index);
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>