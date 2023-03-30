import React from "react";
import trash from '../assets/images/trash.svg'
import person from '../assets/images/person.svg'
import MyButton from "./UI/button/MyButton";
import axios from "axios";

const Comment = (props) => {

	const removeComment = () => {
		props.deleteComment(props.comment)
		axios.delete(`http://localhost:3000/comments/${props.comment.id}`)
	}

  return (
    <div className="comments__item">
      <div className="comments__item_header">
        <img src={props.comment.avatar} alt="" className="comments__item_header-logo" />
        <div className="comments__item_header-name">
          {props.comment.name}
        </div>
        <div className="comments__item_header-role">
          <img src={person} alt="" />
          {props.comment.role}
        </div>
      </div>
      <div className="comments__item_body">
        {props.comment.body}
      </div>
      <MyButton onClick = {removeComment} src={trash} style={{ alignSelf: "end", fontSize: ".75rem" }}>
        Delete
      </MyButton>
    </div>
  );
};

export default Comment;
