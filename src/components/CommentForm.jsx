import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import add from "../assets/images/add_comment.svg";
import MyButton from "./UI/button/MyButton";
import axios from "axios";
import Tooltip from "./UI/tooltip/Tooltip";

const CommentForm = ({ post, onAddComment = Function.prototype, ...props }) => {
  const addNewComment = () => {
    axios.post(`http://localhost:3000/posts/${post.id}/comments`, {
      name: "Varzumov Nikita Andreevich",
      body: props.commentBody,
      role: "admin",
      avatar:
        "https://ds.obmenvsemfiles.net/fo/get/5677916/neon_mask_boy_city_4k_6h-nashobmen.org.jpg",
    });
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 1500);
    onAddComment();
    props.setBody("");
  };

  const [valid, setValid] = useState(true);
  const [tooltip, setTooltip] = useState(false);

  const isValid = (e) => {
    props.setBody(e.target.value);
    if (e.target.value.length >= 1) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <div className="comments__form">
      <h1 className="comments__form_title">Share your opinion:</h1>
      <MyInput
        value={props.commentBody}
        onChange={(e) => isValid(e)}
        type="text"
        placeholder="Add comment"
      />
      <MyButton
        type="submit"
        onClick={addNewComment}
        src={add}
        style={{ alignSelf: "end", marginTop: "1rem" }}
        disabled={valid}
      >
        Add comment!
      </MyButton>
      <Tooltip visible={tooltip}>The comment was added successfully!</Tooltip>
    </div>
  );
};

export default CommentForm;
