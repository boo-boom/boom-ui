import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Input, InputProps } from './input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
}

describe('测试 Input 组件', () => {
  it('Input默认状态', () => {
    const wrapper = render(<Input {...defaultProps} />)
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('input-inner')
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  it('Input禁止输入状态', () => {
    const wrapper = render(<Input disabled placeholder='disabled' />)
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('Input尺寸大小状态', () => {
    const wrapper = render(<Input placeholder='sizes' size='lg' />)
    const testContainer = wrapper.container.querySelector('.input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })
  it('Input添加前缀/后缀显示状态', () => {
    const { queryByText, container } = render(<Input placeholder='pend' prepend='https://' append='.com' />)
    const testContainer = container.querySelector('.input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    expect(queryByText('https://')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })
})
