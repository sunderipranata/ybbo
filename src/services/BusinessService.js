import axios from 'axios'

const BASE_URL = 'https://ybbo-nqyz55lkg.now.sh/api'
// const BASE_URL = 'https://yukbantubisnis.online/api'
const BUSINESS_SIMPLIFIED = '/businesses'
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

export default BusinessService;