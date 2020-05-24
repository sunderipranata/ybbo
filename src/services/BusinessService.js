import axios from 'axios'

let BASE_URL = window.location.href + "api"
if(window.location.href.includes('localhost'))  {
  BASE_URL = 'https://ybbo-8tr5rizl2.now.sh/api'
}

const BUSINESS_SIMPLIFIED = '/businesses'
const BUSINESS_DETAIL = '/businesses'
const BACKERS = '/businesses'
const RANDOM_BUSINESS = '/businesses'
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

BusinessService.getRandom = (category, limit, callback) => {
  const PATH = BASE_URL + RANDOM_BUSINESS
  axios.get(PATH, {
    params: {
      category: category,
      random: true,
      limit: limit
    }
  })
  .then((response) => {
    callback(response)
  })
}

export default BusinessService;