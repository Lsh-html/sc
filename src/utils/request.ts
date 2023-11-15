import Axios, { AxiosResponse } from 'axios'
import { useTestStore } from "@/store/index";
// const axios = (aaa, bbb = false) => {
//   console.log(aaa);
//   console.log(bbb);

// }
const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Token": useTestStore().token
  },
  timeout: 60000, // 超时
  baseURL: import.meta.env['VITE_HTTP'] // 请求接口地址，这里使用本项目地址，因为我们是前后端分离，后面需要在vue.config.js里面配置代理，实际请求得地址不是这个。
})

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: T,
    data: T,
    msg: T
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

// 请求拦截
axios.interceptors.request.use(req => {
  console.log();

  // if (req.method === 'get') {
  //   const url = req.url
  //   const t = new Date().getTime()
  //   if (url.indexOf('?') >= 0) {
  //     req.url = `${url}&t=${t}`
  //   } else {
  //     req.url = `${url}?t=${t}`
  //   }
  // }
  return req
})

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 响应失败统一处理
    const { response } = error
    if (response) {
      switch (response.status) {
        case 400:
          break
        case 401:
          break
        case 403:
          break
        case 404:
          break
        case 500:
          break
        case 504:
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)
export default axios


// // http.ts
// import Axios, { AxiosResponse } from 'axios'
// import { ElMessage } from "element-plus"

// const showStatus = (status: number) => {
//   let message = ''
//   switch (status) {
//     case 400:
//       message = '请求错误(400)'
//       break
//     case 401:
//       message = '未授权，请重新登录(401)'
//       break
//     case 403:
//       message = '拒绝访问(403)'
//       break
//     case 404:
//       message = '请求出错(404)'
//       break
//     case 408:
//       message = '请求超时(408)'
//       break
//     case 500:
//       message = '服务器错误(500)'
//       break
//     case 501:
//       message = '服务未实现(501)'
//       break
//     case 502:
//       message = '网络错误(502)'
//       break
//     case 503:
//       message = '服务不可用(503)'
//       break
//     case 504:
//       message = '网络超时(504)'
//       break
//     case 505:
//       message = 'HTTP版本不受支持(505)'
//       break
//     default:
//       message = `连接出错(${status})!`
//   }
//   return `${message}，请检查网络或联系管理员！`
// }

// const axios = Axios.create({
//   // 联调
//   // baseURL: process.env.NODE_ENV === 'production' ? `/` : '/api',
//   baseURL: import.meta.env['VITE_HTTP'],
//   headers: {
//     get: {
//       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//     },
//     post: {
//       'Content-Type': 'application/json;charset=utf-8'
//     }
//   },
//   // 是否跨站点访问控制请求
//   withCredentials: true,
//   timeout: 30000,
//   transformRequest: [(data) => {
//     data = JSON.stringify(data)
//     return data
//   }],
//   validateStatus() {
//     // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
//     return true
//   },
//   transformResponse: [(data) => {
//     if (typeof data === 'string' && data.startsWith('{')) {
//       data = JSON.parse(data)
//     }
//     return data
//   }]

// })

// // 请求拦截器
// // axios.interceptors.request.use(
// // //   (config: AxiosRequestConfig) => {
// // //   //获取token，并将其添加至请求头中
// // //   let token = localStorage.getItem('token')
// // //   if (token) {
// // //     config.headers.Authorization = `${token}`;
// // //   }
// // //   return config
// // // }, (error) => {
// // //   // 错误抛到业务代码
// // //   error.data = {}
// // //   error.data.msg = '服务器异常，请联系管理员！'
// // //   return Promise.resolve(error)
// // // }
// // )
// axios.interceptors.request.use(req => {
//   // req.headers['Content-Type'] = 'application/json;charset=UTF-8'
//   // console.log(req.headers['Content-Type']);

//   // if (req.method === 'get') {
//   //   const url = req.url
//   //   const t = new Date().getTime()
//   //   if (url.indexOf('?') >= 0) {
//   //     req.url = `${url}&t=${t}`
//   //   } else {
//   //     req.url = `${url}?t=${t}`
//   //   }
//   // }
//   return req
// })

// // 响应拦截器
// axios.interceptors.response.use((response: AxiosResponse) => {
//   const status = response.status
//   let msg = ''
//   if (status < 200 || status >= 300) {
//     // 处理http错误，抛到业务代码
//     msg = showStatus(status)
//     if (typeof response.data === 'string') {
//       response.data = { msg }
//     } else {
//       response.data.msg = msg
//     }
//   }
//   return response
// }, (error) => {
//   if (axios.isCancel(error)) {
//     console.log('repeated request: ' + error.message)
//   } else {
//     // handle error code
//     // 错误抛到业务代码
//     error.data = {}
//     error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
//     ElMessage.error(error.data.msg)
//   }
//   return Promise.reject(error)
// })

// export default axios
