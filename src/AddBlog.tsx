import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BlogPost } from './types/post';
// import { BlogPost } from './blogSlice';

interface Props {
  onSubmit: (post: BlogPost) => void;
  post?: BlogPost;
}

const BlogPostForm: React.FC<Props> = ({ onSubmit, post }) => {
  const [title, setTitle] = useState(post?.title ?? '');
  const [description, setDescription] = useState(post?.description ?? '');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: BlogPost = {
      id: post?.id ?? Date.now().toString(),
      title,
      description,
    };
    onSubmit(newPost);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{post ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default BlogPostForm;
