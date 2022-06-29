import React, { Component } from 'react';
import './App.css';
import { loadPosts } from './services';
import Post from './Components/Post';
import EditPost from './Components/EditPost';

export default class App extends Component {
  state = {
    creatingNewPost: false,
    loadingPosts: true,
    posts: []
  };

  async componentDidMount() {
    const posts = await loadPosts();
    if (posts.length !== 0) {
      posts.sort((a, b) => {
        return b.id - a.id;
      })
      this.setState({ posts })
    }
    this.setState({ loadingPosts: false });
  }
  
  render() {
    const { posts, loadingPosts, creatingNewPost } = this.state;
    return (
      <div className='wrapper'>
        {
          creatingNewPost
          ? <EditPost closeModal={() => this.setState({ creatingNewPost: false})} editPost={this.editPost}/>
          : (
            <div className='new-post'>
              <div className='btn' onClick={() => this.setState({ creatingNewPost: true})}>
                New
              </div>
            </div>
          )
        }
        { loadingPosts && <div>loading posts...</div> }
        { (!loadingPosts && posts.length === 0) && <div>There is no posts yet</div> }
        { (!loadingPosts  && posts.length !== 0)
          && posts.map(post => (
            <Post key={post.id} {...post} deletePost={() => this.deletePost(post.id)} editPost={this.editPost}/>)
          )
        }
      </div>
    )
  }
}
