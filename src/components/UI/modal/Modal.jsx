import React, { useState } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import EditAvatar from "../../EditAvatar";

const Modal = ({ active, setActive, post, ...props }) => {
  const [avatar, setAvatar] = useState(post.avatar);
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState({ delete: false, edit: false });

  const onEditPost = (values) => {
    props.setPost({
      ...post,
      title: values.title,
      body: values.body,
      avatar: avatar,
    });
  };

  const confirmEditPost = (values) => {
    axios.patch(`http://localhost:3000/posts/${post.id}`, {
      title: values.title,
      body: values.body,
      avatar: avatar,
    });
    setTooltip({ ...tooltip, edit: true });
    setTimeout(() => {
      setActive(false);
      onEditPost(values);
      setTooltip({ ...tooltip, edit: false });
    }, 1500);
  };

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .typeError("The field must be a string")
      .required("The title field must be mandatory!"),
    body: yup
      .string()
      .typeError("The description must be a string")
      .required("The description field must be mandatory!"),
    avatar: yup.array().of(
      yup
        .object()
        .shape({
          file: yup
            .mixed()
            .test("fileSize", "Add a file with correct size!", (value) => {
              if (!value) return false;
              return value.size < 5242880;
            }),
          type: yup
            .string()
            .oneOf(
              ["image/gif", "image/png", "image/svg+xml", "image/jpeg"],
              "Add a file with the correct format(png, jpg, gif, svg)!"
            ),
          name: yup.string(),
        })
        .typeError("Add a file!")
    ),
  });

  const rootClass = active ? "modal__main active" : "modal__main";

  return (
    <div className={rootClass}>
      <Formik
        initialValues={{
          title: post.title,
          body: post.body,
          avatar: undefined,
        }}
        validateOnBlur
        onSubmit={(values) => confirmEditPost(values)}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          handleReset,
        }) => (
          <div className="modal__content">
            <h1 className="modal__title">Edit entry</h1>
            <div className="modal__titleBlock">
              Edit title:
              <MyInput
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.title && errors.title && (
              <div className="validate__error">{errors.title}</div>
            )}
            <div className="modal__bodyBlock">
              Edit body:
              <MyInput
                name="body"
                type="text"
                value={values.body}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.body && errors.body && (
              <div className="validate__error">{errors.body}</div>
            )}
            <EditAvatar
              setAvatar={setAvatar}
              avatar={avatar}
              errors={errors}
              values={values}
            />
            <div className="modal__buttons">
              <MyButton src={trash} onClick={() => setVisible(true)}>
                Delete entry
              </MyButton>
              <MyButton
                disabled={!isValid}
                type="submit"
                src={done}
                onClick={(values) => handleSubmit(values)}
              >
                Confirm
              </MyButton>
              <MyButton src={undo} type="reset" onClick={handleReset}>
                Undo Changes
              </MyButton>
              <MyButton src={backBtn} onClick={() => setActive(false)}>
                Back to entries
              </MyButton>
            </div>
          </div>
        )}
      </Formik>
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
