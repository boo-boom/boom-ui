import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('Button组件测试', () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
})
