import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  className: 'test',
  onSelect: jest.fn(),
}

const testVerticalProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: '0',
  defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>open1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

// 显示隐藏时根据样式控制的，所以需要给元素添加对应的显示隐藏样式
const createStyleFile = () => {
  const cssFile:string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

// 获取组件元素
let wrapper: RenderResult,
    wrapper2: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

describe('Menu && MenuItem组件', () => {
  // 钩子函数：每个任务(case)执行前都会调用
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  
  it('默认props渲染Menu && MenuItem组件', () => {
    // 测试样式
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    // 不分层级只获取当前下面所有li，当有subMenu时长度就会出现问题
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // 只获取第一层下面的li
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('触发点击事件，并正确执行回调', () => {
    // 测试行为
    const thirdItem = wrapper.getByText('third')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('使用vertical mode，正确切换显示类型', () => {
    // 测试mode
    // 重新获取wrapper，需要清空之前定义，调用cleanup()
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('当有subMenu时hover菜单时显示对应子菜单', async() => {
    // queryByText获取不到时返回null；当元素有可能不显示时可使用
    // toBeVisible：显示
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    // 鼠标划过事件，元素会timeOut 300ms延时，需要用到wait
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})

describe('在垂直模式下测试菜单和MenuItem组件', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerticalProps))
    wrapper2.container.append(createStyleFile())
  })
  it('正确渲染vertical mode', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('垂直模式下点击展开subMenu', () => {
    const dropDownItem = wrapper2.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  it('垂直模式默认展开指定subMenu', () => {
    expect(wrapper2.queryByText('open1')).toBeVisible()
  })
})