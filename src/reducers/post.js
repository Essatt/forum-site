import {
  INITIALIZE_POSTS,
  INCREMENT_POST,
  DECREMENT_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_POST
} from '../actions/types'

export default function post (state = {}, action) {
  var index
  var postIndex
  var returnValue
  const {id, timestamp, title, body, author, category, type} = action

  switch (type) {
    case INITIALIZE_POSTS:
      return action.posts

    case INCREMENT_POST:
      postIndex = state.filter((post, indexL) => {
        if (post.id === action.pid){
          index = indexL
        }
        return post.id === action.pid
      })
      returnValue = [...state]
      returnValue[index].voteScore += 1
      return returnValue

    case DECREMENT_POST:
      index
      postIndex = state.filter((post, indexL) => {
        if (post.id === action.pid){
          index = indexL
        }
        return post.id === action.pid
      })
      returnValue = [...state]
      returnValue[index].voteScore -= 1
      return returnValue

    case EDIT_POST:
      returnValue = [...state]
      index
      postIndex = state.filter((post, indexL) => {
        if (post.id === action.pid){
          index = indexL
        }
        return post.id === action.pid
      })
      returnValue[index].title = title
      returnValue[index].body = body
      return returnValue

    case DELETE_POST:
      index
      postIndex = state.filter((post, indexL) => {
        if (post.id === action.pid){
          index = indexL
        }
        return post.id === action.pid
      })
      returnValue = [...state]
      returnValue[index].deleted = true
      return returnValue

    case ADD_POST:
      returnValue = [...state]
      returnValue.push({
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore: 0,
        deleted: false
      })
      return returnValue

    default:
      return state
  }
}
