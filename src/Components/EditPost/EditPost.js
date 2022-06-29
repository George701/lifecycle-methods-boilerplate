import React, { Component } from 'react';
import './EditPost.css';
import { profiles } from '../../constants';
import showToast from '../../showToast';

export class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // userId: props.userId,
      // id: props.id,
      // title: props.title,
      // body: props.body,
      userId: 0,
      id: null,
      title: '',
      body: '',
      btnDisabled: false,
    }
  };

  componentDidMount() {
    if (this.props.id) {
      this.setState({
        id: this.props.id,
        userId: this.props.userId,
        title: this.props.title,
        body: this.props.body
      })
    }
  };

  render() {
    const { id, title, body, userId, btnDisabled } = this.state;
    const { closeModal } = this.props;

    return (
      <div className='post-wrapper'>

        <div className='form-row'>
          <label htmlFor="User">User</label>
          <select
            className='text-inputs selector-input'
            value={userId}
            name='userId'
            onChange={this.onChangeUser}
          >
              {profiles.map(profile => {
                  return <option key={profile.id} value={profile.id}>{profile.name}</option>
              })};
          </select>
        </div>

        <div className='form-row'>
          <label htmlFor="title">Title</label>
          <input
            className='text-inputs'
            type='text'
            name='title'
            value={title}
            onChange={this.onChange}
          />
        </div>

        <div className='form-row'>
          <label htmlFor="body">Body</label>
          <textarea
            className='text-inputs body-input'
            name='body'
            value={body}
            onChange={this.onChange}
          />
        </div>

        <div className='form-btn-wrapper'>
          <button className='controller-btn apply-btn' onClick={() => this.checkAndSave()} disabled={btnDisabled}>
            {!!id ? 'Apply' : 'Create'}
          </button>
          <button className='controller-btn cancel-btn' onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </div>
    )
  };

  onChangeUser = e => this.setState({userId: parseInt(e.target.value)});
  
  onChange = e => this.setState({[e.target.name]: e.target.value});

  checkAndSave = () => {
    this.setState({ btnDisabled: true });
    const { id, title, body, userId } = this.state;
    const { editPost, closeModal } = this.props;

    if (userId === 0) {
      showToast('Please select user', true);
    }

    if (title.length === 0) {
      showToast('Please enter post title', true);
    }

    if (body.length === 0) {
      showToast('Please enter post body', true);
    }

    if (userId !== 0 && title.length !== 0 && body.length !== 0) {
      closeModal();
      editPost(id, userId, title, body)
    }

    this.setState({ btnDisabled: false });
  };

};

export default EditPost;