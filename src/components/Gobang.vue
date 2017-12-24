<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
    <canvas id='canvas'>
      您的浏览器不支持canvas动画效果
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'gobang',
  data () {
    return {
      msg: 'gobang game.'
    }
  },
  mounted () {
    let chess = document.getElementById('canvas')
    let context = chess.getContext('2d')
    chess.width = chess.height = 450
    if (!context) console.log('浏览器不支持 canvas！')

    let xStart, yStart, xEnd, yEnd
    xStart = yStart = 15
    xEnd = yEnd = 435
    let chessBox = []
    let me = true
    // 用于存放棋盘中落子的情况, 初始值为 0
    for (let i = 0; i < 15; i++) {
      chessBox[i] = []
      for (let j = 0; j < 15; j++) {
        chessBox[i][j] = 0
      }
    }
    // 绘制棋盘
    function drawChessBoard () {
      context.strokeStyle = '#D6D1D1'
      for (let i = 0; i < 15; i++) {
        // 绘制竖线
        context.moveTo(xStart + i * 30, yStart)
        context.lineTo(xStart + i * 30, yEnd)
        context.stroke()
        // 绘制横线
        context.moveTo(xStart, yStart + i * 30)
        context.lineTo(xEnd, yStart + i * 30)
        context.stroke()
      }
    }
    drawChessBoard()

    function oneStep (i, j, k) {
      context.beginPath()
      // 绘制圆形棋子
      context.arc(xStart + i * 30, yStart + j * 30, 13, 0, 2 * Math.PI)
      // 设置渐变
      let grd = context.createRadialGradient(xStart + i * 30, yStart + j * 30, 13, xStart + i * 30, yStart + j * 30, 0)

      if (k) {
        grd.addColorStop(0, '#0A0A0A') // 黑棋
        grd.addColorStop(1, '#636766')
      } else {
        grd.addColorStop(0, '#D1D1D1') // 白棋
        grd.addColorStop(1, '#F9F9F9')
      }
      context.fillStyle = grd
      context.fill()
      context.closePath()
    }

    chess.onclick = function (e) {
      let x = e.offsetX // 相对于棋盘左上角的x坐标
      let y = e.offsetY // 相对于棋盘左上角的y坐标
      let i = Math.floor(x / 30)
      let j = Math.floor(y / 30)
      console.log(123123, chessBox)
      if (chessBox[i][j] === 0) {
        oneStep(i, j, me)
        if (me) {
          chessBox[i][j] = 1
        } else {
          chessBox[i][j] = 2
        }
        me = !me // 下一步白棋
      }
    }
  },
  methods: {
    chessClick () {

    },
    // 0 游戏未结束 1 黑子赢 2 白子赢
    isGameOver () {
      let count = 0
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          count = 0
          for (let k = 0; k < 5; k++) {
            if (chessBox[i][j + k] === 0) {
              count = 0
              break
            } else {
              count += chessBox[i][j + k]
            }
          }
          if (count === 5) {
            return 1
          } else if (count === 10) {
            return 2
          }
        }
      }

      // 横向0°的五子判断
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          count = 0
          for (let k = 0; k < 5; k++) {
            if (chessBox[j + k][i] === 0) {
              count = 0
              break
            } else {
              count += chessBox[j + k][i]
            }
          }
          if (count === 5) {
            return 1
          } else if (count === 10) {
            return 2
          }
        }
      }

      // 斜向135°的五子判断'\'方向
      for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
          count = 0
          for (let k = 0; k < 5; k++) {
            if (chessBox[i + k][j + k] === 0) {
              count = 0
              break
            } else {
              count += chessBox[i + k][j + k]
            }
          }
          if (count === 5) {
            return 1
          } else if (count === 10) {
            return 2
          }
        }
      }

      // 斜向45°的五子判断'/'方向
      for (let i = 0; i < 11; i++) {
        for (let j = 14; j > 3; j--) {
          count = 0
          for (let k = 0; k < 5; k++) {
            if (chessBox[i + k][j - k] === 0) {
              count = 0
              break
            } else {
              count += chessBox[i + k][j - k]
            }
          }
          if (count === 5) {
            return 1
          } else if (count === 10) {
            return 2
          }
        }
      }

      return 0
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
canvas {
  display: block;
  margin: 50px auto;
  box-shadow: -2px -2px 2px #F3F2F2, 5px 5px 5px #6F6767;
}
</style>
