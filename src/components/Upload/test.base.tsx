import React, { FC, ChangeEvent } from 'react'
import axios from 'axios'

const UploadBase:FC = () => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formDate = new FormData()
      formDate.append(uploadedFile.name, uploadedFile)
      axios.post('http://jsonplaceholder.typicode.com/posts', formDate, {
        headers: {
          'Content-type': 'multipart/form-data',
        }
      }).then(res => {
        console.log(res.data)
      })
    }
  }

  return (
    <div>
      {/* 使用表单进行提交 */}
      {/* <form method="post" encType="multipart/form-data" action="http://jsonplaceholder.typicode.com/posts">
        <input type="file" name="myFile" />
        <button type="submit">上传</button>
      </form> */}

      {/* 使用new FormDate() */}
      <input type="file" name="myFile" onChange={handleFileChange} />
    </div>
  )
}

export default UploadBase