import axios from 'axios'
import { message } from 'antd'
// 统一封装ajax
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(err => {
      message.error('接口请求失败' + err.message, 1)
    })
  })
}