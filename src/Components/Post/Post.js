import React, { Component } from 'react';
import './Post.css';
import { profiles } from '../../constants';

export default class Post extends Component {
  state = {
    isDeleteBtnDisabled: false,
  };

  render() {
    const { isDeleteBtnDisabled } = this.state;
    const { userId, title, body } = this.props;

    const person = profiles[userId];

    return (
      <div className={`post-wrapper ${isDeleteBtnDisabled && 'deleting-post'}`}>
        <div className='controller-wrapper'>
          <div className='btn edit' onClick={() => this.setState({isEditing: true})}>Edit</div>
          <div className={`btn delete ${isDeleteBtnDisabled && 'not-allowed'}`} onClick={this.delete}>Delete</div>
        </div>
        <div className='person'>
          <img className='avatar' src={person.avatar} alt="avatar" />
          <div className='name'>{person.name}</div>
        </div>
        <div>
          <div className='title'>
            {title}
          </div>
          <div className='body'>
            {body}
          </div>
        </div>
      </div>
    )
  }

  delete = () => {
    this.setState({ isDeleteBtnDisabled: true });
    this.props.deletePost();
  }
};
