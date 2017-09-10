<template>
  <div class="main">
    <header class="header">定制系统</header>
    <div class="canvas-panel-wrap">
      <div class="canvas-panel" id="canvas-panel">
        <canvas id="shoe-canvas" class="canvas-show"></canvas>
        <canvas id="tidai-canvas" class="canvas-show"></canvas>
        <canvas id="lingkou-canvas" class="canvas-show"></canvas>
        <canvas id="mask-canvas" class="canvas-show"></canvas>
        <!-- <div class="direction" v-if="m_index == 1">
          <img src="../assets/mask/up.png" alt="">
        </div>
        <div class="direction direction-top" v-if="m_index == 2">
          <img src="../assets/top/shoe.png" alt="">
          <img src="../assets/top/mask.png" alt="">
          <img src="../assets/top/lingkou.png" alt="">
          <img src="../assets/top/tidai.png" alt="">
        </div>
        <div class="direction direction-left" v-if="m_index == 3">
          <img src="../assets/left/shoe.png" alt="">
          <img src="../assets/left/mask.png" alt="">
          <img src="../assets/left/lingkou.png" alt="">
          <img src="../assets/left/tidai.png" alt="">
        </div>
        <div class="direction direction-right" v-if="m_index == 4">
          <img src="../assets/right/shoe.png" alt="">
          <img src="../assets/right/mask.png" alt="">
          <img src="../assets/right/lingkou.png" alt="">
          <img src="../assets/right/tidai.png" alt="">
        </div>
        <div class="direction direction-back" v-if="m_index == 5">
          <img src="../assets/back/shoe.png" alt="">
          <img src="../assets/back/mask.png" alt="">
          <img src="../assets/back/lingkou.png" alt="">
          <img src="../assets/back/tidai.png" alt="">
        </div>
        <div class="direction direction-bottom" v-if="m_index == 6">
          <img src="../assets/bottom.png" alt="">
        </div> -->
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
    <div class="type-content">
      <div class="color-wrap" v-show="m_type == 2">
        <span class="color-item" v-for='item,index in m_color' :style="'background:-webkit-linear-gradient(-60deg,#fff,#'+ item.value +');'" v-on:click="f_set_tidai_color(item.value)"></span>
      </div>
      <div class="color-wrap" v-show="m_type == 3">
        <span class="color-item" v-for='item,index in m_color' :style="'background:-webkit-linear-gradient(-60deg,#fff,#'+ item.value +');'" v-on:click="f_set_lingkou_color(item.value)"></span>
      </div>
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
import Color from '../Color'
import R from 'ramda'
export default {
  name: 'main',
  data () {
    return {
      m_canvas_height: 0,
      m_canvas_width: 0,
      m_index: 1,
      m_type: 2,
      m_material: 1,
      m_shoe_canvas: null,
      m_lingkou_canvas: null,
      m_tidai_canvas: null,
      m_mask_canvas: null,
      m_origin_lingkou_canvas: null,
      m_origin_tidai_canvas: null,
      m_origin_mask_canvas: null,
      m_color: Color,
      m_config: {
        direction: 'top',
        tidai_color: '',
        lingkou_color: '',
        qrcode: 'top'
      }
    }
  },
  mounted() {
    this.f_init_canvas()
    this.f_set_config()
  },
  methods: {
    f_init_canvas () {
      let canvasPanel = document.getElementById('canvas-panel')
      let position = canvasPanel.getBoundingClientRect()

      this.m_shoe_canvas = document.getElementById("shoe-canvas")
      this.m_lingkou_canvas = document.getElementById("lingkou-canvas")
      this.m_mask_canvas = document.getElementById("mask-canvas")
      this.m_tidai_canvas = document.getElementById("tidai-canvas")

      this.m_canvas_width = Math.round(position.width) * 2
      this.m_canvas_height = Math.round(position.height) * 2

      this.m_shoe_canvas.height = this.m_canvas_height
      this.m_shoe_canvas.width = this.m_canvas_width
      this.m_lingkou_canvas.height = this.m_canvas_height
      this.m_lingkou_canvas.width = this.m_canvas_width
      this.m_mask_canvas.height = this.m_canvas_height
      this.m_mask_canvas.width = this.m_canvas_width
      this.m_tidai_canvas.height = this.m_canvas_height
      this.m_tidai_canvas.width = this.m_canvas_width

      // 保留原始的 canvas 的状态
      this.m_origin_tidai_canvas = document.createElement('canvas')
      this.m_origin_mask_canvas = document.createElement('canvas')
      this.m_origin_lingkou_canvas = document.createElement('canvas')
      this.m_origin_tidai_canvas.height = this.m_canvas_height
      this.m_origin_tidai_canvas.width = this.m_canvas_width
      this.m_origin_mask_canvas.height = this.m_canvas_height
      this.m_origin_mask_canvas.width = this.m_canvas_width
      this.m_origin_lingkou_canvas.height = this.m_canvas_height
      this.m_origin_lingkou_canvas.width = this.m_canvas_width
    },
    f_set_config () {
      switch (this.m_config.direction) {
        case 'top':
          this.f_set_image(this.m_shoe_canvas, require('../assets/top/shoe.png'))
          this.f_set_image(this.m_mask_canvas, require('../assets/top/mask.png'))
          this.f_set_image(this.m_tidai_canvas, require('../assets/top/tidai.png'), () => {
            if (this.m_config.tidai_color !== '') {
              this.m_tidai_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_tidai_canvas, this.m_config.tidai_color), 0, 0)
            }
          })
          this.f_set_image(this.m_lingkou_canvas, require('../assets/top/lingkou.png'), () => {
            if (this.m_config.lingkou_color !== '') {
              this.m_lingkou_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_lingkou_canvas, this.m_config.lingkou_color), 0, 0)
            }
          })
          this.f_set_image(this.m_origin_mask_canvas, require('../assets/top/mask.png'))
          this.f_set_image(this.m_origin_tidai_canvas, require('../assets/top/tidai.png'))
          this.f_set_image(this.m_origin_lingkou_canvas, require('../assets/top/lingkou.png'))
          break;
        default:
      }
    },
    f_set_image (canvas, src, callback) {
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.onload = () => {
        let width = img.width
        let height = img.height
        let offsetX = 0
        let offsetY = 0
        let dWidth = width
        let dHeight = height
        if (width / height > this.m_canvas_width / this.m_canvas_height) {
          if (width > this.m_canvas_width) {
            dWidth = this.m_canvas_width
            dHeight = Math.round(height * this.m_canvas_width / width)
          }
        } else {
          if (height > this.m_canvas_height) {
            dHeight = this.m_canvas_height
            dWidth = Math.round(width * this.m_canvas_height / height)
          }
        }
        offsetX = (this.m_canvas_width - dWidth) / 2
        offsetY = (this.m_canvas_height - dHeight) / 2
        ctx.drawImage(img, 0, 0, width, height, offsetX, offsetY, dWidth, dHeight)
        callback && callback(canvas)
      }
      img.src = src
    },
    f_set_canvas () {
      let canvasPanel = document.getElement('#canvas')
    },
    f_set_tidai_color (color) {
      this.m_config.tidai_color = color
      this.m_tidai_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_origin_tidai_canvas, this.m_config.tidai_color), 0, 0)
    },
    f_set_lingkou_color (color) {
      this.m_config.lingkou_color = color
      this.m_lingkou_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_origin_lingkou_canvas, this.m_config.lingkou_color), 0, 0)
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
    f_get_imageData(src) {
      let canvas = document.createElement('canvas')
      canvas.height = this.m_canvas_height
      canvas.width = this.m_canvas_width
      let ctx = canvas.getContext('2d')
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      return imgData
    },
    f_recolor_canvas(canvas, filterColor, callback) {
      let ctx = canvas.getContext('2d')
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let data = imgData.data

      let rgb = Utils.Hex2Rgb(filterColor)
      let filterH = Utils.Rgb2Hsl(rgb[0], rgb[1], rgb[2])
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
        if (alpha < 200) {
          continue
        }
        HSL = Utils.Rgb2Hsl(red, green, blue)
        RGB = Utils.Hsl2Rgb(filterH[0], filterH[1], HSL[2] - 0.2)
        data[i + 0] = RGB[0]
        data[i + 1] = RGB[1]
        data[i +2] = RGB[2]
      }
      callback && callback (imgData)
      return imgData
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
      .direction{
        height: 100%;
        position: relative;
      }
      .canvas-show{
        position: absolute;
        left:0;
        top:0;
        height: 100%;
        width: 100%;
      }
      img{
        top:50%;
        left:50%;
        max-height: 100%;
        max-width: 100%;
        transform: translateX(-50%) translateY(-50%);
        position: absolute;
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
  .type-content{
    .color-wrap{
      max-width: 100%;
      padding: 5px;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
      .color-item{
        display: inline-block;
        height: 50px;
        width: 50px;
        border-radius: 4px;
        margin-right: 10px;
        border: 1px solid #eee;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
}
</style>
