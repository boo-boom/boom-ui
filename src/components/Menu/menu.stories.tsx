import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export const defaultMenu = () => (
  <Menu
    defaultIndex='0'
    onSelect={(index) => {
      action(`clicked ${index} item`)
    }}>
    <MenuItem>cool link</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>cool link 2</MenuItem>
  </Menu>
)

export const SubMenuComponent = () => (
  <Menu mode="horizontal" defaultIndex="0" onSelect={index => {action(`clicked ${index} item`)}}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>javascript</MenuItem>
      <MenuItem>vue</MenuItem>
    </SubMenu>
    <SubMenu title="opened">
      <MenuItem>javascript</MenuItem>
      <MenuItem>vue</MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu', module)
  .add('Menu', defaultMenu)
  .add('subMenu', SubMenuComponent)
