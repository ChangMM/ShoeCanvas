<template>
  <div class="main">
    <header class="header">定制系统</header>
    <div class="canvas-panel-wrap">
      <div class="canvas-panel" id="canvas-panel">
        <div class="direction direction-up" v-if="m_index == 1">
          <img src="../assets/mask/up.png" alt="">
        </div>
        <!-- <canvas id="canvas" width="300" height="300"></canvas> -->
      </div>
    </div>
    <div class="tools-wrap">
      <span class="tool-item item1" :class="{'active': m_index == 1}" v-on:click='f_choose_index(1)'></span>
      <span class="tool-item item2" :class="{'active': m_index == 2}" v-on:click='f_choose_index(2)'></span>
      <span class="tool-item item3" :class="{'active': m_index == 3}" v-on:click='f_choose_index(3)'></span>
      <span class="tool-item item4" :class="{'active': m_index == 4}" v-on:click='f_choose_index(4)'></span>
      <span class="tool-item item5" :class="{'active': m_index == 5}" v-on:click='f_choose_index(5)'></span>
      <span class="tool-item item6" :class="{'active': m_index == 6}" v-on:click='f_choose_index(6)'></span>
    </div>
    <div class="type-wrap clearfix">
      <span class="type-item" :class="{'active': m_type == 1}" v-on:click='f_choose_type(1)'>鞋面</span>
      <span class="type-item" :class="{'active': m_type == 2}" v-on:click='f_choose_type(2)'>后提带</span>
      <span class="type-item" :class="{'active': m_type == 3}" v-on:click='f_choose_type(3)'>领口</span>
      <span class="type-item" :class="{'active': m_type == 4}" v-on:click='f_choose_type(4)'>二维码</span>
    </div>
    <div class="material-wrap clearfix">
      <span class="material-item" :class="{'active': m_material == 1}" v-on:click='f_choose_material(1)'>素材</span>
      <span class="material-item" :class="{'active': m_material == 2}" v-on:click='f_choose_material(2)'>付费</span>
      <span class="material-item" :class="{'active': m_material == 3}" v-on:click='f_choose_material(3)'>花纹</span>
      <span class="material-item" :class="{'active': m_material == 4}" v-on:click='f_choose_material(4)'>上传</span>
    </div>
  </div>
</template>

<script>
import Utils from '../Utils'
export default {
  name: 'main',
  data () {
    return {
      m_index: 1,
      m_type: 1,
      m_material: 1
    }
  },
  mounted() {
    // var canvas = document.getElementById("canvas")
    // var ctx = canvas.getContext("2d")
    // var img = new Image()
    // img.crossOrigin = "anonymous"
    // img.onload = () => {
    //   ctx.drawImage(img, 0, 0)
    //   this.f_recolor_pants(ctx, 'FF0000')
    // }
    // img.src = require('../assets/mask/tidai.png')
  },
  methods: {
    f_set_canvas () {
      let canvasPanel = document.getElement('#canvas')
      canvasPanel.getRec
    },
    f_choose_index (index) {
      this.m_index = index
    },
    f_choose_type (type) {
      this.m_type = type
    },
    f_choose_material (material) {
      this.m_material = material
    },
    f_recolor_pants(ctx, filterColor) {
      let rgb = Utils.Hex2Rgb(filterColor)
      let filterH = Utils.Rgb2Hsl(rgb[0], rgb[1], rgb[2])

      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      var data = imgData.data
      let red = 0
      let blue = 0
      let green = 0
      let alpha = 0
      let HSL = []
      let RGB = []
      for (var i = 0; i < data.length; i += 4) {
        red = data[i + 0]
        green = data[i + 1]
        blue = data[i + 2]
        alpha = data[i + 3]

        // skip transparent/semiTransparent pixels
        if (alpha < 200) {
          continue
        }
        HSL = Utils.Rgb2Hsl(red, green, blue)
        RGB = Utils.Hsl2Rgb(filterH[0], filterH[1], HSL[2]-0.3)
        data[i + 0] = RGB[0]
        data[i + 1] = RGB[1]
        data[i +2] = RGB[2]
      }
      ctx.putImageData(imgData,0,0)
    }
  }
}
</script>
<style scoped lang="scss">
.main{
  .header{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
  }
  .canvas-panel-wrap{
    margin-top: 10px;
    padding-left: 10%;
    padding-right: 10%;
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
    .canvas-panel{
      position: absolute;
      top:0;
      left:10%;
      width: 80%;
      height: 100%;
      text-align: center;
      img{
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
  }
  .tools-wrap{
    margin-top: 15px;
    text-align: center;
    .tool-item{
      margin-right: 8px;
      display: inline-block;
      height: 25px;
      width: 25px;
      background-size: contain;
      background-repeat: no-repeat;
      &:last-child{
        margin-right: 0;
      }
      &.item1{
        background-image: url('../assets/icons/icon-1.png');
      }
      &.item1.active{
        background-image: url('../assets/icons/icon-1-hover.png');
      }
      &.item2{
        background-image: url('../assets/icons/icon-2.png');
      }
      &.item2.active{
        background-image: url('../assets/icons/icon-2-hover.png');
      }
      &.item3{
        background-image: url('../assets/icons/icon-3.png');
      }
      &.item3.active{
        background-image: url('../assets/icons/icon-3-hover.png');
      }
      &.item4{
        background-image: url('../assets/icons/icon-4.png');
      }
      &.item4.active{
        background-image: url('../assets/icons/icon-4-hover.png');
      }
      &.item5{
        background-image: url('../assets/icons/icon-5.png');
      }
      &.item5.active{
        background-image: url('../assets/icons/icon-5-hover.png');
      }
      &.item6{
        background-image: url('../assets/icons/icon-6.png');
      }
      &.item6.active{
        background-image: url('../assets/icons/icon-6-hover.png');
      }
    }
  }
  .type-wrap,.material-wrap{
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .type-item,.material-item{
      height: 30px;
      line-height: 30px;
      display: inline-block;
      text-align: center;
      width: 25%;
      float: left;
      cursor:pointer;
      &.active{
        color: #F08200;
      }
    }
  }
}
</style>
