import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

interface MenuItemProps {
  index: number;
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
    if (context.onSelect && !disabled) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

// MenuItem.displayName
console.log(MenuItem.displayName)

export default MenuItem