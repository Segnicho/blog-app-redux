import axios from 'axios'
import { BlogPost } from '../types/post'

const BASE_URL = 'https://jsonplaceholder.typicode.com'


export const createPost = async (data:BlogPost):Promise<BlogPost> =>{
    const res = await axios.post(`${BASE_URL}/posts`, data)
    return res.data
}

export const getAllPosts = async ():Promise<BlogPost[]> =>{
    const res = await axios.get(`${BASE_URL}/posts`)
    return res.data
}

export const updatePost = async (post:BlogPost):Promise<BlogPost> =>{
    const res = await axios.put(`${BASE_URL}/posts/${post.id}`, post)
    return res.data
}

export const deletePost = async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/posts/${id}`);
  };
