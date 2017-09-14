<template>
  <div id="material">
    <div class="header">
      <span class="index-item" v-on:click="f_choose_index(0)" :class="{'active': m_index == 0}">网络流行</span>
      <span class="index-item" v-on:click="f_choose_index(1)" :class="{'active': m_index == 1}">插画</span>
      <span class="index-item" v-on:click="f_choose_index(2)" :class="{'active': m_index == 2}">亲宝贝</span>
      <span class="index-item" v-on:click="f_choose_index(3)" :class="{'active': m_index == 3}">名画</span>
      <span class="index-item" v-on:click="f_choose_index(4)" :class="{'active': m_index == 4}">插画</span>
      <span class="index-item" v-on:click="f_choose_index(5)" :class="{'active': m_index == 5}">插画</span>
    </div>
    <div class="material-wrap clearfix">
      <div class="material-item" v-for="item,index in m_materials">
        <div class="square" :class="{'active': m_material_index == index}" v-on:click="f_choose_material(index)">
          <img :src="item" class="material-img" v-on:click='f_choose_image(item)'>
        </div>
      </div>
    </div>
    <div class="footer">
      <span class="button" v-on:click="f_close">关闭</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    m_index: 0,
    m_material_index: 0,
    m_materials: [
      require('../assets/material/material-1.jpg'),
      require('../assets/material/material-2.jpg'),
      require('../assets/material/material-3.jpg'),
      require('../assets/material/material-4.jpg'),
      require('../assets/material/material-5.jpg'),
      require('../assets/material/material-1.jpg'),
      require('../assets/material/material-2.jpg'),
      require('../assets/material/material-3.jpg'),
      require('../assets/material/material-4.jpg'),
      require('../assets/material/material-5.jpg')
    ]
  }),
  methods: {
    f_choose_index (index) {
      this.m_index = index
    },
    f_choose_material (index) {
      this.m_material_index = index
    },
    f_close () {
      this.$emit('close')
    },
    f_choose_image (src) {
      this.$emit('choose', src)
    }
  }
}
</script>
<style lang="scss" scoped>
#material{
  padding-top: 50px;
  background-color: #eee;
  box-sizing: border-box;
  padding-bottom: 50px;
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
        color: #F08200;
        border-bottom-color: #F08200;
      }
    }
  }
  .footer{
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    height: 50px;
    .button{
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: #fff;
      display: inline-block;
      width: 100%;
      text-align: center;
      background-color: #F08200;
      &:active{
        background-color: darken(#F08200, 10%);
      }
    }
  }
  .material-wrap{
    padding: 0 5px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
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
        vertical-align: middle;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 2px;
        &.active{
          border-color: #F08200;
        }
        .material-img{
          max-height: 100%;
          max-width: 100%;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
