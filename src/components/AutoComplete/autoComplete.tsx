import React, { FC, useState, useEffect, useRef, ChangeEvent, ReactElement, KeyboardEvent } from 'react'
import classNames from 'classnames'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Input, { InputProps } from './../Input/input'
import Icon from './../Icon/icon'
import Transition from './../Transition/transition'
import useDebounce from './../../hooks/useDebounce'
import useClickOutside from './../../hooks/useClickOutside'

library.add(fas)

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete:FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debounceValue = useDebounce(inputValue, 300)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => setSuggestions([]))
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [fetchSuggestions, debounceValue])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) index = suggestions.length - 1
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex])
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setSuggestions([])
        break
      default:
        break
    }
  }
  // 自定义选项列表
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <Transition in={loading || !!suggestions.length} animation="zoom-in-top" timeout={300}>
        <ul className="suggestion-list">
          { loading &&
            <div className="suggestion-loading-icon">
              <Icon icon="spinner" spin/>
            </div>
          }
          {
            suggestions.length
            ? suggestions.map((item, index) => {
                const classes = classNames('suggestion-item', {
                  'is-active': index === highlightIndex
                })
                return (
                  <li className={classes} key={index} onClick={() => { handleSelect(item) }}>
                    {renderTemplate(item)}
                  </li>
                )
              })
            : null
          }
        </ul>
      </Transition>
    )
  }
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown} />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;