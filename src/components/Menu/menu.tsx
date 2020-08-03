import React, { useState, createContext, FunctionComponentElement, FC, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectedIndex: string) => void

export interface MenuProps {
  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string
  /** 自定义class */
  className?: string
  /** 菜单类型 横向或者纵向 */
  mode?: MenuMode
  /** 自定义样式 */
  style?: CSSProperties
  /** 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallBack
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  mode?: MenuMode
  onSelect?: SelectCallBack
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'boomUI'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, defaultIndex, style, children, defaultOpenSubMenus, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: currentActive || '0',
    mode,
    defaultOpenSubMenus,
    onSelect: handleClick,
  }
  const renderChildren = () => {
    // react提供的处理children方法: React.Children (请勿直接遍历或修改props.children)
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 将index混入到child中，这样就不需要手动传入index，克隆child组件实例并添加props.index属性
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu中只能使用MenuItem组件')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu
