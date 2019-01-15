<template>
  <svg v-bind:width="width" v-bind:height="height" v-on:mouseenter="mouseEnter()" v-on:mousemove="mouseMove($event)" v-on:mouseleave="mouseLeave()">
    <circle v-bind:cx="cx" v-bind:cy="cy" v-bind:r="outerRadius" class="logo-outer-circle"></circle>
    <circle v-bind:cx="cx" v-bind:cy="cy" v-bind:r="innerRadius" class="logo-inner-circle"></circle>
    <g v-bind:transform="transform">
      <path v-bind:d="needlePath" class="logo-needle north"></path>
      <path v-bind:d="needlePath" v-bind:transform="southNeedleTransform" class="logo-needle"></path>
    </g>
  </svg>
</template>

<script>
function deg2rad(deg) {
  return deg * Math.PI / 180;
}

function arc(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
  return 'A' + rx + ',' + ry + ',' + xAxisRotation + ',' + largeArcFlag + ',' + sweepFlag + ',' + x + ',' + y;
}

function move(x, y) {
  return 'M' + x + ',' + y;
}

function line(x, y) {
  return 'L' + x + ',' + y;
}

function ease(pos) {
  // pos [0..1]
  if (pos < 0.8) {
    var t = pos / 0.8;
    return t * t * t;
  }
  return 1 + Math.sin((pos - 0.8) / 0.2 * Math.PI) * 0.1;
}

export default {
  props: [ 'radius' ],
  data: function() {
    return {
      innerRadius: 3,
      needleInnerRadius: 5,
      timer: null,  
      northRotation: 300,
      rotation: 300
    };
  },
  computed: {
    width: function() {
      return this.radius * 2 + 4;
    },
    height: function() {
      return this.radius * 2 + 4;
    },
    cx: function() {
      return this.width / 2;
    },
    cy: function() {
      return this.height / 2;
    },
    outerRadius: function() {
      return this.radius;
    },
    needlePath: function() {
      let cx = this.cx;
      let cy = this.cy;
      let needleInnerRadius = this.needleInnerRadius;

      var angle = deg2rad(45);
    
      // arc start
      var sx = cx + Math.sin(angle) * needleInnerRadius;
      var sy = cy - Math.cos(angle) * needleInnerRadius;
    
      // arc end
      var ex = sx;
      var ey = cy + Math.cos(angle) * needleInnerRadius;
    
      // tip of needle
      var tx = cx + parseInt(this.radius) - 2;
      var ty = cy;

      return move(sx, sy) + ' ' + arc(needleInnerRadius, needleInnerRadius, 0, 0, 1, ex, ey) + ' ' + line(tx, ty);
    },
    southNeedleTransform: function() {
      return 'rotate(180,' + this.cx + ',' + this.cy + ')';
    },
    transform: function() {
      return 'translate(' + this.cx + ',' + this.cy + ') rotate(' + this.rotation + ') translate(-' + this.cx + ',-' + this.cy + ')';
    }
  },
  methods: {
    mouseEnter() {
      if (this.timer) {
        window.clearInterval(this.timer);
      }
    },
  
    mouseMove(e) {
      var deltaX = e.offsetX - this.width / 2;
      var deltaY = -(e.offsetY - this.height / 2);
      var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
      this.rotation = 360 - angle;
    },
  
    mouseLeave() {
      var startRotation = this.rotation;
      startRotation = startRotation >= 360 ? startRotation - 360 : startRotation;
    
      var delta = this.northRotation - startRotation;
      var direction = delta > 180 ? -1 : 1;
    
      if (direction === -1) {
        delta = 360 - delta;
      }
    
      var startTime = Date.now();
      this.timer = window.setInterval(() => {
        var now = Date.now();
        var pos = (now - startTime) / 1000;
        if (pos >= 1) {
          pos = 1;
          window.clearInterval(self.timer);
        }
        this.rotation = startRotation + direction * ease(pos) * delta;
      }, 10);
    }
  }
}
</script>

<style scoped>
.logo-outer-circle {
  stroke: #777;
  stroke-width: 2px;
  fill: none;
}

.logo-inner-circle {
  fill: #777;
  stroke: none;
}

.logo-needle {
  fill: #777;
  stroke: none;
}

.north {
  fill: #f55;
}
</style>