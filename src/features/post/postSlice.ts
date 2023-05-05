import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "../../types/post";

import { createPost, updatePost, deletePost, getAllPosts } from "../../api";
import { AppThunk, RootState } from "../store";

interface BlogState {
    posts: BlogPost[],
    error: null | string,
    loading: boolean
} 

const initialState: BlogState = {
    posts: [],
    error: null,
    loading: false
};

const blogSlice = createSlice(
    {name: "posts",
    initialState,
    reducers: {
        getPostsStart: (state) =>{
            state.loading = true;
        },
        getPostsSuccess: (state, action:PayloadAction<BlogPost[]>) =>{
            state.posts = action.payload
            state.loading = false
            state.error = null;
        },
        getPostsFailure: (state, action: PayloadAction<string>) =>{
            state.error = action.payload
        },

        createPostStart: (state) =>{
            state.loading = true
        },
        createPostSuccess: (state, action: PayloadAction<BlogPost>) =>{
            state.posts.push(action.payload)
            state.loading = false
        },
        createPostFailure: (state, action: PayloadAction<string>) =>{
            state.error = action.payload
        },

        updatePostStart: (state) =>{
            state.loading = true
        },
        updatePostSuccess: (state, action:PayloadAction<BlogPost>) =>{
            state.loading = false
            const idx = state.posts.findIndex(post => post.id === action.payload.id)
            state.posts[idx] = action.payload

        },
        updatePostFailure: (state, action:PayloadAction<string>) =>{
            state.loading = false
            state.error = action.payload
        },
        deletePostStart: state => {
            state.loading = true;
            state.error = null;
          },
          deletePostSuccess: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
            state.loading = false;
          },
          deletePostFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          },



        // addPost : (state, action:PayloadAction<BlogPost>) =>{
        //     state.posts.push(action.payload);
        // },
        // updatePost : (state, action:PayloadAction<BlogPost>) => {
        //     const {id, title, desc } = action.payload;
        //     const findPost = state.posts.find(post => post.id === id);
        //     if (findPost) {
        //         findPost.title = title;
        //         findPost.desc = desc;
        //     }
        // },
        // deletePost : (state, action:PayloadAction<string>) => {
        //     state.posts = state.posts.filter((post) => post.id !== action.payload)
        //  }
    }
}
)


export const { 
    getPostsStart,
    getPostsSuccess,
    getPostsFailure,

    createPostStart,
    createPostSuccess,
    createPostFailure,

    updatePostStart,
    updatePostSuccess,
    updatePostFailure,

    deletePostStart,
    deletePostSuccess,
    deletePostFailure

} =  blogSlice.actions

export const fetchPosts = ():AppThunk => async (dispatch) => {
    try {
               dispatch(getPostsStart())
               const posts = await getAllPosts()
               dispatch(getPostsSuccess(posts));
    } catch (error:any) {
        dispatch(getPostsFailure(error.message));
    }
}

export const addPosts = (post:BlogPost): AppThunk => async dispatch => {
    try {
        dispatch(createPostStart())
        const newPost = await createPost(post);
        dispatch(createPostSuccess(newPost))
    } catch (error:any) {
        dispatch(createPostFailure(error.message));
    }
}

export const updateAPost = (post:BlogPost): AppThunk => async dispatch => {
    try {
        dispatch(updatePostStart())
        const updatedPost = await updatePost(post);
        dispatch(updatePostSuccess(updatedPost))
    } catch (error:any) {
        dispatch(updatePostFailure(error.message));
    }
}

export const deleteAPost = (id:string):AppThunk => async dispatch =>{
    try {
        dispatch(deletePostStart());
        await deletePost(id);
        dispatch(deletePostSuccess(id));
    } catch (error:any) {
        dispatch(deletePostFailure(error.message));
    }
}

export const selectPosts = (state: RootState) => state.posts.posts
export const selectLoading = (state: RootState) => state.posts.loading
export const selectError = (state: RootState) => state.posts.error


export default blogSlice.reducer