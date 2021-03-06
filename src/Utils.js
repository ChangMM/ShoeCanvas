let Utils = {
  Hex2Rgb: (color) => {
    if (color.indexOf('#') !== -1) {
      return [parseInt(color.substr(1, 2), 16), parseInt(color.substr(3, 2), 16), parseInt(color.substr(5, 2), 16)]
    } else {
      return [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)]
    }
  },
  Hsl2Rgb: (h, s, l) => {
    var r, g, b
    if(s == 0){
      r = g = b = l
    }else{
      var hue2rgb = function hue2rgb(p, q, t){
        if(t < 0) t += 1
        if(t > 1) t -= 1
        if(t < 1/6) return p + (q - p) * 6 * t
        if(t < 1/2) return q
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s
      var p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  },
  Rgb2Hsl: (r, g, b) => {
    r /= 255, g /= 255, b /= 255
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
      h = s = 0
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6
    }
    return [h, s, l]
  }
}
export default Utils
