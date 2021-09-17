<template>
  <div class="navOne-container">
    <div class="types" ref="container">
      <div
        @touchend="handleClick(i, $event)"
        @touchstart="move = false"
        @touchmove="move = true"
        class="type"
        v-for="(item, i) in menuList"
        :key="i"
      >
        <div class="img-box" :class="{ active: i === index }">
          <img :src="item.imgURL" />
        </div>
        <div :class="{ title: true, active: i === index }">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      menuList: [
        {
          title: "时令水果",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
        },
        {
          title: "安心乳品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
        },
        {
          title: "休闲零食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
        },
        {
          title: "新鲜蔬菜",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg",
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
        },
        {
          title: "粮油调味",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg",
        },
        {
          title: "某手美食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg",
        },
        {
          title: "纸杯清洁",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg",
        },
        {
          title: "个人护理",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg",
        },
        {
          title: "美妆护肤",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg",
        },
        {
          title: "家居收纳",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
        },
        {
          title: "家用电器",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
        },
        {
          title: "3C数码",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
        },
        {
          title: "母婴用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
        },
        {
          title: "宠物用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
        },
        {
          title: "图书玩具",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg",
        },
        {
          title: "手表配饰",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
        },
      ],
      index: 0,
      move: false,
    };
  },
  created() {
    this.getSideList(this.menuList[0].title);
  },
  methods: {
    ...mapActions(["getSideList"]),
    handleClick(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const containerWid = this.$refs.container.offsetWidth;
      const typeWid = e.target.offsetWidth;
      const typeLeft = e.target.getBoundingClientRect().left;
      this.moveTo(
        this.$refs.container.scrollLeft,
        typeLeft + typeWid / 2 - containerWid / 2
      );
      //获取侧边栏数据
      this.getSideList(this.menuList[i].title);
    },
    moveTo(start, end) {
      let dis = 0;
      let step = 5;
      if (end < 0) {
        step = -5;
      }

      const timer = setInterval(() => {
        dis += step;
        this.$refs.container.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.container.scrollLeft = start + end;
          clearInterval(timer);
        }
      }, 5);
    },
  },
};
</script>

<style lang="less" scroped>
.navOne-container {
  width: 375px;
  height: 104px;
}
.types {
  height: 100px;
  margin-top: 45px;
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  .type {
    width: 50px;
    padding: 10px 5px;
    text-align: center;
    flex-shrink: 0;
  }
  .img-box {
    width: 100%;
    height: 50px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid transparent;
    border-radius: 23px;
    &.active {
      background: #fff;
      border-color: #d13193;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      text-align: center;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .title {
    font-size: 12px;
    margin-top: 5px;
    font-weight: bold;
    &.active {
      background: #ff1a90;
      color: #fff;
      border-radius: 30px;
    }
  }
}
.types::-webkit-scrollbar {
  width: 0;
}
</style>