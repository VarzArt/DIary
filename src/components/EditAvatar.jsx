import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../styles/Cropper.css";
import { FieldArray } from "formik";

const EditAvatar = ({ errors, values, avatar, setAvatar }) => {
  const defaultSrc = avatar;

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef(defaultSrc);

  const getCropData = (e) => {
    e.preventDefault();
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    setAvatar(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
  };

  const getFileSchema = (file) =>
    file && {
      file: file,
      type: file.type,
      name: file.name,
    };

  const getArrErrorMessages = (errors) => {
    const result = [];
    errors &&
      Array.isArray(errors) &&
      errors.forEach((value) => {
        if (typeof value === "string") {
          result.push(value);
        } else {
          Object.values(value).forEach((error) => result.push(error));
        }
      });
    return result.length >= 3 ? [result[0]] : result;
  };

  return (
    <div className="cropper">
      <div style={{ width: "100%" }}>
        <FieldArray name="avatar">
          {(arrayHelper) => (
            <>
              <p>
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) => {
                    e.preventDefault();
                    const files = e.target.files;
                    const file = getFileSchema(files[0]);
                    const reader = new FileReader();
                    if (!file) {
                      arrayHelper.remove(0);
                      setImage(defaultSrc);
                    }
                    if (Array.isArray(values.avatar)) {
                      arrayHelper.replace(0, file);
                    } else {
                      arrayHelper.push(file);
                    }
                    reader.onload = () => {
                      setImage(reader.result);
                    };
                    reader.readAsDataURL(files[0]);
                    console.log(files);
                  }}
                />
              </p>
              {errors.avatar ? (
                getArrErrorMessages(errors.avatar).map(
                  (error) =>
                    error && (
                      <div key={error} className="validate__error">
                        {error}
                      </div>
                    )
                )
              ) : (
                <br />
              )}
            </>
          )}
        </FieldArray>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "40%", margin: "1rem 0" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />

          <button className="cropper_btn" onClick={getCropData}>
            Crop Image
          </button>
          <div className="box" style={{ width: "40%", height: "max-content" }}>
            <h1
              style={{
                padding: "1rem",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              Cropped image
            </h1>
            <div className="crop__wrapper">
              <img
                style={{
                  width: "335px",
                  height: "256px",
                  float: "right",
                  textAlign: "center",
                }}
                src={cropData}
                alt="cropped"
              />
            </div>
          </div>
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default EditAvatar;
