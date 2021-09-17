<template>
  <div class="classify-container">
    <router-link class="search-btn" to="/Search">
      <van-icon name="search" />
      <div class="btn">水果特价9.9</div>
    </router-link>
    <NavOne />
    <template v-if="showContent">
      <NavTwo />
      <GoodList />
    </template>
    <van-loading color="#1989fa" size="2rem" :vertical="true" v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavOne from "@/components/NavOne.vue";
import NavTwo from "@/components/NavTwo.vue";
import GoodList from "@/components/GoodList.vue";
export default {
  components: {
    NavOne,
    NavTwo,
    GoodList,
  },
  computed: {
    ...mapState(["showContent"]),
  },
};
</script>

<style scoped lang="less">
.classify-wrapper{
  width: 375px;
}
.search-btn {
  position: absolute;
  top: 0px;
  left: 0;
  width: 350px;
  height: 33px;
  color: #a1a1a1;
  background: #eee;
  border-radius: 10px;
  font-size: 14px;
  margin: 11px;
  text-align: center;
  > * {
    line-height: 33px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>