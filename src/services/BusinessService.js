import axios from 'axios'

// const BASE_URL = 'localhost'
// const STH_PATH = '/business'
let BusinessService = {};

BusinessService.get = async (id, callback) => {
  await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => {
      console.log('response', response)
      callback(response)
    })
}

export default BusinessService;