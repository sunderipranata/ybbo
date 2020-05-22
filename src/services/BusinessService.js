import axios from 'axios'

const BASE_URL = 'https://ybbo-grwegs1za.now.sh/api'
// const BASE_URL = 'https://yukbantubisnis.online/api'
const BUSINESS_SIMPLIFIED = '/businesses'
let BusinessService = {};

BusinessService.getSimplifiedWithLimitOffset = (limit, offset, callback) => {
  console.log('service', limit, offset)
  const PATH = BASE_URL + BUSINESS_SIMPLIFIED
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