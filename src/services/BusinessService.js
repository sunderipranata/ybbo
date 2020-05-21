import axios from 'axios'

const BASE_URL = 'https://ybbo-1rxicshhu.now.sh/api'
// const BASE_URL = 'https://yukbantubisnis.online/api'
const BUSINESS_SIMPLIFIED = '/business'
let BusinessService = {};

BusinessService.getSimplifiedWithLimitOffset = async (limit, offset, callback) => {
  const PATH = BASE_URL + BUSINESS_SIMPLIFIED
  await 
    axios.get(PATH, {
      params: {
        limit: limit,
        offset: offset
      }
    })
    .then((response) => {
      console.log('response', response)
      callback(response)
    })
}

export default BusinessService;