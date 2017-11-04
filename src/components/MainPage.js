import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import '../App.css'
import ArrowUp from 'react-icons/lib/fa/arrow-up'
import ArrowDown from 'react-icons/lib/fa/arrow-down'
import Comments from 'react-icons/lib/fa/comments'
import SortDown from 'react-icons/lib/fa/sort-desc'
import Edit from 'react-icons/lib/fa/edit'
import Delete from 'react-icons/lib/fa/trash'
import Add from 'react-icons/lib/fa/plus-circle'

import { myHeaders, api } from '../helper/config'
import {
  sortPosts,
  addPost,
  incrementPost,
  decrementPost,
  deletePost
} from '../actions'

class MainPage extends Component {
  //initiale state to handle fetch requests
  state = {
    myHeaders,
    api
  }

  //move to the correct URL
  handleEditPost(id){
    this.props.history.push(`/post/edit/${id}`)
  }

  //Update Redux store to change the front-end
  //then make the api call to update the database
  handleDeletePost(id){
    const {api, myHeaders} = this.state
    let params = {
      method: 'DELETE',
      headers: myHeaders,
    }
    this.props.deletePost(id)

    fetch(`${api}/posts/${id}`, params
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
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

  //get all the categories and create links from them
  getCategories () {
    var categories = []
    categories.push(
      <ListGroupItem key='/'>
        <Link to='/'>
          All Posts
        </Link>
      </ListGroupItem>
    )
    for(let category in this.props.categories){
      let url = `/${category}`
      categories.push(
        <ListGroupItem key={category}>
          <Link to={url}>
            {category}
          </Link>
        </ListGroupItem>
      )
    }
    return categories
  }

  getPosts () {
    var postArray = []
    if (Object.keys(this.props.posts).length === 0 && this.props.posts.constructor === Object){
    }else{
      this.props.posts.filter((post) => {
        //check if a category selected
        if(this.props.match.params.id !== null && this.props.match.params.id !== undefined){
          if(post.deleted === false){
            return (post.category == this.props.match.params.id)
          }

        //if not show everything
        }else{
          if(post.deleted === false){
            return post
          }
        }
      })
      //loop throug the filtered result set
      .map((post) => {
        var commentsArray = []
        //check if the redux store has been initialized
        if (Object.keys(this.props.comments).length === 0 && this.props.comments.constructor === Object){
        }else{
          this.props.comments.map((comment) => {
            //if the comment is for the correct post, and not deleted, add to the array
            if (comment.parentId === post.id  && comment.deleted == false){
              commentsArray.push(comment)
            }
          })
          postArray.push(
            //List out the posts
            <ListGroupItem key={post.id}>
              <Row className="show-grid" >
                <Link to={'/' + post.category + '/' + post.id}>
                  <Col xs={4} md={4} lg={4} >
                    <div style={{textAlign: 'left'}}>
                      <span className='PostTitle' >{post.title}</span> by {post.author}
                    </div>
                  </Col>
                </Link>
                <Col style={{textAlign: 'center'}} xs={2} md={2} lg={2} >
                  <Comments /> {commentsArray.length}
                </Col>
                <Col style={{textAlign: 'center'}} xs={2} md={2} lg={2} >
                  <button onClick={this.incrementPostScore.bind(this, post.id)}>
                    <ArrowUp />
                  </button>
                  {` ${post.voteScore} `}
                  <button  onClick={this.decrementPostScore.bind(this, post.id)}>
                    <ArrowDown />
                  </button>

                </Col>
                <Col style={{textAlign: 'center'}} xs={2} md={2} lg={2} >
                  <button onClick={this.handleEditPost.bind(this, post.id)}>
                    <Edit />
                  </button>
                </Col>
                <Col style={{textAlign: 'center'}} xs={2} md={2} lg={2} >
                  <button  onClick={this.handleDeletePost.bind(this, post.id)}>
                    <Delete />
                  </button>
                </Col>
              </Row>
            </ListGroupItem>
          )
        }
      })
    }
    return postArray
  }

  handleSortByDate(){
    if (Object.keys(this.props.postSort).length === 0 && this.props.postSort.constructor === Object){
      this.props.sortPosts ("date", "ASC")
    }else{
      if(this.props.postSort.sortBy !== "date"){
        this.props.sortPosts ("date", "ASC")
      }else{
        if(this.props.postSort.way !== "ASC"){
          this.props.sortPosts ("date", "ASC")
        }else{
          this.props.sortPosts ("date", "DESC")
        }
      }
    }
  }

  handleSortByScore(){
    if (Object.keys(this.props.postSort).length === 0 && this.props.postSort.constructor === Object){
      this.props.sortPosts ("score", "ASC")
    }else{
      if(this.props.postSort.sortBy !== "score"){
        this.props.sortPosts ("score", "ASC")
      }else{
        if(this.props.postSort.way !== "ASC"){
          this.props.sortPosts ("score", "ASC")
        }else{
          this.props.sortPosts ("score", "DESC")
        }
      }
    }
  }

  handleAddPost(){
    this.props.history.push(`/create`)
  }

  render() {
    var categories = this.getCategories()
    var posts = this.getPosts()
    var currentLocation = window.location.href
    return (
      <div>
        {// Headers -->
        }
        <Grid style={{paddingTop:'5px'}}>
          <Row className="show-grid">
            <Col xs={3} md={3} >
              <h1>Categories</h1>
            </Col>
            <Col xs={3} md={3} >
              <h1>Posts</h1>
            </Col>
            <Col style={{paddingTop:25, textAlign: 'right'}} xs={2} >
              <button onClick={this.handleAddPost.bind(this)}>
                <h4 >
                  Add <Add size={27} style={{paddingBottom:5}}/>
                </h4>
              </button>
            </Col>
            <Col style={{paddingTop:25, textAlign: 'right'}} xs={2} >
              <button onClick={this.handleSortByScore.bind(this)}>
                <h4>
                  Sort By Score <SortDown style={{verticalAlign: 'center'}}/>
                </h4>
              </button>
            </Col>
            <Col style={{paddingTop:25, textAlign: 'right'}} xs={2} >
              <button onClick={this.handleSortByDate.bind(this)}>
                <h4>
                  Sort By Date <SortDown style={{verticalAlign: 'center'}}/>
                </h4>
              </button>
            </Col>
          </Row>
          {//<-- Headers End
          }

          <Row className="show-grid" style={{paddingTop:'5px'}}>
            <Col xs={4} md={3} >
              <ListGroup>
                {categories}
              </ListGroup>
            </Col>
            <Col xs={8} md={9} >
              <ListGroup>
                {posts}
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({post, comment, postSort, category}) {
  //Sort the posts based before displaying them
  var postL
  if (Object.keys(postSort).length === 0 && postSort.constructor === Object){
    postL = post
  }else if(postSort.sortBy === "date"){
    if (postSort.way === "ASC"){
      postL = post.sort(function(a, b){
        return a.timestamp-b.timestamp
      })

    }else if (postSort.way === "DESC"){
      postL = post.sort(function(a, b){
        return b.timestamp-a.timestamp
      })
    }
  }else if(postSort.sortBy === "score"){
    if (postSort.way === "ASC"){
      postL = post.sort(function(a, b){
        return a.voteScore-b.voteScore
      })
    }else if (postSort.way === "DESC"){
      postL= post.sort(function(a, b){
        return b.voteScore-a.voteScore
      })
    }
  }else{
    postL = post
  }

  return {
    posts: postL,
    postSort,
    comments: comment,
    categories: category
  }
}

export default connect(mapStateToProps, {
  sortPosts,
  incrementPost,
  decrementPost,
  deletePost
})(MainPage)
