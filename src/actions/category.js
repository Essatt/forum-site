import {
  INITIALIZE_POSTS,
  INITIALIZE_COMMENTS,
  INITIALIZE_CATEGORIES
} from './types'

export function initializePosts(posts){
  return {type: INITIALIZE_POSTS, posts}
}

export function initializeComments(comments){
  return {type: INITIALIZE_COMMENTS, comments}
}

export function initializeCategories (categories) {
  return {type: INITIALIZE_CATEGORIES, categories}
}
