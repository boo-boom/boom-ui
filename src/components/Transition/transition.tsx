import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  wrapper?: boolean
}

const Transition:React.FC<TransitionProps> = (props) => {
  const { classNames, animation, children, wrapper, ...restProps } = props
  return (
    // in: 什么时候执行动画
    // timeout: 整个动画执行的事件
    // classNames: 动画不同运动周期的class前缀
    // appear: 第一次加载时也会执行整个动画
    // unmountOnExit: 动态添加/删除子元素，可代替display:none，使用display由于none时无法触发动画
    <CSSTransition classNames={animation || classNames} {...restProps}>
      {/* 有可能有些元素样式中的transition会将Transition组件的覆盖，利用transition不可继承的特性在children外包一层 */}
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}
export default Transition