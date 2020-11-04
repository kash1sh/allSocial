import React from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, SignUp, Settings } from './index';
import PropTypes from 'prop-types';
import { getAuthTokenFromLocalStorage } from '../helper/utils';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
// import React, { Component } from 'react'
// const Settings = () => <div>Settings</div>;
// const Home = () => <div>Home</div>;
// const Lagin = () => <div>Lagin</div>;
const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwtDecode(token);
      console.log('user :', user);

      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    // console.log('Props:', this.props);
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          {/* <PostsList posts={posts} /> */}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedIn={auth.isLoggedIn}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>

      // <div className="posts-list">
      //   {posts.map((post) => {
      //     <div className="post-wrapper" key={post._id}>
      //       <div className="post-header">
      //         <div className="post-avatar">
      //           <img
      //             src="https://www.flaticon.com/svg/static/icons/svg/560/560216.svg"
      //             alt="user-image"
      //           ></img>
      //         </div>
      //         <div>
      //           <span className="post-author">{post.user.name}</span>
      //           <span className="post-time">{post.createdAt}</span>
      //         </div>
      //       </div>
      //       <div className="post-content">{post.content}</div>
      //       <div className="posts-actions">
      //         <div className="post-like">
      //           <img
      //             src="https://www.flaticon.com/svg/static/icons/svg/1029/1029183.svg"
      //             alt="likes-icon"
      //           />
      //           <span>{post.likes.length}</span>
      //         </div>

      //         <div className="post-comments-icon">
      //           <img
      //             src="https://www.flaticon.com/svg/static/icons/svg/1380/1380338.svg"
      //             alt="comment-icon"
      //           />
      //           <span>{post.comments.length}</span>
      //         </div>
      //         <div className="post-comment-box">
      //           <input placeholder="Type a Comment" />
      //         </div>
      //       </div>
      //     </div>;
      //   })}
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts, auth: state.auth };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
