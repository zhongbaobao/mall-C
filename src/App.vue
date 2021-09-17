<template>
  <div class="app-container">
    <transition :name="transitionName" mode="">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "left",
    };
  },

  created() {
    const counter = JSON.parse(localStorage.getItem("goods")) || {};
    this.$store.commit("setcounterMap", counter);
  },
};
</script>


<style lang="less">
</style>
