import React from "react";
import MyButton from "../button/MyButton";
import yes from "../../../assets/images/yes.svg";
import no from "../../../assets/images/no.svg";
import axios from "axios";
import Tooltip from "../tooltip/Tooltip";

const DeleteModal = ({
  tooltip,
  visibleModal,
  setVisibleModal,
  setActive,
  post,
  visible,
  setVisible,
  ...props
}) => {
  const removePost = async () => {
    await axios.delete(`http://localhost:3000/posts/${post}`);
    setVisible({ ...tooltip, delete: true });
    setTimeout(() => {
      setActive(false);
      setVisibleModal(false);
      setVisible({ ...tooltip, delete: false });
      props.onDeletePost(post);
    }, 1500);
  };

  const rootClass = visibleModal ? "deleteModal active" : "deleteModal";

  return (
    <div className={rootClass}>
      <div className="deleteModal__main">
        <div className="deleteModal__main_text">
          Are you sure you want to delete the entry?
        </div>
        <div className="deleteModal__main_buttons">
          <MyButton src={yes} onClick={removePost}>
            Yes
          </MyButton>
          <MyButton src={no} onClick={() => setVisibleModal(false)}>
            No
          </MyButton>
        </div>
      </div>
      <Tooltip visible={visible}>
        The entry was successfully deleted from the diary!
      </Tooltip>
    </div>
  );
};

export default DeleteModal;
