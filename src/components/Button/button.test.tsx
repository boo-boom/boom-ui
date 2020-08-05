import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

// test('Button组件测试', () => {
//   const wrapper = render(<Button>Nice</Button>)
//   const element = wrapper.queryByText('Nice')
//   expect(element).toBeTruthy()
//   expect(element).toBeInTheDocument()
// })

const defaultProps = {
  onClick: jest.fn(),
}

const testPrimaryProps: ButtonProps = {
  size: 'lg',
  btnType: 'primary',
  className: 'testClass'
}

const testLinkProps: ButtonProps = {
  btnType: 'link',
  href: 'https://abc'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

// it和test相同
describe('Button组件测试', () => {
  it('按钮组件 => default', () => {
    const wrapper = render(<Button {...defaultProps}>Default</Button>)
    const element = wrapper.getByText('Default') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('按钮组件 => primary', () => {
    const wrapper = render(<Button {...testPrimaryProps}>Primary</Button>)
    const element = wrapper.getByText('Primary')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary testClass')
  })

  it('按钮组件 => link', () => {
    const wrapper = render(<Button {...testLinkProps}>Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('按钮组件 => disabled', () => {
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
    const element = wrapper.getByText('Disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})