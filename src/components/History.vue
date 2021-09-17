<template>
  <div class="history-container">
    <h4>历史记录:</h4>
    <div
      class="item"
      v-for="item in SearchHist"
      :key="item.time"
      @click="search(item.value)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    SearchHist: {
        type:Array,
        default:() => []
    }
  },
  methods: {
    search(value) {
      this.$emit("search", value);
    },
  },
};
</script>

<style scoped lang='less'>
.item {
  padding: 15px;
  background: #eee;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
</style>