import * as api from '../api-fetch'

import GET_CATEGORIES from './types'

const thunk = (request, type) => dispatch => {
  return request().then(data => dispatch({ type, data }))
}

const getCategories = thunk(api.getCategories, GET_CATEGORIES)

export default getCategories
