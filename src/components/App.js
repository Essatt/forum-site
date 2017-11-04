import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'

import MainPage from './MainPage'
import PostDetail from './PostDetail'
import InitializeRedux from './InitializeRedux'
import NotFound from './NotFound'
import ManagePostForm from './ManagePostForm'

class App extends Component {
  //This component is not connected to Redux store because
  //react router doesnt work with Redux
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <InitializeRedux />
          <Switch>
            <Route exact path="/" render={(props) =>
              <MainPage {...props} />
            }/>
            <Route eaxt path="/404" component={NotFound}/>

            <Route path="/post/edit/:id" component={ManagePostForm}/>

            <Route exact path="/create" component={ManagePostForm}/>

            <Route exact path="/:id" render={(props) => (
              <MainPage {...props}  />
            )}/>
            <Route path="/:category/:id" component={PostDetail} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
