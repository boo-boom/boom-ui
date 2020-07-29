import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, style, disabled, children, index } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index,
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

// 可以在组件树结构中看到<MenuItem>...</MenuItem>
MenuItem.displayName = 'MenuItem'

export default MenuItem