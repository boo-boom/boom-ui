import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 boom-component 组件库</h1>
        <img src="https://travis-ci.com/boo-boom/boom-ui.svg?branch=master" alt="travis"/>
        <p>boom-component，从零搭建组件库</p>
        <h3>安装试试</h3>
        <code>npm install boom-component --save</code>
      </>
    )
  },
  { info: { disable: true } }
)
