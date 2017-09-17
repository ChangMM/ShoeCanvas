<template>
  <div class="main">
    <header class="header">定制系统</header>
    <div class="canvas-panel-wrap">
      <div class="canvas-panel" id="canvas-panel">
        <img :src='m_current_image' :style="'left:'+ m_img_config.left +'px;top:' + m_img_config.top +'px; transform: rotate(' + m_img_config.rotate + 'deg) scale(' + m_img_config.zoom + ')'" v-show="m_config.direction == 'up'" id="canvas-img" alt="">
        <canvas id="shoe-canvas" v-show="m_config.direction != 'top'" class="canvas-show"></canvas>
        <canvas id="tidai-canvas" v-show="m_config.direction != 'top'" class="canvas-show"></canvas>
        <canvas id="lingkou-canvas" v-show="m_config.direction != 'top'" class="canvas-show"></canvas>
        <canvas id="mask-canvas" v-show="m_config.direction != 'top'" class="canvas-show"></canvas>
        <canvas id="qrcode-canvas" v-show="m_config.direction != 'top'" class="canvas-show"></canvas>
        <canvas id="left-canvas" v-show="m_config.direction == 'top'" class="canvas-left"></canvas>
        <canvas id="right-canvas" v-show="m_config.direction == 'top'" class="canvas-right"></canvas>
        <canvas id="test-canvas" v-show="m_config.direction == 'top'" width="600" height="600" class="canvas-show"></canvas>
      </div>
    </div>
    <div class="footer">
      <div class="tools-wrap">
        <span class="tool-item item1" :class="{'active': m_config.direction == 'up'}" v-on:click='f_choose_direction("up")'></span>
        <span class="tool-item item2" :class="{'active': m_config.direction == 'top'}" v-on:click='f_choose_direction("top")'></span>
        <span class="tool-item item3" :class="{'active': m_config.direction == 'left'}" v-on:click='f_choose_direction("left")'></span>
        <span class="tool-item item4" :class="{'active': m_config.direction == 'right'}" v-on:click='f_choose_direction("right")'></span>
        <span class="tool-item item5" :class="{'active': m_config.direction == 'back'}" v-on:click='f_choose_direction("back")'></span>
        <span class="tool-item item6" :class="{'active': m_config.direction == 'bottom'}" v-on:click='f_choose_direction("bottom")'></span>
      </div>
      <div class="type-wrap clearfix">
        <span class="type-item" :class="{'active': m_type == 1}" v-on:click='f_choose_type(1)'>鞋面</span>
        <span class="type-item" :class="{'active': m_type == 2}" v-on:click='f_choose_type(2)'>后提带</span>
        <span class="type-item" :class="{'active': m_type == 3}" v-on:click='f_choose_type(3)'>领口</span>
        <span class="type-item" :class="{'active': m_type == 4}" v-on:click='f_choose_type(4)'>二维码</span>
      </div>
      <div class="type-content">
        <div class="img-wrap" v-show="m_type == 1">
          <div class="img-item-wrap" v-for="item in m_images">
            <img :src="item.src" class="img-item" v-on:click="f_choose_current_image(item.src)">
            <p class="label">￥{{item.price}}</p>
          </div>
        </div>
        <div class="color-wrap" v-show="m_type == 2">
          <div class="color-item-wrap" v-for='item,index in m_color'>
            <span class="color-item" :style="'background:-webkit-linear-gradient(-60deg,#fff,#'+ item.value +');'" v-on:click="f_set_tidai_color(item.value)"></span>
            <p class="label">{{item.name}}</p>
          </div>
        </div>
        <div class="color-wrap" v-show="m_type == 3">
          <div class="color-item-wrap" v-for='item,index in m_color'>
            <span class="color-item" :style="'background:-webkit-linear-gradient(-60deg,#fff,#'+ item.value +');'" v-on:click="f_set_lingkou_color(item.value)"></span>
            <p class="label">{{item.name}}</p>
          </div>
        </div>
        <div class="img-wrap" v-show="m_type == 4">
          <div class="img-item-wrap" v-for="item in m_qrcode_images" v-on:click="f_choose_qrcode_direction(item.direction)">
            <img :src="item.src" class="img-item" :class="{'active': m_config.qrcode == item.direction}" alt="">
            <p class="label">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="material-wrap clearfix" v-show="m_type==1">
        <span class="material-item" :class="{'active': m_material == 1}" v-on:click='f_choose_material(1)'>素材</span>
        <span class="material-item" :class="{'active': m_material == 2}" v-on:click='f_choose_material(2)'>付费</span>
        <span class="material-item" :class="{'active': m_material == 3}" v-on:click='f_choose_material(3)'>花纹</span>
        <span class="material-item" :class="{'active': m_material == 4}" v-on:click='f_choose_material(4)'>
          <input type="file" v-on:change="f_upload_image" accept="image/*">
          上传
        </span>
      </div>
    </div>
    <Material class="material-mask" v-on:choose='f_choose_image' v-on:close="f_close_material_mask" v-if='m_material_mask_show'></Material>
  </div>
</template>

<script>
import Utils from '../Utils'
import Color from '../Color'
import Image from '../Images'
import Material from './Material.vue'
import AlloyFinger from 'alloyfinger'
export default {
  name: 'main',
  data () {
    return {
      m_canvas_height: 0,
      m_canvas_width: 0,
      m_index: 1,
      m_type: 1,
      m_material: 1,
      m_shoe_canvas: null,
      m_lingkou_canvas: null,
      m_tidai_canvas: null,
      m_mask_canvas: null,
      m_qrcode_canvas: null,
      m_left_canvas: null,
      m_right_canvas: null,
      m_origin_lingkou_canvas: null,
      m_origin_tidai_canvas: null,
      m_origin_mask_canvas: null,
      m_color: Color,
      m_images: Image,
      m_material_mask_show: false,
      m_current_image: '',  //当前选择的鞋面图片
      m_img_config: {
        rotate: 0,
        left: 0,
        top: 0,
        zoom: 1
      },
      m_qrcode_images: [
        {
          direction: 'top',
          src: require('../assets/icons/qr_top.jpg'),
          name: '正面区域'
        },{
          direction: 'side',
          src: require('../assets/icons/qr_side.jpg'),
          name: '侧面区域'
        },{
          direction: 'no',
          src: require('../assets/icons/qr_no.jpg'),
          name: '不印刷'
        }
      ],
      m_config: {
        direction: 'up',
        tidai_color: '',
        lingkou_color: '',
        qrcode: 'no'
      }
    }
  },
  mounted() {
    this.f_init_canvas()
    this.f_set_config()
    this.f_init_event()
  },
  components: {
    Material
  },
  methods: {
    f_init_event() {
      let canvasPanel = document.getElementById('canvas-panel')
      let canvasImg = document.getElementById('canvas-img')
      let self = this
      var af = new AlloyFinger(canvasPanel, {
        rotate: function (evt) {
          self.m_img_config.rotate += evt.angle
        },
        pinch: function (evt) {
          self.m_img_config.zoom = evt.zoom
        },
        pressMove: function (evt) {
          self.m_img_config.left += evt.deltaX
          self.m_img_config.top += evt.deltaY
        }
      })
    },
    f_init_canvas () {
      let canvasPanel = document.getElementById('canvas-panel')
      let position = canvasPanel.getBoundingClientRect()

      this.m_shoe_canvas = document.getElementById("shoe-canvas")
      this.m_lingkou_canvas = document.getElementById("lingkou-canvas")
      this.m_mask_canvas = document.getElementById("mask-canvas")
      this.m_tidai_canvas = document.getElementById("tidai-canvas")
      this.m_qrcode_canvas = document.getElementById("qrcode-canvas")
      this.m_left_canvas = document.getElementById("left-canvas")
      this.m_right_canvas = document.getElementById("right-canvas")

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
      this.m_qrcode_canvas.height = this.m_canvas_height
      this.m_qrcode_canvas.width = this.m_canvas_width

      this.m_left_canvas.height = this.m_canvas_height
      this.m_left_canvas.width = this.m_canvas_width
      this.m_right_canvas.height = this.m_canvas_height
      this.m_right_canvas.width = this.m_canvas_width

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
    f_clear_canvas () {
      this.m_shoe_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_lingkou_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_mask_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_qrcode_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_tidai_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_left_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_right_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)

      this.m_origin_tidai_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_origin_mask_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      this.m_origin_lingkou_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
    },
    f_set_config () {
      if (this.m_config.direction === 'up') {
          this.f_set_image(this.m_mask_canvas, require('../assets/' + this.m_config.direction + '.png'))
      } else if (this.m_config.direction === 'bottom') {
        this.f_set_image(this.m_shoe_canvas, require('../assets/' + this.m_config.direction + '.png'))
      } else {
        let arr = []
        // 先设置需要参考的 canvas
        arr.push(new Promise((resolve, reject) => {
          this.f_set_image(this.m_origin_mask_canvas, require('../assets/' + this.m_config.direction + '/mask.png'), () => {
            resolve(1)
          })
        }))
        arr.push(new Promise((resolve, reject) => {
          this.f_set_image(this.m_origin_tidai_canvas, require('../assets/' + this.m_config.direction + '/tidai.png'), () => {
            resolve(1)
          })
        }))
        arr.push(new Promise((resolve, reject) => {
          this.f_set_image(this.m_origin_lingkou_canvas, require('../assets/' + this.m_config.direction + '/lingkou.png'), () => {
            resolve(1)
          })
        }))

        // 设置鞋底
        arr.push(new Promise((resolve, reject) => {
          this.f_set_image(this.m_shoe_canvas, require('../assets/' + this.m_config.direction + '/shoe.png'), () => {
            resolve(1)
          })
        }))

        // 设置二维码
        arr.push(new Promise((resolve, reject) => {
          this.f_set_qrcode(() => {
            resolve(1)
          })
        }))

        // 设置鞋面
        arr.push(new Promise((resolve, reject) => {
          this.f_set_image(this.m_mask_canvas, require('../assets/' + this.m_config.direction + '/mask.png'), () => {
            if (this.m_current_image == '') {
              resolve(1)
              return
            }
            let canvasImg = document.getElementById('canvas-img')
            this.f_set_current_image(this.m_current_image, () => {
              resolve(1)
            })
          })
        }))


        // 设置提带
        arr.push(new Promise((resolve, reject) => {
          this.f_set_image(this.m_tidai_canvas, require('../assets/' + this.m_config.direction + '/tidai.png'), () => {
            if (this.m_config.tidai_color !== '') {
              this.m_tidai_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_tidai_canvas, this.m_config.tidai_color), 0, 0)
            }
            resolve(1)
          })
        }))

        // 设置领口
        arr.push(new Promise((resolve, reject) => {
          this.f_set_image(this.m_lingkou_canvas, require('../assets/' + this.m_config.direction + '/lingkou.png'), () => {
            if (this.m_config.lingkou_color !== '') {
              this.m_lingkou_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_lingkou_canvas, this.m_config.lingkou_color), 0, 0)
            }
            resolve(1)
          })
        }))

        if (this.m_config.direction == 'top') {
          let right_ctx = this.m_right_canvas.getContext('2d')
          let left_ctx = this.m_left_canvas.getContext('2d')
          left_ctx.translate(this.m_canvas_width, 0)
          left_ctx.scale(-1, 1);

          Promise.all(arr).then((responses) => {
            right_ctx.drawImage(this.m_shoe_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            right_ctx.drawImage(this.m_mask_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            right_ctx.drawImage(this.m_lingkou_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            right_ctx.drawImage(this.m_tidai_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            right_ctx.drawImage(this.m_qrcode_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)

            left_ctx.drawImage(this.m_shoe_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            left_ctx.drawImage(this.m_mask_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            left_ctx.drawImage(this.m_lingkou_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            left_ctx.drawImage(this.m_tidai_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)
            left_ctx.drawImage(this.m_qrcode_canvas, 0, 0, this.m_canvas_width, this.m_canvas_height)

            //翻转回来
            left_ctx.translate(this.m_canvas_width, 0)
            left_ctx.scale(-1, 1)
          })
        }
      }
    },
    f_set_qrcode (callback) {
      this.m_qrcode_canvas.getContext('2d').clearRect(0, 0, this.m_canvas_width, this.m_canvas_height)
      if (this.m_config.direction === 'top' && this.m_config.qrcode === 'top') {
        this.f_set_image(this.m_qrcode_canvas, require('../assets/' + this.m_config.direction + '/qrcode.png'), callback)
      }else if (this.m_config.direction === 'right' && this.m_config.qrcode === 'top') {
        this.f_set_image(this.m_qrcode_canvas, require('../assets/' + this.m_config.direction + '/qrcode_top.png'), callback)
      }else if (this.m_config.direction === 'right' && this.m_config.qrcode === 'side') {
        this.f_set_image(this.m_qrcode_canvas, require('../assets/' + this.m_config.direction + '/qrcode_side.png'), callback)
      }else if (this.m_config.direction === 'left' && this.m_config.qrcode === 'top') {
        this.f_set_image(this.m_qrcode_canvas, require('../assets/' + this.m_config.direction + '/qrcode.png'), callback)
      }else {
          callback && callback()
      }
    },
    f_upload_image() {
      let files = event.target.files
      let reader = new FileReader()
      reader.onload = () => {
        this.f_choose_image(event.target.result)
      }
      reader.readAsDataURL(files[0])
    },
    f_choose_image(src){
      this.f_choose_current_image(src)
    },
    f_choose_current_image(src) {
      this.m_current_image = src
      this.m_img_config.rotate = 0
      this.m_img_config.left = 0
      this.m_img_config.zoom = 1
      this.m_img_config.top = 0
      this.f_clear_canvas()
      this.f_set_config()
    },
    f_set_current_image (src, callback) {
      let offsetX = this.m_img_config.left
      let offsetY = this.m_img_config.top
      // 设置鞋面的 canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let ctx_test = document.getElementById('test-canvas').getContext('2d')
      canvas.height = this.m_mask_canvas.height
      canvas.width = this.m_mask_canvas.width
      let img = document.createElement('img')
      img.onload = () => {
        img.width = img.width * 2 * this.m_img_config.zoom
        img.height = img.height * 2 * this.m_img_config.zoom
        let imgWidth = img.width
        let imgHeight = img.height
        ctx.translate(this.m_img_config.left * 2 + imgWidth / 2, this.m_img_config.top * 2 + imgHeight / 2)
        ctx.rotate(this.m_img_config.rotate * Math.PI / 180)
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight)

        // 根据不同的反向设置不同参数
        if (this.m_config.direction == 'left' || this.m_config.direction == 'right') {
          // 再做一次变换
          let image = document.createElement('img')
          image.onload = () => {
            let canvas_final = document.createElement('canvas')
            canvas_final.height = this.m_mask_canvas.height
            canvas_final.width = this.m_mask_canvas.width
            let ctx_final = canvas_final.getContext('2d')
            // 这是一点点试出来的
            if (this.m_config.direction == 'left') {
              ctx_final.translate(this.m_canvas_width / 2 - 60, this.m_canvas_height / 2 - 110)
              ctx_final.rotate(-120 * Math.PI / 180)
            } else if (this.m_config.direction == 'right') {
              ctx_final.translate(this.m_canvas_width / 2 + 64, this.m_canvas_height / 2 - 128)
              ctx_final.rotate(114 * Math.PI / 180)
            }
            ctx_final.drawImage(image, -this.m_canvas_width / 2, -this.m_canvas_height / 2, this.m_canvas_width , this.m_canvas_height)
            // 设置像素点
            let imageDataOrigin = this.m_origin_mask_canvas.getContext('2d').getImageData(0, 0, this.m_origin_mask_canvas.width, this.m_origin_mask_canvas.height)
            let imageDataShow = this.m_mask_canvas.getContext('2d').getImageData(0, 0, this.m_mask_canvas.width, this.m_mask_canvas.height)
            let currentImageData = ctx_final.getImageData(0, 0, canvas.width, canvas.height)

            for (var i = 0; i < imageDataOrigin.data.length; i += 4) {
              if (imageDataOrigin.data[i + 3] < 200) {
                continue
              } else {
                imageDataShow.data[i + 0] = currentImageData.data[i + 0]
                imageDataShow.data[i + 1] = currentImageData.data[i + 1]
                imageDataShow.data[i + 2] = currentImageData.data[i + 2]
                imageDataShow.data[i + 3] = currentImageData.data[i + 3]
              }
            }
            this.m_mask_canvas.getContext('2d').putImageData(imageDataShow, 0, 0)
            callback && callback()
          }
          image.src = canvas.toDataURL()
        } else {
          // 设置 imageData
          let imageDataOrigin = this.m_origin_mask_canvas.getContext('2d').getImageData(0, 0, this.m_origin_mask_canvas.width, this.m_origin_mask_canvas.height)
          let imageDataShow = this.m_mask_canvas.getContext('2d').getImageData(0, 0, this.m_mask_canvas.width, this.m_mask_canvas.height)
          let currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

          for (var i = 0; i < imageDataOrigin.data.length; i += 4) {
            if (imageDataOrigin.data[i + 3] < 200) {
              continue
            } else {
              imageDataShow.data[i + 0] = currentImageData.data[i + 0]
              imageDataShow.data[i + 1] = currentImageData.data[i + 1]
              imageDataShow.data[i + 2] = currentImageData.data[i + 2]
              imageDataShow.data[i + 3] = currentImageData.data[i + 3]
            }
          }
          this.m_mask_canvas.getContext('2d').putImageData(imageDataShow, 0, 0)
          callback && callback()
        }
      }
      img.src = src
    },
    f_set_image (canvas, src, callback) {
      let ctx = canvas.getContext('2d')
      let img = document.createElement('img')
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
        callback && callback()
      }
      img.src = src
    },
    f_set_tidai_color (color) {
      this.m_config.tidai_color = color
      this.m_tidai_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_origin_tidai_canvas, this.m_config.tidai_color), 0, 0)
      if (this.m_config.direction == 'up' || this.m_config.direction == 'bottom' || this.m_config.direction == 'top') {
        this.m_config.direction = 'top'
        this.f_clear_canvas()
        this.f_set_config()
      }
    },
    f_set_lingkou_color (color) {
      this.m_config.lingkou_color = color
      this.m_lingkou_canvas.getContext('2d').putImageData(this.f_recolor_canvas(this.m_origin_lingkou_canvas, this.m_config.lingkou_color), 0, 0)
      if (this.m_config.direction == 'up' || this.m_config.direction == 'bottom' || this.m_config.direction == 'top') {
        this.m_config.direction = 'top'
        this.f_clear_canvas()
        this.f_set_config()
      }
    },
    f_choose_direction (direction) {
      this.m_config.direction = direction
      this.f_clear_canvas()
      this.f_set_config()
    },
    f_choose_type (type) {
      this.m_type = type
    },
    f_choose_material (material) {
      this.m_material = material
      if (this.m_material == 1) {
        this.m_material_mask_show = true
      }
    },
    // 选择二维码方向
    f_choose_qrcode_direction (direction) {
      this.m_config.qrcode = direction
      if (direction == 'top') {
        this.m_config.direction = 'top'
        this.f_clear_canvas()
        this.f_set_config()
      }
      if (direction == 'side') {
        this.m_config.direction = 'right'
        this.f_clear_canvas()
        this.f_set_config()
      }
      this.f_set_qrcode()
    },
    f_close_material_mask () {
      this.m_material_mask_show = false
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
        if (filterH[0] == HSL[0] && filterH[1] == HSL[1]) {
          if (filterH[2] < 0.2) {
            // 黑色的
            RGB = Utils.Hsl2Rgb(filterH[0], filterH[1], HSL[2] - 0.6)
            data[i + 0] = RGB[0]
            data[i + 1] = RGB[1]
            data[i +2] = RGB[2]
          } else {
            continue
          }
        } else {
          // 颜色的对比度过高 比如黄色需要调整下
          if (filterH[1] > 0.8) {
            RGB = Utils.Hsl2Rgb(filterH[0], filterH[1] - 0.2, HSL[2] - 0.2)
          } else {
            RGB = Utils.Hsl2Rgb(filterH[0], filterH[1], HSL[2] - 0.2)
          }
          data[i + 0] = RGB[0]
          data[i + 1] = RGB[1]
          data[i +2] = RGB[2]
        }
      }
      callback && callback ()
      return imgData
    }
  }
}
</script>
<style scoped lang="scss">
.main{
  height: 100%;
  position: relative;
  padding-top: 41px;
  box-sizing: border-box;
  padding-bottom: 240px;
  .header{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  .footer{
    position: absolute;
    left:0;
    bottom: 0;
    width: 100%;
    height: 240px;
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
        height: 40px;
        line-height: 40px;
        display: inline-block;
        text-align: center;
        width: 25%;
        float: left;
        cursor:pointer;
        position: relative;
        &.active{
          color: #F08200;
        }
        input{
          position: absolute;
          top:0;
          left:0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
    .type-content{
      .color-wrap,.img-wrap{
        max-width: 100%;
        padding: 5px;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        background-color: #f8f9fb;
        border: 1px solid #eee;
        font-size: 0;
        &::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        .color-item-wrap{
          display: inline-block;
          margin-right: 6px;
          &:last-child{
            margin-right: 0;
          }
          width: 80px;
          .color-item{
            display: inline-block;
            height: 80px;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #eee;
            box-sizing: border-box;
          }
        }
        .label{
          font-size: 12px;
          text-align: center;
        }
        .img-item-wrap{
          width: 80px;
          margin-right: 6px;
          display: inline-block;
          &:last-child{
            margin-right: 0;
          }
          .img-item{
            height: 80px;
            border-radius: 4px;
            display: inline-block;
            border: 1px solid #eee;
            box-sizing: border-box;
            &.active{
              border-color: #F08200;
            }
          }
        }
      }
    }
  }
  .canvas-panel-wrap{
    padding-left: 10%;
    padding-right: 10%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    top:50%;
    transform: translateY(-50%);
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
      overflow: hidden;
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
      .canvas-left{
        left:-25%;
        position: absolute;
        top:0;
        height: 100%;
        width: 100%;
      }
      .canvas-right{
        right:-25%;
        position: absolute;
        top:0;
        height: 100%;
        width: 100%;
      }
      canvas{
      }
      img{
        top:0;
        left:0;
        // max-height: 100%;
        // max-width: 100%;
        position: absolute;
      }
    }
  }
  .material-mask{
    position: absolute;
    top:0;
    right: 0;
    width: 100%;
    z-index: 2;
    background-color: #fff;
    height: 100%;
  }
}
</style>
