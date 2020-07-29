import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <div className="item">
        <Button autoFocus btnType={ButtonType.Default} size={ButtonSize.Large}>Large Default</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Small} disabled>Disabled Default</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">Link</Button>
        <Button btnType={ButtonType.Link} disabled href="https://www.baidu.com">Link</Button>
      </div>

      <div className="item">
        <Menu mode="horizontal" defaultIndex="0" onSelect={index => console.log(index)}>
          <MenuItem>active</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>javascript</MenuItem>
            <MenuItem>vue</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default App;
