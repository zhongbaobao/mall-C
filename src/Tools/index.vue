<template>
  <div
    v-if="exist"
    class="item"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      opacity,
      transform: `translate(${moveX}px,${moveY}px) scale(${sx},${sy})`,
    }"
  >
    <img :src="src" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.item {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  transition: all 1s;
  transform-origin: 0% 0%;
}
img {
  width: 100%;
  border-radius: 50%;
}
</style>