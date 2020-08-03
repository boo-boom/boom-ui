import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /** Button class */
  className?: string
  /** 禁用Button */
  disabled?: boolean
  /** 设置 Button 的尺寸 */
  size?: ButtonSize
  /** 设置 Button 的类型 */
  btnType?: ButtonType
  children: ReactNode
  /** Button 的跳转链接（只支持Link） */
  href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

// Partial将所有属性修改为可选(ts提供)
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'boomUI'
 * ~~~
 */
// storybook生成文档时，必须export，而且FC等类型必须import使用不可React.FC，组件最后必须加';'
export const Button:FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, children, href, ...restProps } = props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled,
  })
  if (btnType === 'link' && href) {
    return(
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return(
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button;