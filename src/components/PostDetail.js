import React, { Component } from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
import ArrowUp from 'react-icons/lib/fa/arrow-up'
import ArrowDown from 'react-icons/lib/fa/arrow-down'
import SortDown from 'react-icons/lib/fa/sort-desc'
import Edit from 'react-icons/lib/fa/edit'
import Delete from 'react-icons/lib/fa/trash'
import Add from 'react-icons/lib/fa/plus-circle'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Modal from 'react-modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import uuidv4 from 'uuid/v4'
import FieldGroup from './FieldGroup'

import { myHeaders, api } from '../helper/config'
import {
  sortComments,
  addComment,
  editComment,
  incrementPost,
  incrementComment,
  decrementPost,
  decrementComment,
  deletePost,
  deleteComment,
  editPost
} from '../actions'

class PostDetail extends Component {

  state = {
    myHeaders,
    api,
    createCommentModalOpen: false,
    editCommentModalOpen: false,
    modalBody: '',
    modalAuthor: '',
    parentId: null,
    modelCommentId: null
  }

  //check if the category in the URL is correct
  //check if the post has been deleted
  componentDidMount(){
    this.checkIfDeleted()
    this.checkIfCategoryTrue()
  }
  componentWillReceiveProps(){
    this.checkIfDeleted()
    this.checkIfCategoryTrue()
  }

  //close all modals
  closeCommentModal(){
    this.setState(() => ({
      createCommentModalOpen: false,
      editCommentModalOpen: false,
      modalBody: '',
      modalAuthor: '',
      modelCommentId: null,
    }))
  }

  //handle form input changes
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleEditFormSubmit(){
    const {myHeaders, api, modalBody, parentId, modelCommentId} = this.state
    const {params} = this.props.match
    let body = modalBody
    let id = modelCommentId
    if (body === '') {
      alert("Please fill all the form fields and try again.");
      return
    }
    var timestamp = Date.now()

    let parameters = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({ timestamp, body }),
    }
    this.props.editComment(id, timestamp, body)

    fetch(`${api}/comments/${id}`, parameters
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
  }

  handleCreateFormSubmit(){
    const {myHeaders, api, modalBody, modalAuthor, parentId} = this.state
    const {params} = this.props.match
    let body = modalBody
    let author = modalAuthor
    if (body === '' || author === '') {
      alert("Please fill all the form fields and try again.");
      return
    }
    var timestamp = Date.now()
    var id = uuidv4()

    let parameters = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ id, timestamp, body, author, parentId }),
    }
    this.props.addComment(id, timestamp, body, author, parentId)

    fetch(`${api}/comments`, parameters
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
    alert("You have successfully created the comment.")
  }

  checkIfDeleted(){
    if(typeof this.props.post !== 'undefined' && this.props.post.length > 0) {
      this.props.post.filter((post) => {
        return post.id == this.props.match.params.id
      }).map((post) => {
        if(post.deleted == true ){
          this.props.history.push(`/404`)
        }
      })
    }
  }

  checkIfCategoryTrue(){
    if(typeof this.props.post !== 'undefined' && this.props.post.length > 0) {
      this.props.post.filter((post) => {
        return post.id == this.props.match.params.id
      }).map((post) => {
        if(this.props.match.params.category != post.category ){
          this.props.history.push(`/404`)
        }
      })
    }
  }

  handleEditPost(id){
    this.props.history.push(`/post/edit/${id}`)
  }

  handleDeletePost(id){
    const {api, myHeaders} = this.state
    let params = {
      method: 'DELETE',
      headers: myHeaders,
    }
    this.props.deletePost(id)

    fetch(`${api}/posts/${id}`, params
    )
    this.props.history.push(`/`)
  }

  handleEditComment(id){
    var body
    var loop = [...this.props.comment]
    loop.filter((comment, indexL) => {
      if (comment.id === id){
        body = comment.body
      }
      return comment.id === id
    })
    this.setState({
      modelCommentId: id,
      editCommentModalOpen: true,
      modalBody: body
    })
  }

  handleDeleteComment(id){
    const {api, myHeaders} = this.state
    let params = {
      method: 'DELETE',
      headers: myHeaders,
    }
    this.props.deleteComment(id)

    fetch(`${api}/comments/${id}`, params
    )
  }

  handleCreateComment(parentId){
    this.setState(() => ({
      createCommentModalOpen: true,
      parentId
    }))
  }

  incrementPostScore(id){
    const {api, myHeaders} = this.state
    let params = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ option: 'upVote' }),
    }
    this.props.incrementPost(id)

    fetch(`${api}/posts/${id}`, params
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
  }

  decrementPostScore(id){
    const {api, myHeaders} = this.state
    let params = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ option: 'downVote' }),
    }
    this.props.decrementPost(id)

    fetch(`${api}/posts/${id}`, params
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
  }

  incrementCommentScore(id){
    const {api, myHeaders} = this.state
    let params = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ option: 'upVote' }),
    }
    this.props.incrementComment(id)

    fetch(`${api}/comments/${id}`, params
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
  }

  decrementCommentScore(id){
    const {api, myHeaders} = this.state
    let params = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ option: 'downVote' }),
    }
    this.props.decrementComment(id)

    fetch(`${api}/comments/${id}`, params
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
  }

  getPostDetail(){
    var localPost
    var postFilter
    if (Object.keys(this.props.post).length === 0 && this.props.post.constructor === Object){

    }else{
      postFilter = this.props.post.filter((postL) => {
        if(this.props.match.params.id !== null && this.props.match.params.id !== undefined){

          return postL.id === this.props.match.params.id
        }else{

          return postL
        }
      }).map((post) => {
        var time = moment(post.timestamp).format('MMMM Do YYYY');
        var comment = this.getComments(post)
        localPost =
          <div>
            <Row className="show-grid">

              <Col xs={6} >
                <span style={{fontSize: 30, fontWeight: 700}}>
                  {`${post.title} `}
                </span>
                <span style={{fontSize: 25, fontWeight: 600}}>
                   {`by ${post.author}`}
                </span>
              </Col>
              <div style={{paddingTop: 17}}>
                <Col xs={2} >
                  <button onClick={() => this.incrementPostScore(post.id)}>
                    <ArrowUp />
                  </button>
                  {` ${post.voteScore} `}
                  <button onClick={() => this.decrementPostScore(post.id)}>
                    <ArrowDown />
                  </button>
                </Col>
                <Col xs={2} >
                  {time}
                </Col>
                <Col xs={1} >
                  <button onClick={() => this.handleEditPost(post.id)}>
                    <Edit />
                  </button>
                </Col>
                <Col xs={1} >
                  <button onClick={() => this.handleDeletePost(post.id)}>
                    <Delete />
                  </button>
                </Col>
              </div>
            </Row>
            <Row className="show-grid">
              <ListGroup>
                <ListGroupItem>
                  {`${post.body}`}
                </ListGroupItem>
              </ListGroup>
            </Row>
            <Row>
              {comment}
            </Row>
        </div>
      })
      if (localPost === undefined){
        this.props.history.push('/404')
      }
      return localPost
    }
  }

  getComments(post){
    var commentArray = []
    if (Object.keys(this.props.comment).length === 0 && this.props.comment.constructor === Object){

    }else{
      let commentsFilter = this.props.comment.filter((commentL) => {
        if (commentL.deleted === false) {
          return (post.id === commentL.parentId)
        }
      })
      commentArray.push(
        <Row key={post.id}>
          <Col xs={6} >
            <span style={{fontSize: 25, fontWeight: 600}}>
              {`Comments ${commentsFilter.length}`}
            </span>
          </Col>
          <Col xs={2} >
            <button onClick={() => this.handleCreateComment(post.id)}>
              <h4 >
                Add <Add size='20' style={{verticalAlign: 'bottom', paddingBottom:-15}} />
              </h4>
            </button>
          </Col>
          <Col xs={2} >
            <button onClick={this.handleSortByScore.bind(this)}>
              <h4>
                Sort By Date <SortDown style={{verticalAlign: 'center'}}/>
              </h4>
            </button>
          </Col>
          <Col xs={2} >
            <button onClick={this.handleSortByDate.bind(this)}>
              <h4 >
                Sort By Score <SortDown style={{verticalAlign: 'center'}}/>
              </h4>
            </button>
          </Col>
        </Row>
      )
      commentsFilter.map((comment) => {
        commentArray.push(
          <ListGroup key={comment.id}>
            <ListGroupItem>
              <Row>
                <Col xs={8}>
                  <b>
                    {`Author: ${comment.author}`}
                  </b>
                </Col>
                <Col xs={2}>
                  <button onClick={this.incrementCommentScore.bind(this, comment.id)}>
                    <ArrowUp />
                  </button>
                  {` ${comment.voteScore} `}
                  <button onClick={() => this.decrementCommentScore(comment.id)}>
                    <ArrowDown />
                  </button>
                </Col>
                <Col xs={1} >
                  <button onClick={() => this.handleEditComment(comment.id)}>
                    <Edit />
                  </button>
                </Col>
                <Col xs={1} >
                  <button onClick={() => this.handleDeleteComment(comment.id)}>
                    <Delete />
                  </button>
                </Col>
              </Row>
            <Row style={{paddingRight:15, paddingLeft:15, textAlign:'left'}}>
              {comment.body}
            </Row>
            </ListGroupItem>
          </ListGroup>
        )
      })
    }
    return commentArray
  }

  handleSortByDate(){
    if (Object.keys(this.props.commentSort).length === 0 && this.props.commentSort.constructor === Object){
      this.props.sortComments ("date", "ASC")
    }else{
      if(this.props.commentSort.sortBy !== "date"){
        this.props.sortComments ("date", "ASC")
      }else{
        if(this.props.commentSort.way !== "ASC"){
          this.props.sortComments ("date", "ASC")
        }else{
          this.props.sortComments ("date", "DESC")
        }
      }
    }
  }

  handleSortByScore(){
    if (Object.keys(this.props.commentSort).length === 0 && this.props.commentSort.constructor === Object){
      this.props.sortComments ("score", "ASC")
    }else{
      if(this.props.commentSort.sortBy !== "score"){
        this.props.sortComments ("score", "ASC")
      }else{
        if(this.props.commentSort.way !== "ASC"){
          this.props.sortComments ("score", "ASC")
        }else{
          this.props.sortComments ("score", "DESC")
        }
      }
    }
  }

  render() {
    let post = this.getPostDetail()
    const {modalBody, modalAuthor, createCommentModalOpen, editCommentModalOpen} = this.state
    return (
      <div>
        <Grid key='mainGrid' style={{paddingTop:'5px', textAlign: 'left'}}>
          {post}
          <Modal key='editModal' overlayClassName='overlay' isOpen={editCommentModalOpen} onRequestClose={this.closeCommentModal.bind(this)} contentLabel='Modal'>
            <div>
              <form onSubmit={this.handleEditFormSubmit.bind(this)}>
                <Grid key='editformGrid' style={{paddingTop:'5px', textAlign: 'left'}}>
                  <Row key='editIntro'>
                    <h3>
                      Edit Comment
                    </h3>
                  </Row>
                  <Row key='editBody'>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Body</ControlLabel>
                      <FormControl
                        name="modalBody"
                        value={this.state.modalBody}
                        componentClass="textarea"
                        placeholder="The body of the post..."
                        onChange={this.handleInputChange.bind(this)} />
                    </FormGroup>
                  </Row>
                  <Row key='editButton'>
                    <Button type="submit">
                      Edit Comment
                    </Button>
                    {"  "}
                    <Button type="submit" onClick={this.closeCommentModal.bind(this)}>
                      Cancel
                    </Button>
                  </Row>
                </Grid>
              </form>
            </div>
          </Modal>
        </Grid>

        <Modal overlayClassName='overlay' isOpen={createCommentModalOpen} onRequestClose={this.closeCommentModal.bind(this)} contentLabel='Modal'>
          <div>
            <form onSubmit={this.handleCreateFormSubmit.bind(this)}>
              <Grid key='formGrid' style={{paddingTop:'5px', textAlign: 'left'}}>
                <Row key='intro'>
                  <h3>
                    Create Comment
                  </h3>
                </Row>
                <Row key='title'>
                  <FieldGroup
                    id="postAuthor"
                    type="text"
                    label="Author"
                    placeholder="Author..."
                    name="modalAuthor"
                    value={this.state.modalAuthor}
                    onChange={this.handleInputChange.bind(this)}
                  />
                </Row>
                <Row key='body'>
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Body</ControlLabel>
                    <FormControl
                      name="modalBody"
                      value={this.state.modalBody}
                      componentClass="textarea"
                      placeholder="The body of the post..."
                      onChange={this.handleInputChange.bind(this)} />
                  </FormGroup>
                </Row>
                <Row key='createbutton'>
                  <Button type="submit">
                    Create Comment
                  </Button>
                  {"  "}
                  <Button type="submit" onClick={this.closeCommentModal.bind(this)}>
                    Cancel
                  </Button>
                </Row>
              </Grid>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({post, comment, commentSort}) {
  //sort comments before displaying them
  var commentL
  if (Object.keys(commentSort).length === 0 && commentSort.constructor === Object){
    commentL = comment
  }else if(commentSort.sortBy === "date"){
    if (commentSort.way === "ASC"){
      commentL= comment.sort(function(a, b){
        return a.timestamp-b.timestamp
      })
    }else if (commentSort.way === "DESC"){
      commentL= comment.sort(function(a, b){
        return b.timestamp-a.timestamp
      })
    }
  }else if(commentSort.sortBy === "score"){
    if (commentSort.way === "ASC"){
      commentL= comment.sort(function(a, b){
        return a.voteScore-b.voteScore
      })
    }else if (commentSort.way === "DESC"){
      commentL= comment.sort(function(a, b){
        return b.voteScore-a.voteScore
      })
    }
  }else{
    commentL = comment
  }

  return {
    comment: commentL,
    commentSort,
    post
  }
}

function mapDispatchToProps(dispatch){
  return {
    sortComments: (sortBy, way) => dispatch(sortComments(sortBy, way)),
    incrementPost: (id) => dispatch(incrementPost(id)),
    decrementPost: (id) => dispatch(decrementPost(id)),
    incrementComment: (id) => dispatch(incrementComment(id)),
    decrementComment: (id) => dispatch(decrementComment(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    editComment: (id, timestamp, body) => dispatch(editComment(id, timestamp, body)),
    addComment: (id, timestamp, body, author, parentId) => dispatch(addComment(id, timestamp, body, author, parentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
