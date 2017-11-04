import {
  INCREMENT_COMMENT,
  DECREMENT_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  SORT_COMMENTS_BY
} from './types'

export function incrementComment (cid) {
  return {type: INCREMENT_COMMENT, cid}
}

export function decrementComment (cid) {
  return {type: DECREMENT_COMMENT, cid}
}

export function editComment (cid, timestamp, body) {
  return {type: EDIT_COMMENT, cid, timestamp, body}
}

export function deleteComment (cid) {
  return {type: DELETE_COMMENT, cid}
}

export function addComment (id, timestamp, body, author, parentId) {
  return {type: ADD_COMMENT, id, timestamp, body, author, parentId}
}

export function sortComments(sortBy, way) {
  return {type: SORT_COMMENTS_BY, sortBy, way}
}
