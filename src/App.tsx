import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button autoFocus btnType={ButtonType.Default} size={ButtonSize.Large}>Large Default</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Large Danger</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>Small Default</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Small Primary</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small} disabled>Disabled Default</Button>
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">Link</Button>
      <Button btnType={ButtonType.Link} disabled href="https://www.baidu.com">Link</Button>
    </div>
  );
}

export default App;
