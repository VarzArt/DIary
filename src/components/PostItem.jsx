import React, { useEffect, useState } from "react";
import clock from "../assets/images/clock.svg";
import MyButton from "./UI/button/MyButton";
import arrowDowm from "../assets/images/arrow_down.svg";
import Comments from "./Comments";
import edit from "../assets/images/edit.svg";
import Modal from "./UI/modal/Modal";
import PostService from "../API/PostService";

const PostItem = (props) => {
  const [comments, setComments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleComments, setVisibleComments] = useState(false);
  const [commentBody, setCommentBody] = useState("");

  const onAddComment = () => {
    setComments([
      ...comments,
      {
        id: props.allComments[props.allComments.length - 1].id + 1,
        name: "Varzumov Nikita Andreevich",
        body: commentBody,
        role: "admin",
        avatar:
          "https://ds.obmenvsemfiles.net/fo/get/5677916/neon_mask_boy_city_4k_6h-nashobmen.org.jpg",
      },
    ]);
    props.setAllComments([
      ...props.allComments,
      {
        id: props.allComments[props.allComments.length - 1].id + 1,
        name: "Varzumov Nikita Andreevich",
        body: commentBody,
        role: "admin",
        avatar:
          "https://ds.obmenvsemfiles.net/fo/get/5677916/neon_mask_boy_city_4k_6h-nashobmen.org.jpg",
      },
    ]);
  };

  const onDeleteComment = (comment) => {
    setComments(comments.filter((c) => c.id !== comment.id));
    props.setAllComments(props.allComments.filter((c) => c.id !== comment.id));
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await PostService.getComments(props.post.id);

        setComments(response.data);
      } catch (error) {
        console.log("Error receiving comments", JSON.parse(error), error);
      }
    };
    fetchComments();
  }, []);

  const postDate = new Date(Number(props.post.date)).toLocaleString();

  return (
    <div className="post">
      <div className="post__content">
        <img src={props.post.avatar} alt="" className="post__content_avatar" />
        <div className="post__content_info">
          <div className="post__content_info-title">
            {props.number}. {props.post.title}
          </div>
          <div className="post__content_info-desc">{props.post.body}</div>
          <div className="post__content_info-bot">
            <div className="post__content_info-date">
              <img src={clock} alt="" />
              {postDate}
            </div>
            <MyButton
              src={edit}
              style={{ marginLeft: "auto", marginRight: "1rem" }}
              onClick={() => setModalVisible(true)}
            >
              Edit entry
            </MyButton>
            <MyButton src={arrowDowm} onClick={() => setVisibleComments(true)}>
              Show comments
            </MyButton>
          </div>
        </div>
      </div>
      <Comments
        post={props.post}
        onAddComment={onAddComment}
        setCommentBody={setCommentBody}
        comments={comments}
        visible={visibleComments}
        setVisible={setVisibleComments}
        commentBody={commentBody}
        onDeleteComment={onDeleteComment}
      />
      <Modal
        onDeletePost={props.onDeletePost}
        active={modalVisible}
        setActive={setModalVisible}
        post={props.post}
        setPost={props.setPost}
      />
    </div>
  );
};

export default PostItem;
