import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Button from './button'

export const defaultButton = () => (
  <Button onClick={action('clicked')}> default button </Button>
)

export const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)

export const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
)

storiesOf('Button', module)
  .addDecorator(withInfo)
  .addParameters({info: { inline: true, header: false}})
  .add('默认按钮', defaultButton)
  .add('不同尺寸按钮', buttonWithSize)
  .add('不同类型按钮', buttonWithType)
