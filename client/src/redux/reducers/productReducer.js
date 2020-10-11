import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../types'

const initialState = {
  products: [],
  product: { reviews: [] },
  loading: false,
  error: '',
}

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { ...state, products: action.payload, loading: false }
    case PRODUCT_LIST_FAIL:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: action.payload, loading: false }
    case PRODUCT_DETAILS_FAIL:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}
