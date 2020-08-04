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
import AutoComplete from './components/AutoComplete/autoComplete'
import Upload from './components/Upload/upload'
// 上传组件基础知识实例
import UploadBase from './components/Upload/test.base'
library.add(fas)

const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']

function App() {
  const [show, setShow] = useState(true)
  const handleFetch = (query: string) => {
    return lakers.filter(item => item.includes(query)).map(value => ({ value }))
  }

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
        <Input prepend="姓名" icon="coffee" size="lg" />
      </div>

      <div className="item">
        <AutoComplete prepend="搜索" icon="search" fetchSuggestions={handleFetch} />
      </div>

      <div className="item">
        <UploadBase />
        <Upload action="http://jsonplaceholder.typicode.com/posts" />
      </div>
    </div>
  );
}

export default App;
