import {combineReducers} from 'redux'
import * as types from '../actions/types'
import category from './category'
import post from './post'
import comment from './comment'
import { postSort, commentSort } from './sort'

export default combineReducers({category, post, comment, postSort, commentSort})
