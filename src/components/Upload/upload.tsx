import React, { FC, useRef, useState, ChangeEvent, CSSProperties } from 'react'
import axios from 'axios'
import Button from './../Button/button'
import UploadList from './uploadList'

// 文件列表定义
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  name: string
  size: number
  status?: UploadFileStatus
  percent?: number
  raw?: File    // 原文件信息
  response?: any
  error?: any
}

export interface UploadProps {
  /** 样式 */
  style?: CSSProperties
  /** 上传文件服务器地址 */
  action: string
  /** 默认文件列表 */
  defaultFileList?: UploadFile[]
  /** 文件上传之前，可对文件进行预先处理 */
  beforeUpload?: (file: File) => Boolean | Promise<File>
  /** 当前进度（百分比，当前文件） */
  onProgress?: (progress: number, file: File) => void
  /** 上传成功 */
  onSuccess?: (data: any, file: File) => void
  /** 上传失败 */
  onError?: (err: any, file: File) => void
  /** 文件选择时 */
  onChange?: (file: File) => void
  /** 删除文件 */
  onRemove?: (file: UploadFile) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const { action, defaultFileList, style, beforeUpload, onProgress, onSuccess, onError, onChange, onRemove } = props
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const fileInput = useRef<HTMLInputElement>(null)
  // 更新fileList对应file的状态, Partial将定义的属性变为可选
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  // 将file转换成formData进行上传
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + '-upload-file',
      name: file.name,
      size: file.size,
      status: 'ready',
      percent: 0,
      raw: file,
    }
    setFileList([_file, ...fileList])

    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      // 文件上传时到头信息
      headers: { 'Content-type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        // axios支持文件上传进度
        const percentage = Math.round((e.loaded * 100) / e.total) || 0
        // 更新文件对象状态
        updateFileList(_file, { percent: percentage, status: 'uploading' })
        // 当进度小于100时会一直调用，达到100时会走到then
        if (percentage < 100) {
          onProgress && onProgress(percentage, file)
        }
      },
    }).then((res) => {
      updateFileList(_file, { status: 'success', response: res.data, percent: 100 })
      onSuccess && onSuccess(res.data, file)
      onChange && onChange(file)
    }).catch((err) => {
      updateFileList(_file, { status: 'error', error: err })
      onError && onError(err, file)
      onChange && onChange(file)
    })
  }
  const uploadFile = (files: FileList) => {
    // 获取input file时得到到为一个集合，需要转换为数组
    const postFiles = Array.from(files)
    // 将file遍历上传
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        // 如果传入的是Promise，则获取处理后的file
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        }
        // 接受的如果是bool类型，false直接不执行，true才继续上传流程
        if (result !== false) {
          post(file)
        }
      }
    })
  }
  const handleClick = () => {
    // 点击按钮时触发input的click，此时会打开文件选择
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    // 选择图片后进行对文件上传
    uploadFile(files)
    // 获取玩文件信息后，将input的value清空
    fileInput.current && (fileInput.current.value = '')
  }
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  return (
    <div className='upload-component' style={style}>
      <Button btnType='primary' onClick={handleClick}>
        上传文件
      </Button>
      <input type='file' ref={fileInput} className='upload-file-input' style={{ display: 'none' }} onChange={handleFileChange} />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload;
