import React, { FC, useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu:FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const [menuOpen, setOpen] = useState(false)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': index === context.index,
  })
  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  let timer:any
  const handleMouse = (e:React.MouseEvent, toggle:boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e:React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e:React.MouseEvent) => { handleMouse(e, false) },
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning: Menu中只能使用MenuItem组件')
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
