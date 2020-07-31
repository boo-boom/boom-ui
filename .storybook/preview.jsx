import React from 'react'
import { addDecorator } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
import './../src/styles/index.scss'

const wrapperStyle = {
  padding: '20px 40px',
}

const storyWrapper = (storyFn) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

addDecorator(storyWrapper)
// addDecorator(withInfo)
// addParameters({info: { inline: true, header: false}})