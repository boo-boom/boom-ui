import React, { FC, useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Transition from './../Transition/transition'
import Icon from '../Icon/icon'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu:FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpen = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpen)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': index === context.index,
    'is-vertical': context.mode === 'vertical',
    'is-opened': menuOpen,
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
      // 'menu-opened': menuOpen,   // 使用unmountOnExit动画组件属性代替css控制显示隐藏
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
      // in: 什么时候执行动画
      // timeout: 整个动画执行的事件
      // classNames: 动画不同运动周期的class前缀
      // appear: 第一次加载时也会执行整个动画
      // unmountOnExit: 动态添加/删除子元素，可代替display:none，使用display由于none时无法触发动画
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses} data-testid="test-sub-menu">
          {childComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
