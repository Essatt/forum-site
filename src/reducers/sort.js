import {
  SORT_COMMENTS_BY,
  SORT_POSTS_BY
} from '../actions/types'

export function commentSort (state = {}, action) {

  switch (action.type) {
    case SORT_COMMENTS_BY:
        return {
          sortBy: action.sortBy,
          way: action.way
        }

    default:
      return state
  }
}

export function postSort (state = {}, action) {

  switch (action.type) {
    case SORT_POSTS_BY:
      return {
        sortBy: action.sortBy,
        way: action.way
      }

    default:
      return state
  }
}
