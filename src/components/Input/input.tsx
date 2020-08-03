import React, { FC, ReactElement, ChangeEvent, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from './../Icon/icon'

type InputSize = 'lg' | 'sm'

// size在InputHTMLAttributes已经有使用，可以使用ts提供的Omit对接口中对size进行忽略
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用 Input */
  disabled?: boolean
  /** 设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize
  /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /** 添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement
  /** 添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement
  // ChangeEvent重新定义为HTMLInputElement而非HTMLElement，否则e.target.value无法获取该定义
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'boomUI'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
  const { size, disabled, icon, prepend, append, style, ...restProps } = props
  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    // 同时设置defaultValue/value时，优先使用value
    delete restProps.defaultValue
    // value没有定义时，设置默认值为''
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input disabled={disabled} className="input-inner" {...restProps} />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input;
