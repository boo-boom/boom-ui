import React, { useState, createContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
}

interface IMenuContext {
  index: string;
  mode?: MenuMode;
  onSelect?: SelectCallBack;
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, defaultIndex, style, children, onSelect } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
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

  return(
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
}

export default Menu