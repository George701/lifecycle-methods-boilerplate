import axios from 'axios';

export const loadPosts = async () => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    return res.data;
  } catch (error) {
    console.error(error)
    return [];
  }
}

export const loadPost = async (id) => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error(error)
    return [];
  }
}

export const deletePostAPI = async id => {
  try {
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res.status;
  } catch (error) {
    console.error(error)
    return 500;
  }
}

export const addPost = async (model) => {
  try {
    const res = await axios.post(`https://jsonplaceholder.typicode.com/posts/`, model);
    return res.status;
  } catch (error) {
    console.error(error)
    return 500;
  }
}

export const updatePost = async (model) => {
  try {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${model.id}`, model);
    return res.status;
  } catch (error) {
    console.error(error)
    return 500;
  }
}