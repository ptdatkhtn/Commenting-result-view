export const innerDimensions = (node) => {
    var computedStyle = window.getComputedStyle
        ? window.getComputedStyle(node ) // Standards
        : node.currentStyle;     // Old IE
    let width = node.clientWidth // width with padding
    let height = node.clientHeight // height with padding
    height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)
    return { height, width }
  }