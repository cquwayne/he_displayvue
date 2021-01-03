import axios from 'axios'

axios.interceptors.request.use(config => {
  return config;
}, err => {
  Message.error({
    message: '请求超时!'
  });
  return Promise.resolve(err);
})

function get(args) {
  return new Promise((resolve,reject) => {
    let url = args.url
    let root = 'http://localhost:8000/'
    axios.get(root+url,{params: args['params']})
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  get(args) {
    return get(args)
  }
}
