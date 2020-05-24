import axios from 'axios'

const BASE_URL = 'https://ybbo-8tr5rizl2.now.sh/api'
// const BASE_URL = 'https://yukbantubisnis.online/api'
const BUSINESS_SIMPLIFIED = '/businesses'
const BUSINESS_DETAIL = '/businesses'
const BACKERS = '/businesses'
let BusinessService = {};

BusinessService.getSimplifiedWithLimitOffset = (limit, offset, category, callback) => {
  const PATH = BASE_URL + BUSINESS_SIMPLIFIED
  const categoryOption = category === 'all' ? null : category
  axios.get(PATH, {
    params: {
      limit: limit,
      offset: offset,
      category: categoryOption
    }
  })
  .then((response) => {
    callback(response)
  })
}

BusinessService.getDetail = (id, callback) => {
  const PATH = BASE_URL + BUSINESS_DETAIL + "/" + id
  axios.get(PATH)
    .then((response) => {
      callback(response)
    })
}

BusinessService.getBackers = (id, limit, offset, callback) => {
  const PATH = BASE_URL + BACKERS + "/" + id + "/backers"
  axios.get(PATH, {
    params: {
      limit: limit,
      offset: offset
    }
  })
  .then((response) => {
    callback(response)
  })
}

export default BusinessService;