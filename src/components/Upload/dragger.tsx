import React, { FC, DragEvent, useState } from 'react'
import classNames from 'classnames'

export interface DraggerProps {
  /** 获取文件信息 */
  onFile: (files: FileList) => void
}

const Dragger:FC<DraggerProps> = (props) => {
  const { children, onFile } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('uploader-dragger', {
    'is-dragover': dragOver
  })
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e :DragEvent<HTMLElement>) => {
    e.preventDefault()
    // e.dataTransfer.files可以获取到文件信息
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={classes} 
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;