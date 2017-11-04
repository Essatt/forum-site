import React, {Component} from 'react'
import {connect} from 'react-redux'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import uuidv4 from 'uuid/v4'
import FieldGroup from './FieldGroup'

import { myHeaders, api } from '../helper/config'
import {
  addPost,
  editPost
} from '../actions'

class ManagePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      body: "",
      title: "",
      author: "",
      type: "",
      category: "react",
      myHeaders,
      api
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    //determine if the action will be editing or creating an issue
    if(this.props.match.params.id !== null && this.props.match.params.id !== undefined){
      this.setState(() => ({id: this.props.match.params.id, type: 'edit'}))
      this.getPostDetails(this.props)
    }else{
      this.setState(() => ({id: null, type: ''}))
    }
  }

  componentWillReceiveProps(newProps){
    this.getPostDetails(newProps)
  }

  getPostDetails(props){
    if (Object.keys(props.post).length === 0 && props.post.constructor === Object){

    }else{
      props.post.filter((postL) => {
        return postL.id === props.match.params.id
      }).map((post) =>{
        this.setState(() => (
          {
            id: post.id,
            body: post.body,
            author: post.author,
            title: post.title,
            category: post.category
          }
        ))
      })
    }

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitEditPost(){
    const {myHeaders, api, title, body, id} = this.state
    if (title === '' || body === '') {
      alert("Please fill all the form fields and try again.");
      return
    }
    let params = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({ title, body }),
    }
    this.props.editPost(id, title, body)
    fetch(`${api}/posts/${id}`, params
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
    alert("You have successfully edited the post. You will now be directed to the main page.")
    this.props.history.push(`/`)
  }

  submitCreatePost(){
    const {myHeaders, api, title, body, author, category} = this.state
    if (title === '' || body === '' || author === '' || category === '') {
      alert("Please fill all the form fields and try again.");
      return
    }
    var timestamp = Date.now()
    var id = uuidv4()
    let params = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ id, timestamp, title, body, author, category }),
    }
    this.props.addPost(id, timestamp, title, body, author, category)

    fetch(`${api}/posts`, params
    ).then(resp => resp.json())
    .then(responses => {
      //console.log(responses)
    })
    alert("You have successfully created the post. You will now be directed to the main page.")
    this.props.history.push(`/`)
  }

  render(){
    var intro
    var buttonText
    var authorL
    var categoryL
    var button
    const {id, body, type, title, category, author} = this.state

    if (type === ''){
      intro = 'Create Post'
      buttonText = 'Create Post'
      authorL = (
        <Row key='author' className="show-grid">
          <FieldGroup
            id="postAuthor"
            type="text"
            label="Author"
            placeholder="Author's Name..."
            name="author"
            value={author}
            onChange={this.handleInputChange}
          />
        </Row>
      )
      categoryL = (
        <Row key='category'>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="category"
              value={category}
              onChange={this.handleInputChange}
            >
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </FormControl>
          </FormGroup>
        </Row>
      )
      button = (
        <Row key='createbutton'>
          <Button type="submit" onClick={this.submitCreatePost.bind(this)}>
            {buttonText}
          </Button>
        </Row>
      )

    }else{
      intro = 'Edit Post'
      buttonText = 'Edit Post'
      authorL = ''
      categoryL = ''
      button = (
        <Row key='editbutton'>
          <Button type="submit" onClick={this.submitEditPost.bind(this)}>
            {buttonText}
          </Button>
        </Row>
      )
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <Grid key='formGrid' style={{paddingTop:'5px', textAlign: 'left'}}>
          <Row key='intro'>
            <h3>
              {intro}
            </h3>
          </Row>
          <Row key='title'>
            <FieldGroup
              id="postTitle"
              type="text"
              label="Title"
              placeholder="Title..."
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </Row>
          {authorL}
          {categoryL}
          <Row key='body'>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Body</ControlLabel>
              <FormControl
                name="body"
                value={this.state.body}
                componentClass="textarea"
                placeholder="The body of the post..."
                onChange={this.handleInputChange} />
            </FormGroup>
          </Row>
          {button}
        </Grid>
      </form>
    )
  }
}

function mapStateToProps({post}){
  return {post}
}

function mapDispatchToProps(dispatch){
  return {
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    addPost: (id, timestamp, title, body, author, category) => dispatch(addPost(id, timestamp, title, body, author, category))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ManagePostForm);
