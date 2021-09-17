<template>
  <div class="shopping-container">
    <h2 v-if="shopList.length === 0">您的购物车还没有商品，快快选购吧！</h2>
    <van-nav-bar
      class="car"
      title="购物车"
      right-text="删除"
      @click-right="del"
    />
    <van-submit-bar
      class="pri"
      :price="totalMoney"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <div class="shopList">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="shopBox" v-for="item in shopList" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <GoodContent v-bind="item" :nums="counterMap[item.id]" />
        </div>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import api from "@/api/index.js";
import GoodContent from "@/components/GoodContent.vue";
export default {
  components: {
    GoodContent,
  },
  data() {
    return {
      result: [],
      checked: false,
      shopList: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    totalMoney() {
      const result = this.shopList.filter((item) =>
        this.result.includes(item.id)
      );
      const r = result.reduce((pre, cur) => {
        const num = this.counterMap[cur.id];
        const p = Math.round(num * cur.price) * 100;
        return p + pre;
      }, 0);
      return r;
    },
  },
  watch: {
    result() {
      if (this.result.length === this.shopList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    del() {
      if (this.result.length === 0) {
        Toast("你还没有选中商品");
      }
    },
    async getData() {
      const result = Object.keys(this.counterMap);
      const data = await api.getGoodsByIds(result.join());
      this.shopList = data.list;
    },
    onSubmit() {},
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped lang='less'>
.shopping-container {
  h2 {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    color: gray;
    font-size: 12px;
    white-space: nowrap;
  }
  height: 100vh;
  background: #eee;
  .car {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .pri {
    position: fixed;
    bottom: 50px;
  }
  .shopList {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #eee;
    .shopBox {
      display: flex;
      .check {
        margin: 10px;
        flex-shrink: 0;
      }
    }
  }
}
</style>