import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom'
import TiHome from 'react-icons/lib/ti/home'
import get from 'lodash.get'

import './App.css'

import CategoryList from './components/CategoryList'
import HomePage from './components/HomePage'
import PostPage from './components/PostPage'
import CommentPage from './components/CommentPage'

import {
  getCategories,
  getPosts,
  getCategoryPosts,
  savePrevPath
} from './actions/index'

const resetScrollTop = () => (window.document.documentElement.scrollTop = 0)

const getFullPath = (props) => `${props.location.pathname}${props.location.search || ''}`

class App extends Component {
  componentDidMount () {
    this.props.dispatch(getCategories())
  }

  componentWillReceiveProps (props) {
    // save the previous path in case we need to redirect back
    const prevPath = getFullPath(this.props)
    if (getFullPath(props) !== prevPath) {
      this.props.dispatch(savePrevPath(prevPath))
    }
  }

  render () {
    return (
      <div className='App'>
        {this.props.location.pathname === '/'
          ? <a className='home-link' onClick={resetScrollTop}><TiHome /></a>
          : <Link to='/' className='home-link'><TiHome /></Link>}
        <div className='body-container'>
          <CategoryList location={this.props.location} />
          <Switch>
            <Route exact path='/' render={(props) => {
              this.props.dispatch(getPosts())
              return <HomePage {...props} />
            }} />
            <Route exact path='/post/edit/:id?' render={(props) => {
              const id = get(props, ['match', 'params', 'id'])
              const category = get(props, ['location', 'state', 'category'])
              return <PostPage {...props} id={id} category={category} editMode />
            }} />
            <Route exact path='/post/:id' render={(props) => {
              const id = get(props, ['match', 'params', 'id'])
              return <PostPage {...props} id={id} editMode={false} />
            }} />
            <Route exact path='/comment/edit/:parentId/:id?' render={(props) => {
              const { parentId, id } = get(props, ['match', 'params'], {})
              return <CommentPage {...props} parentId={parentId} id={id} />
            }} />
            <Route exact path='/:category/:id?' render={(props) => {
              const { id, category } = get(props, ['match', 'params'], {})
              if (id) {
                return <PostPage {...props} id={id} editMode={false} />
              } else {
                this.props.dispatch(getCategoryPosts({ category }))
                return <HomePage {...props} category={category} />
              }
            }} />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ prevPath }) => ({ prevPath })

export default withRouter(connect(mapStateToProps)(App))
