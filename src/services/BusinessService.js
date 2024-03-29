import axios from 'axios'

let BASE_URL = `${window.location.origin.toString()}/api`
if(window.location.href.includes('localhost'))  {
  BASE_URL = 'https://ybbo-1jn59cl5h.vercel.app/api'
  // BASE_URL = 'https://yukbantubisnisonline.com/api'
}
const BUSINESS_SIMPLIFIED = '/businesses'
const BUSINESS_DETAIL = '/businesses'
const BACKERS = '/businesses'
const RANDOM_BUSINESS = '/businesses'
const FEATURED_BUSINESS = '/businesses/featured'
const SITEMAP = '/businesses'
const BUSINESS_FEED = '/businesses/feed'
let BusinessService = {};

BusinessService.getSimplifiedWithLimitOffset = (limit, offset, category, skip, callback) => {
  const PATH = BASE_URL + BUSINESS_SIMPLIFIED
  const categoryOption = category === 'all' ? null : category
  axios.get(PATH, {
    params: {
      limit: limit,
      offset: offset,
      category: categoryOption,
      skip: skip
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

BusinessService.submitBusinessDetailForm = (businessId, socialMediaAccount, isAnonymous, comment, callbackOnSuccess, callbackOnError) => {
  const PATH = BASE_URL + BUSINESS_DETAIL + "/backers"
  axios.post(PATH, {
      business_id: businessId,
      username: socialMediaAccount,
      account_type:"instagram",
      anonym: isAnonymous,
      comment: comment
  })
    .then((response) => {
      callbackOnSuccess(response)
    })
    .catch((error) => {
      console.log(error)
      callbackOnError(error.response)
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

BusinessService.getFeatured = (callback) => {
  const PATH = BASE_URL + FEATURED_BUSINESS
  axios.get(PATH)
  .then((response) => {
    callback(response)
  })
}

BusinessService.getSitemap = (limit, skip, callback) => {
  const PATH = BASE_URL + SITEMAP
  axios.get(PATH, {
    params: {
      limit: limit,
      skip: skip,
      site_map: true
    }
  })
  .then((response) => {
    callback(response)
  })
}

BusinessService.getFeed = (limit, skip, category, callback) => {
  const PATH = BASE_URL + BUSINESS_FEED
  const categoryOption = category === 'all' ? null : category
  axios.get(PATH, {
    params: {
      limit: limit,
      category: categoryOption,
      skip: skip
    }
  })
  .then((response) => {
    callback(response)
  })
}

export default BusinessService;