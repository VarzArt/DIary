import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import add from '../assets/images/add_comment.svg';
import MyButton from './UI/button/MyButton';
import axios from 'axios';

const CommentForm = ({
  post,
  onAddComment = Function.prototype,
	...props
}) => {
  const addNewComment = () => {
    axios.post(`http://localhost:3000/posts/${post.id}/comments`, {
      name: 'Varzumov Nikita Andreevich',
      body: props.commentBody,
      role: 'admin',
      avatar:
        'https://ds.obmenvsemfiles.net/fo/get/5677916/neon_mask_boy_city_4k_6h-nashobmen.org.jpg',
    });
    onAddComment();
    props.setBody('');
  };

  const [valid, setValid] = useState(true);

  const isValid = (e) => {
		props.setBody(e.target.value);
    if (e.target.value.length >= 1) {
      setValid(false);
    } else {
			setValid(true)
		}
  };


  return (
    <div className="comments__form">
      <h1 className="comments__form_title">Share your opinion:</h1>
      <MyInput
        value={props.commentBody}
        onChange={e => isValid(e)}
        type="text"
        placeholder="Add comment"
      />
      <MyButton
        type="submit"
        onClick={addNewComment}
        src={add}
        style={{ alignSelf: 'end', marginTop: '1rem' }}
        disabled={valid}
      >
        Add comment!
      </MyButton>
    </div>
  );
};

export default CommentForm;
