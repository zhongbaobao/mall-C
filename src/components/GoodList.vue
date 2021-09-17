<template>
  <div class="goodList-container">
    <div class="list-header van-hairline--top-bottom">
      <div @click="handleClick('all')" :class="{ active: type === 'all' }">
        综合
      </div>
      <div @click="handleClick('sale')" :class="{ active: type === 'sale' }">
        销量
      </div>
      <div
        class="price"
        @click="handleClick('price')"
        :class="{
          price_up: type == 'price_up',
          price_down: type == 'price_down',
        }"
      >
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <GoodContent
            v-for="(item, i) in goodList"
            :key="i"
            v-bind="item"
            :nums="counterMap[item.id]"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import GoodContent from "./GoodContent.vue";
export default {
  components: {
    GoodContent,
  },
  data() {
    return {
      type: "all",
      finished: false, //下滑加载完成
      isLoading: false, //上拉刷新
      loading: false, //下滑加载
      page: 1,
    };
  },
  computed: {
    ...mapState({
      goodList: (state) => state.goodList,
      counterMap: (state) => state.counterMap,
    }),
  },
  methods: {
    ...mapMutations(["resetgoodList"]),
    ...mapActions(["getgoodList"]),
    onRefresh() {
      // 上拉刷新,让所有东西都初始化
      this.loading = false;
      this.finished = false;
      this.isLoading = true;
      this.page = 1;
      this.resetgoodList();
      this.getgoodList({ page: 1, sortType: this.type });
      this.isLoading = false;
    },
    async onLoad() {
      //下滑加载
      this.page += 1;
      this.loading = true;
      const result = await this.getgoodList({
        page: this.page,
        sortType: this.type,
      });
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    handleClick(type) {
      if (type === "all") {
        this.type = "all";
      } else if (type === "sale") {
        this.type = "sale";
      } else {
        if (this.type === "price_up") {
          this.type = "price_down";
        } else {
          this.type = "price_up";
        }
      }
      this.onRefresh();
    },
  },
};
</script>

<style lang="less">
.list-header {
  width: 296px;
  height: 25px;
  position: relative;
  left: 79px;
  top: 0;
  box-sizing: border-box;
  display: flex;
  padding: 0 8px;
  justify-content: flex-end;
  > div {
    line-height: 25px;
    text-align: center;
    box-sizing: border-box;
    width: 50px;
    height: 25px;
    color: #cecece;
    position: relative;
  }
  .active,
  .price_up,
  .price_down {
    color: #ff1a90;
    font-weight: bold;
  }
  .price::before {
    content: "";
    border: 4px solid transparent;
    border-bottom-color: #aaa;
    position: absolute;
    right: 0px;
    top: 4px;
  }
  .price::after {
    content: "";
    border: 4px solid transparent;
    border-top-color: #aaa;
    position: absolute;
    right: 0px;
    bottom: 4px;
  }
  .price_up::before {
    border-bottom-color: #ff1a90;
  }
  .price_down::after {
    border-top-color: #ff1a90;
  }
}
.list-content {
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh {
  overflow: unset !important;
}
</style>