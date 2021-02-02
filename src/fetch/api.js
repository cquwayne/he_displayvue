import store from '../store/store'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.interceptors.request.use(config => {
  return config
}, error => {
// Do something with request error
  console.log(error) // for debug
  Promise.reject(error).then(r => {
    return r
  })
})

function get (args) {
  return new Promise((resolve, reject) => {
    let url = args.url
    // let root = 'http://localhost:8000/'
    let root = store.state.root
    axios.get(root + url, {params: args['params']})
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
function post (args) {
  return new Promise((resolve, reject) => {
    let root = store.state.root
    if (!args['config']) {
      args['config'] = {}
    }
    if (args['progressCallback']) {
      args['config']['onUploadProgress'] = function (progressEvent) {
        // 进度值
        // var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
        args['progressCallback'](complete)
      }
    }
    axios.post(root + args.url, args['params'], args['config'])
      .then(response => {
        store.commit('clear')
        resolve(response.data)
      })
      .catch((error) => {
        // 关闭  loading图片消失
        NProgress.done()
        reject(error)
      })
  })
}
function put (args) {
  return new Promise((resolve, reject) => {
    // 判断是传入的url中是否包含地址头
    let url = args.url
    let root = store.state.root
    axios.put(root + url, args['params'])
      .then(response => {
        store.commit('clear')
        resolve(response.data)
      })
      .catch((error) => {
        NProgress.done()
        reject(error)
      })
  })
}
function del (args) {
  return new Promise((resolve, reject) => {
    let url = args.url
    let root = store.state.root
    if (url.search('http') !== -1) {
      root = ''
    }
    axios.delete(root + url, {params: args['params']})
      .then(response => {
        store.commit('clear')
        resolve(response.data)
      })
      .catch((error) => {
        NProgress.done()
        reject(error)
      })
  })
}
function all (list) {
  return new Promise((resolve) => {
    let root = store.state.root
    let reqList = []
    list.forEach(item => {
      let url = item.url
      if (url.search('system/') !== -1) {
        root = store.state.rootApi
      }
      reqList.push(axios.get(root + url, {params: item['params']}))
    })
    axios.all(reqList).then(axios.spread(function (...resList) {
      for (let i = 0; i < resList.length; i++) {
        resList[i] = resList[i]['data']
      }
      resolve(resList)
    }))
  })
}
/**
 * 时间戳 转 字符串
 * @param date
 * @returns {string}
 */
function formatDate(date) {
  date = new Date(date);
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}
export default {
  get (args) {
    return get(args)
  },
  post (args) {
    return post(args)
  },
  put (args) {
    return put(args)
  },
  delete (args) {
    return del(args)
  },
  all (list) {
    return all(list)
  },
  formatDate(date) {
    return formatDate(date)
  }
}
