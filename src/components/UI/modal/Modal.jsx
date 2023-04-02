import React, { useEffect, useState } from "react";
import MyButton from "../button/MyButton";
import MyInput from "../input/MyInput";
import done from "../../../assets/images/done.svg";
import "../../../styles/Modal.css";
import axios from "axios";
import backBtn from "../../../assets/images/back.svg";
import trash from "../../../assets/images/trash.svg";
import DeleteModal from "../deleteModal/deleteModal";
import Tooltip from "../tooltip/Tooltip";
import undo from "../../../assets/images/undo.svg";

const Modal = ({ active, setActive, post, ...props }) => {
  const [editPost, setEditPost] = useState({
    title: post.title,
    body: post.body,
  });
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState({ delete: false, edit: false });
  const [titleDirty, setTitleDirty] = useState(false);
  const [bodyDirty, setBodyDirty] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (titleError || bodyError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [titleError, bodyError]);

  const blurHandler = (e) => {
    if (e.target.name === "title" && e.target.value.length < 3) {
      setTitleDirty(true);
    } else if (e.target.name === "body" && e.target.value.length < 10) {
      setBodyDirty(true);
    }
  };

  const titleHandler = (e) => {
    setEditPost({ ...editPost, title: e.target.value });
    if (e.target.value.length < 3) {
      setTitleError("The title must be longer than 3 characters!");
      if (!e.target.value) {
        setTitleError("The title cannot be empty");
      }
    } else {
      setTitleError("");
    }
  };

  const bodyHandler = (e) => {
    setEditPost({ ...editPost, body: e.target.value });
    if (e.target.value.length < 10) {
      setBodyError("The description must be longer than 10 characters!");
      if (!e.target.value) {
        setBodyError("The description cannot be empty");
      }
    } else {
      setBodyError("");
    }
  };

  const onEditPost = () => {
    props.setPost({ ...post, title: "", body: "" });
  };

  const confirmEditPost = () => {
    axios.patch(`http://localhost:3000/posts/${post.id}`, {
      title: editPost.title,
      body: editPost.body,
      avatar: editPost.avatar,
    });
    setTooltip({ ...tooltip, edit: true });
    setTimeout(() => {
      setActive(false);
      onEditPost();
      setTooltip({ ...tooltip, edit: false });
    }, 1500);
  };

  const undoChanges = () => {
    setEditPost({
      title: post.title,
      body: post.body,
    });
    setTitleError("");
    setBodyError("");
  };

  const rootClass = active ? "modal__active" : "modal__main";

  return (
    <div className={rootClass}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal__title">Edit entry</h1>
        <div className="modal__titleBlock">
          Edit title:
          <MyInput
            name="title"
            type="text"
            value={editPost.title}
            onChange={(e) => titleHandler(e)}
            onBlur={(e) => blurHandler(e)}
          />
        </div>
        {titleDirty && titleError && (
          <div className="validate__error">{titleError}</div>
        )}
        <div className="modal__bodyBlock">
          Edit body:
          <MyInput
            name="body"
            type="text"
            value={editPost.body}
            onChange={(e) => bodyHandler(e)}
            onBlur={(e) => blurHandler(e)}
          />
        </div>
        {bodyDirty && bodyError && (
          <div className="validate__error">{bodyError}</div>
        )}
        <div className="modal__buttons">
          <MyButton src={trash} onClick={() => setVisible(true)}>
            Delete entry
          </MyButton>
          <MyButton disabled={!formValid} src={done} onClick={confirmEditPost}>
            Confirm
          </MyButton>
          <MyButton src={undo} onClick={undoChanges}>
            Undo Changes
          </MyButton>
          <MyButton src={backBtn} onClick={() => setActive(false)}>
            Back to entries
          </MyButton>
        </div>
      </div>
      <DeleteModal
        onDeletePost={props.onDeletePost}
        tooltip={tooltip}
        visible={tooltip.delete}
        setVisible={setTooltip}
        post={post.id}
        setActive={setActive}
        visibleModal={visible}
        setVisibleModal={setVisible}
      />
      <Tooltip visible={tooltip.edit}>
        The entry has been changed successfully!
      </Tooltip>
    </div>
  );
};

export default Modal;
