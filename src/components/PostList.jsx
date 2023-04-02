import React from "react";
import PostItem from "./PostItem";
import "../styles/Posts.css";

const PostList = ({ posts, title, ...props }) => {
  return (
    <div>
      <h1 className="posts__title">{title}</h1>
      {posts.length ? (
        posts.map((post, index) => (
          <PostItem
            number={index + 1}
            post={post}
            onDeletePost={props.onDeletePost}
            key={post.id}
            setPost={props.setPost}
          />
        ))
      ) : (
        <h1 className="posts__title_none">Posts not found!</h1>
      )}
    </div>
  );
};

export default PostList;
