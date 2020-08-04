import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './upload'

// beforeUpload返回boolean
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('文件大小不能超过50KB')
//     return false
//   }
//   return true
// }

// beforeUpload返回Promise
const filePromise = (file: File) => {
  const splitName = file.name.split('.')
  const extName = splitName[splitName.length - 1]
  const fileName = splitName.slice(0, splitName.length - 1).join('_')
  // 创建一个File
  const formDate = new File([file], `new_${fileName}.${extName}`, { type: file.type })
  return Promise.resolve(formDate)
}

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const uploadBase = () => (
  <Upload
    style={{width: '300px'}}
    action="http://jsonplaceholder.typicode.com/posts"
    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    onProgress={action("onProgress")}
    onSuccess={action("onSuccess")}
    onError={action("onError")}
    onChange={action("onChange")}
    beforeUpload={filePromise}
    defaultFileList={defaultFileList}
  />
)

storiesOf('Upload', module)
  .add('普通上传', uploadBase)