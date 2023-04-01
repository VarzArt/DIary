import React from "react";
import MyButton from "./UI/button/MyButton";
import "../styles/Comments.css";
import Comment from "./Comment";
import hide from "../assets/images/arrow_up.svg";
import CommentForm from "./CommentForm";

const Comments = ({ visible, setVisible, post, ...props }) => {
  const rootClasses = visible ? "container active" : "container";

  return (
    <div className={rootClasses}>
      <MyButton
        src={hide}
        style={{ alignSelf: "end", marginRight: "2.5rem", marginTop: "1rem" }}
        onClick={() => setVisible(false)}
      >
        Hide Comments
      </MyButton>
      <div className="comments">
        {props.comments.length ? (
          props.comments.map((comment) => (
            <Comment
              comment={comment}
              deleteComment={props.onDeleteComment}
              key={comment.id}
            />
          ))
        ) : (
          <h1 className="comments__empty">There are no comments yet...</h1>
        )}
      </div>
      <CommentForm
        onAddComment={props.onAddComment}
        post={post}
        commentBody={props.commentBody}
        setBody={props.setCommentBody}
      />
    </div>
  );
};

export default Comments;
