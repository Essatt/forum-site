import {
  INITIALIZE_CATEGORIES
} from '../actions/types'

export default function category (state={}, action) {
  const { categories, category, post={}, comment, type } = action

  switch (type) {
    case INITIALIZE_CATEGORIES:
      return categories;

    default:
      return state
  }
}
