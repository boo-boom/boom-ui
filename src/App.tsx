import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'
library.add(fas)

function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <div className="item">
        <Button autoFocus btnType="default" size="lg">Large Default</Button>
        <Button btnType="primary" size="lg">Large Primary</Button>
        <Button btnType="danger" size="sm">Small Danger</Button>
        <Button btnType="default" size="sm" disabled>Disabled Default</Button>
        <Button btnType="link" href="https://www.baidu.com">Link</Button>
        <Button btnType="link" disabled href="https://www.baidu.com">Link</Button>
      </div>

      <div className="item">
        <Menu mode="horizontal" defaultIndex="0" defaultOpenSubMenus={['3']} onSelect={index => console.log(index)}>
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
      </div>

      <div className="item">
        <Icon icon="check-square" size="3x" className="primary" theme="danger" />
      </div>

      <div className="item">
        <Button size="lg" onClick={() => { setShow(!show) }}>Large Default</Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>test!!!</p>
            <p>test!!!</p>
            <p>test!!!</p>
            <p>test!!!</p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
          <Button btnType="primary" size="lg">Large Primary</Button>
        </Transition>
      </div>

      <div className="item">
        <Input prepend="姓名" icon="coffee" size="lg" defaultValue="123123" />
      </div>
    </div>
  );
}

export default App;
