<template>
  <div class="good-car van-hairline--bottom">
    <div class="car-image">
      <img :src="images[0]" ref="imgCon" />
    </div>
    <div class="car-content">
      <div class="title overflow-hidden">{{ title }}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags overflow-hidden">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="price">￥{{ price }}</div>
      <div class="add-sub">
        <div @touchend="counter(id, -1)" v-if="nums">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="nums" v-if="nums">{{ nums }}</div>
        <div @touchend="counter(id, 1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Animate from "@/Tools/index.js";
export default {
  // nums表示需要购买的数量，由于解构不出来，需要在本地中查找
  props: ["title", "desc", "tags", "price", "images", "nums", "id"],
  methods: {
    ...mapMutations(["storageChange"]),
    counter(id, num) {
      this.storageChange({ id, value: num });
      if (num === -1) {
        return;
      }
      //获取到图片的位置，宽高
      const { top, left } = this.$refs.imgCon.getBoundingClientRect();
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } =
        this.$refs.imgCon;
      //获取到购物车的位置，宽高
      const car = document.getElementById("shop-car");
      const { top: carTop, left: carLeft } = car.getBoundingClientRect();
      const { offsetWidth: carWidth, offsetHeight: carHeight } = car;
      //图片移动的结束位置
      const endX = carLeft + carWidth / 2;
      const endY = carTop + carHeight / 2;
      //用来生成图片的动画
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.imgCon.src,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>

<style scroped lang="less">
.good-car {
  width: 100%;
  display: flex;
  height: 100px;

  .car-image {
    width: 90px;
    height: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .car-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
      overflow: hidden;
    }
    .title {
      margin-top: 5px;
      color: #1a1a1a;
      font-size: 13px;
      font-weight: 600;
    }
    .desc {
      font-size: 11px;
      color: #aaa;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        padding: 2px;
        font-size: 10px;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 3px;
      }
    }
    .price {
      margin-top: 4px;
      font-size: 14px;
      color: #ff1a90;
      font-weight: 600;
    }
  }
  .add-sub {
    display: flex;
    position: absolute;
    bottom: 12px;
    right: 15px;
    justify-content: flex-end;
    align-items: center;
    > div:not(.nums) {
      width: 16px;
      height: 16px;
      img {
        width: 100%;
      }
    }
    .nums {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
