<template>
  <div class="home-container">
    <router-view></router-view>
    <van-tabbar route class="bar">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/Home/Classify">分类</van-tabbar-item>
      <van-tabbar-item
        icon="shopping-cart-o"
        to="/Home/Shopping"
        :badge="badge"
        id="shop-car"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="contact" to="/Home/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style scoped>
.bar{
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const value = Object.values(this.counterMap);
      let newCounter = value.reduce((pre, cur) => pre + cur, 0);
      if (newCounter > 99) {
        return "99+";
      }
      return newCounter;
    },
  },
};
</script>
