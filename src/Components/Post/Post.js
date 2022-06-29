import React, { Component } from 'react';
import './Post.css';
import { profiles } from '../../constants';
import EditPost from '../EditPost';
import showToast from '../../showToast';

export default class Post extends Component {
  state = {
    isDeleteBtnDisabled: false,
    isEditing: false,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.title !== this.props.title) {
      showToast(`Title '${prevProps.title}' was changed on '${this.props.title}'`);
    }
    if (prevProps.userId !== this.props.userId) {
      showToast(`User '${profiles[prevProps.userId].name}' was changed on '${profiles[this.props.userId].name}'`);
    }
    if (prevProps.body !== this.props.body) {
      showToast(`Post body '${prevProps.body}' was changed on '${this.props.body}'`);
    }

    return null;
  };

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      showToast('Title was updated');
    }
    if (this.props.userId !== prevProps.userId) {
      showToast('User was updated');
    }
    if (this.props.body !== prevProps.body) {
      showToast('Post body was updated');
    }
  };

  componentWillUnmount() {
    showToast('Post was deleted');
  }

  render() {
    const { isDeleteBtnDisabled, isEditing } = this.state;
    const { editPost, id, userId, title, body } = this.props;

    const person = profiles[userId];

    if (isEditing) return (
      <EditPost
        id={id}
        userId={userId}
        title={title}
        body={body}
        closeModal={() => this.setState({isEditing: false})}
        editPost={editPost}
      />
    );

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
