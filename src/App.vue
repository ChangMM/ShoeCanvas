<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body,#app{
  height: 100%;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  color: #555;
  max-width: 400px;
  margin:0 auto;
  // border: 1px solid #eee;
}
//清除浮动
.clearfix{
  &:before,
  &:after {
    content: " "; // 1
    display: table; // 2
  }
  &:after {
    clear: both;
  }
  *zoom:1;
}
</style>
