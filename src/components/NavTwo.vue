<template>
  <div class="navtwo-container" ref="container">
    <div
      @touchend="handleScroll(i, $event)"
      :class="{ item: true, active: index === i }"
      v-for="(n, i) in sideList"
      :key="i"
    >
      {{ i === 0 ? "全部" : n }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      index: 0,
    };
  },
  computed: mapState({
    sideList: (state) => state.sideList,
  }),
  methods: {
    ...mapActions(["getgoodList"]),
    ...mapMutations(['resetgoodList']),
    handleScroll(i, e) {
      this.resetgoodList()
      this.index = i;
      const { container } = this.$refs;
      const eleHei = e.target.offsetHeight;
      const eleTop = e.target.getBoundingClientRect().top;
      const wrapTop = container.getBoundingClientRect().top;
      const wrapHei = container.offsetHeight;
      this.moveTo(
        this.$refs.container.scrollTop,
        eleHei / 2 + eleTop - wrapTop - wrapHei / 2
      );
      this.getgoodList({
        type: this.sideList[i],
        page: 1,
        sortType: "all",
      });
    },
    moveTo(start, end) {
      let dis = 0;
      let step = 5;
      if (end < 0) {
        step = -5;
      }

      const timer = setInterval(() => {
        dis += step;
        this.$refs.container.scrollTop = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.container.scrollTop = start + end;
          clearInterval(timer);
        }
      }, 5);
    },
  },
  created() {
    this.resetgoodList(),
    this.getgoodList({
      type: this.sideList[0],
      page: 1,
      sortType: "all",
    });
  },
};
</script>

<style lang="less">
.navtwo-container {
  position: fixed;
  top: 135px;
  left: 0;
  bottom: 1.3333rem;
  width: 79px;
  background: #f8f8f8;
  overflow-y: auto;
  .item {
    position: relative;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    &.active {
      font-weight: bold;
      color: #ff1a90;
    }
    &.active::after {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: #ff1a90;
      width: 6px;
      height: 18px;
    }
  }
}
.navtwo-container::-webkit-scrollbar {
  width: 0;
}
</style>