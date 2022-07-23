// Worklet 类
class CustomBackgroundPainter {
  // 变量监听，如果发生改变，重新调用 paint
  static get inputProperties() { 
    return [
      '--backgroundColor',
      '--backgroundMargin'
    ]; 
  }
  /**
   * 必须实现 paint 方法, 提供浏览器调用
   * @param {*} ctx  canvas 的上下文对象
   * @param {*} size 
   */
  paint(ctx, size, props) {
    // 从 CSS Variables 中获取
    const color = props.get('--backgroundColor');
    const margin = props.get('--backgroundMargin');

    ctx.fillStyle = color;
    ctx.rect(margin, margin, size.width - margin*2, size.height - margin * 2);
    ctx.fill();
  }
}

// 注册绘制器
registerPaint('custom-background', CustomBackgroundPainter);