import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DataSourceType, AutoComplete } from './autoComplete'

interface OptionProps {
  value: string
  number: number
  url: string
}

const SimpleComplete = () => {
  // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  // const lakersWithNumber = [
  //   { value: 'bradley', number: 11 },
  //   { value: 'pope', number: 1 },
  //   { value: 'caruso', number: 4 },
  //   { value: 'cook', number: 2 },
  //   { value: 'cousins', number: 15 },
  //   { value: 'james', number: 23 },
  //   { value: 'AD', number: 3 },
  //   { value: 'green', number: 14 },
  //   { value: 'howard', number: 39 },
  //   { value: 'kuzma', number: 0 },
  // ]
  const handleFetch = (query: string) => {
    // string[]
    // return lakers.filter((item) => item.includes(query)).map(value => ({ value }))

    // object[]
    // return lakersWithNumber.filter((item) => item.value.includes(query))

    // 异步
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  }
  const renderOption = (item: DataSourceType) => {
    const _item = item as DataSourceType<OptionProps>
    return (
      <>
        <h2>Name: {_item.value}</h2>
        <p>url: {_item.url}</p>
      </>
    )
  }
  return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('checked')} renderOption={renderOption} />
}

storiesOf('autoComplete', module).add('select', SimpleComplete)
