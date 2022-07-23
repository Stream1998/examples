// Worklet 类
class MagnetMatrixPaint {
  // 变量监听，如果发生改变，重新调用 paint
  static get inputProperties() { 
    return [
      '--mouse-x', 
      '--mouse-y', 
      '--magnet-color', 
      '--magnet-size', 
      '--magnet-gap', 
      '--magnet-radius'
    ]; 
  }
  /**
   * 必须实现 paint 方法, 提供浏览器调用
   * @param {*} ctx canvas 的上下文对象
   * @param {*} size 
   */
  paint(ctx, size, props) {
    // 从 CSS Variables 中获取
    const mouseX = parseInt(props.get('--mouse-x'))
    const mouseY = parseInt(props.get('--mouse-y'))
    const color = props.get('--magnet-color')
    const lineWidth = parseInt(props.get('--magnet-size'))
    const gap = parseInt(props.get('--magnet-gap'))
    const radius = parseInt(props.get('--magnet-radius'))

    ctx.lineCap = "round";
    for (let i = 0; i * gap < size.width; i++) {
      for (let j = 0; j * gap < size.height; j++) {
        const posX = i * gap
        const posY = j * gap
        const distance = Math.sqrt(Math.pow(posX - mouseX, 2) + Math.pow(posY - mouseY, 2))
        const width = distance < radius ? (1 - distance / radius * distance / radius) * gap * 0.4 : 0
        const startPosX = posX - width * 0.5
        const endPosX = posX + width * 0.5
        const rotate = Math.atan2(mouseY - posY, mouseX - posX)

        ctx.save()
        ctx.beginPath();
        ctx.translate(posX, posY);
        ctx.rotate(rotate);
        ctx.translate(-posX, -posY);
        ctx.moveTo(startPosX, posY);
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineTo(endPosX, posY);
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
      }
    }
  }
}

// 注册绘制器
registerPaint('magnet-matrix', MagnetMatrixPaint);