<template>
  <div class="search-container">
    <div class="search-header">
      <van-icon name="arrow-left" class="arrow-left" 
      @click='jump' />
      <van-search
        class="search"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
        <template #action v-if="showList">
          <div @click="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon :badge="badge" name="shopping-cart-o" id="shop-car" class="shop-car"/>
        </template>
      </van-search>
    </div>
    <div class="list" v-if="listValue.length && showList">
      <van-list>
        <van-cell
          v-for="item in listValue"
          :key="item"
          :title="item"
          @click="onSearch(item)"
        >
          <template #title>
            <span class="title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="!showList">
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
    </div>
    <div class="searchHistoryList" v-if="listValue.length <= 0 && showList" >
      <History :SearchHist='searchHist' @search='onSearch(value)'></History>
    </div>
  </div>
</template>
 
<script>
import api from "@/api/index.js";
import { mapState } from 'vuex';
import GoodContent from "@/components/GoodContent.vue";
import History from "@/components/History.vue";
export default {
  components: {
    GoodContent,
    History,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      timer: null,
      listValue: [],
      finished: false, //下滑加载完成
      loading: false, //下滑加载
      page: 1,
      size: 5,
      goodList: [],
      showList: true,
      total: 0,
      searchHist:[],
    };
  },
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
  methods: {
    async onLoad() {
      //下滑刷新
      this.showList = false;
      this.loading = false
      const value = await api.search(this.value, this.page, this.size);
      this.goodList = [...this.goodList, ...value.list];
      this.total = value.total;
      if (this.goodList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    onSearch(value) {
      //点击搜索
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      this.listValue = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      const result = this.searchHist.find((item) => item.value === this.value);
      if(result){
        result.time = new Date().getTime()
        this.searchHist.sort((a,b) => b.time - a.time)
      }else{
      this.searchHist.unshift({value:this.value,time:new Date().getTime()})
      }
      localStorage.setItem('searchHist',this.searchHist)
    },
    debounce(callback, time) {
      //搜索防抖
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        callback();
      }, time);
    },
    async input(value) {
      //input框输入事件
      if (value === "") {
        this.listValue = [];
        return;
      }
      this.debounce(async () => {
        const likeValue = await api.likeSearch(this.value);
        this.listValue = likeValue.result;
      }, 100);
    },
    formatHTML(value) {
      //对提示框关键字转换
      const reg = new RegExp(this.value, "g");
      return value.replace(reg, this.value.fontcolor("red"));
    },
    focus() {
      this.showList = true;
    },
    jump(){
      this.$router.push('/Home/Classify')
    }
  },
  created(){
    localStorage.getItem('searchHist')
  }
};
</script>

<style scoped lang="less">
.search-container {
   width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
}
.search-header {
  width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
  .arrow-left {
    font-size: 20px;
  }
  .search {
    flex: 1;
    .shop-car{
      font-size: 15px;
    }
  }
}
.list {
  padding: 0 35px;
  position: relative;
  top: 50px;
  left: 0;
  box-sizing: border-box;
}
.goods-list{
  position: relative;
  margin: 45px auto 0;
  width: 345px;
  z-index: 10;
  background: #fff;
}
.searchHistoryList{
  position: absolute;
  top: 35px;
  left: 10px;
  width: 350px;
}
</style>