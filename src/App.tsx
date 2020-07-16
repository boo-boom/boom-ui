import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

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
        <Menu mode="vertical">
          <MenuItem index={0}>123123</MenuItem>
          <MenuItem index={1} disabled>123123</MenuItem>
          <MenuItem index={2}>123123</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default App;
