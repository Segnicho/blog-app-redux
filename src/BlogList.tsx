import React, { useEffect } from "react";

import {
  selectPosts,
  selectError,
  selectLoading,
  fetchPosts,
} from "./features/post/postSlice";

import { useDispatch, useSelector } from "react-redux";
import { BlogPost } from "./types/post";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./features/store";
import { AnyAction } from "@reduxjs/toolkit";

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

const BlogList = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  return (
    <div className="ml-10">
      <h1> BlogList </h1>
      <div className="flex flex-col gap-3 justify-center">
        {posts.map((post: BlogPost) => (
          <div>
            <h1>{post.title} </h1>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
