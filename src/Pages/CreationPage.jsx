import React, { useState } from "react";
import AvatarFile from "../components/AvatarFile";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import addBtn from "../assets/images/add.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import backBtn from "../assets/images/back.svg";
import Tooltip from "../components/UI/tooltip/Tooltip";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";

const CreationPage = ({ post, setPost, allPosts, setAllPosts }) => {
  const navigate = useNavigate();

  const [tooltip, setTooltip] = useState(false);

  const postAvatar =
    post.avatar === "#" || post.avatar === undefined
      ? "https://img1.akspic.ru/crops/8/0/6/8/3/138608/138608-anonimnye_narkomany-elektronnoe_ustrojstvo-haker-nebo-illustracia-1280x720.jpg"
      : post.avatar;

  const addNewPost = (post) => {
    axios.post("http://localhost:3000/posts", {
      title: post.title[0].toUpperCase() + post.title.slice(1),
      body: post.body,
      date: Number(moment().utc().local().format("x")),
      avatar: postAvatar,
    });
    setAllPosts([
      ...allPosts,
      {
        id: allPosts[allPosts.length - 1].id + 1,
        title: post.title[0].toUpperCase() + post.title.slice(1),
        body: post.body,
        date: Number(moment().utc().local().format("x")),
        avatar: postAvatar,
      },
    ]);
    setPost({
      title: "",
      body: "",
    });
    setTooltip(true);
    setTimeout(() => {
      navigate("/main");
      setTooltip(false);
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
    avatar: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            file: yup
              .mixed()
              .test("fileSize", "The file size is more than 5 MB!", (value) => {
                if (!value) return false;
                return value.size < 5242880;
              })
              .required("Add a file!"),
            type: yup
              .string()
              .oneOf(
                ["image/gif", "image/png", "image/svg+xml", "image/jpeg"],
                "Add a file with the correct format(png, jpg, gif, svg)!"
              )
              .required("Incorrect type of file!"),
            name: yup.string().required("Add a file!"),
          })
          .typeError("Add a file!")
      )
      .required(),
  });

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          body: "",
          avatar: undefined,
        }}
        validateOnBlur
        onSubmit={(values) => addNewPost(values)}
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
        }) => (
          <div style={{ minWidth: "1200px" }}>
            <MyInput
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Entry name"
            ></MyInput>
            {touched.title && errors.title && (
              <div className="validate__error">{errors.title}</div>
            )}
            <MyInput
              name="body"
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Description"
            ></MyInput>
            {touched.body && errors.body && (
              <div className="validate__error">{errors.body}</div>
            )}
            <AvatarFile
              errors={errors}
              values={values}
              post={post}
              setPost={setPost}
            />
            <div className="button__holder">
              <MyButton
                disabled={!isValid}
                src={addBtn}
                onClick={handleSubmit}
                style={{ fontSize: "1.5rem" }}
                type="submit"
              >
                Create entry
              </MyButton>
              <Link to="/main">
                <MyButton src={backBtn} style={{ fontSize: "1.5rem" }}>
                  Back to entries
                </MyButton>
              </Link>
            </div>
            <Tooltip visible={tooltip} setVisible={setTooltip}>
              The entry has been successfully added to the diary!
            </Tooltip>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CreationPage;
