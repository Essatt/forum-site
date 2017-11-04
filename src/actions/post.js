import {
  INCREMENT_POST,
  DECREMENT_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_POST,
  SORT_POSTS_BY
} from './types'

export function incrementPost (pid) {
  return {type: INCREMENT_POST, pid}
}

export function decrementPost (pid) {
  return {type: DECREMENT_POST, pid}
}

export function editPost (pid, title, body) {
  return {type: EDIT_POST, pid, title, body}
}

export function deletePost (pid) {
  return {type: DELETE_POST, pid}
}

export function addPost (id, timestamp, title, body, author, category) {
  return {type: ADD_POST, id, timestamp, title, body, author, category}
}

export function sortPosts(sortBy, way) {
  return {type: SORT_POSTS_BY, sortBy, way}
}
