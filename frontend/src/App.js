import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import TiHome from 'react-icons/lib/ti/home'

import './App.css'

import MainView from './components/main-view'
import PostPage from './components/post-page'
import CommentPage from './components/comment-page'

import {
  getCategories,
  getPosts,
  getCategoryPosts,
  setRedirect,
  savePrevPath
} from './actions/index'

const resetScrollTop = () => (window.document.documentElement.scrollTop = 0)

const getFullPath = (props) => `${props.location.pathname}${props.location.search || ''}`

class App extends Component {
  componentDidMount () {
    this.props.dispatch(getCategories())
  }

  componentWillReceiveProps (props) {
    const prevPath = getFullPath(this.props)
    if (getFullPath(props) !== prevPath) {
      this.props.dispatch(savePrevPath(prevPath))
    }
  }

  render () {
    if (this.props.redirect) {
      // this.props.dispatch(setRedirect(''))
      return <Redirect to={this.props.prePath || '/'} />
    }

    return (
      <div className='App'>
        <Route render={(props) => (
          props.location.pathname === '/'
            ? <a className='home-link' onClick={resetScrollTop}><TiHome /></a>
            : <Link to='/' className='home-link'><TiHome /></Link>
        )} />
        <div className='body-container'>
          <Route exact path='/' render={(props) => {
            this.props.dispatch(getPosts())
            return <MainView {...props} />
          }} />
          <Route path='/post/:id?' render={(props) => {
            return <PostPage {...props} />
          }} />
          <Route path='/comment/:id?' render={(props) => {
            return <CommentPage {...props} />
          }} />
          <Route exact path='/category/:category' render={(props) => {
            const category = props.match.params.category
            this.props.dispatch(getCategoryPosts({ category }))
            return <MainView {...props} />
          }} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ env: { redirect, prevPath } }) => ({ redirect, prevPath })

// TODO do not use withRouter
// TODO import dispatch instead of using connect?
export default withRouter(connect(mapStateToProps)(App))
