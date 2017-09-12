<template>
  <div id="material">
    <div class="header">
      <span class="index-item active">网络流行</span>
      <span class="index-item">插画</span>
      <span class="index-item">亲宝贝</span>
      <span class="index-item">名画</span>
      <span class="index-item">插画</span>
      <span class="index-item">插画</span>
    </div>
    <div class="material-wrap clearfix">
      <div class="material-item">
        <div class="square"></div>
      </div>
      <div class="material-item">
        <div class="square"></div>
      </div>
      <div class="material-item">
        <div class="square"></div>
      </div>
      <div class="material-item">
        <div class="square"></div>
      </div>
      <div class="material-item">
        <div class="square"></div>
      </div>
      <div class="material-item">
        <div class="square"></div>
      </div>
      <div class="material-item">
        <div class="square"></div>
      </div>
      <div class="material-item">
        <div class="square"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
#material{
  padding-top: 50px;
  background-color: #eee;
  box-sizing: border-box;
  .header{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 52px;
    background: #fff;
    overflow-x: scroll;
    vertical-align: middle;
    font-size: 0;
    white-space: nowrap;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    .index-item{
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      padding-left: 20px;
      padding-right: 20px;
      display: inline-block;
      text-align: center;
      border-bottom: 2px solid #fff;
      &.active{
        color: red;
        border-bottom-color: red;
      }
    }
  }
  .material-wrap{
    padding: 0 5px;
    .material-item{
      float: left;
      margin-top: 10px;
      width: 25%;
      box-sizing: border-box;
      padding-left: 5px;
      padding-right: 5px;
      overflow: hidden;
      position: relative;
      &:after {
        content: '';
        display: block;
        margin-top: 100%;
        opacity: 0;
        height: 0;
        width: 0;
      }
      .square{
        position: absolute;
        top:0;
        left:5px;
        right: 5px;
        height: 100%;
        background-color: #fff;
        border-radius: 2px;
      }
    }
  }
}
</style>
