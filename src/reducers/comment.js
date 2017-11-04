import {
  INITIALIZE_COMMENTS,
  INCREMENT_COMMENT,
  DECREMENT_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT
} from '../actions/types'

export default function comment (state = {}, action) {
  var index
  var commentIndex
  var returnValue
  const {timestamp, body, id, parentId,author, type} = action

  switch (type) {
    case INITIALIZE_COMMENTS:
      returnValue = [...state]
      action.comments.map((comment) => {
        returnValue = [...returnValue, comment]
      })
      return returnValue

    case INCREMENT_COMMENT:
      commentIndex = state.filter((comment, indexL) => {
        if (comment.id === action.cid){
          index = indexL
        }
        return comment.id === action.cid
      })
      returnValue = [...state]
      returnValue[index].voteScore += 1
      return returnValue

    case DECREMENT_COMMENT:
      commentIndex = state.filter((comment, indexL) => {
        if (comment.id === action.cid){
          index = indexL
        }
        return comment.id === action.cid
      })
      returnValue = [...state]
      returnValue[index].voteScore -= 1
      return returnValue

    case EDIT_COMMENT:
       commentIndex = state.filter((comment, indexL) => {
        if (comment.id === action.cid){
          index = indexL
        }
        return comment.id === action.cid
      })
      returnValue = [...state]
      returnValue[index].timestamp = timestamp
      returnValue[index].body = body
      return returnValue

    case DELETE_COMMENT:
      commentIndex = state.filter((comment, indexL) => {
        if (comment.id === action.cid){
          index = indexL
        }
        return comment.id === action.cid
      })
      returnValue = [...state]
      returnValue[index].deleted = true
      return returnValue

    case ADD_COMMENT:
      returnValue = [...state]
      returnValue.push({
        id,
        timestamp,
        author,
        body,
        parentId,
        voteScore: 0,
        deleted: false
      })
      return returnValue

    default:
      return state
  }
}
