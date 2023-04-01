import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../styles/Cropper.css";

const AvatarFile = ({ post, setPost }) => {
  const defaultSrc =
    "https://img3.akspic.ru/crops/1/9/1/0/5/150191/150191-igri-elektrik-pressa-sina_korp-gadzhet-1920x1080.jpg";

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = (e) => {
    e.preventDefault();
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setPost({
        ...post,
        avatar: cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
      });
    }
  };

  return (
    <div className="cropper">
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <br />
        <br />
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "80%", margin: "1rem 0" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
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
      </div>
      <button className="cropper_btn" onClick={getCropData}>
        Crop Image
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1 style={{ padding: "1rem" }}>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", height: "300px" }}
          />
        </div>
        <div className="box" style={{ width: "50%", height: "300px" }}>
          <h1 style={{ padding: "1rem", textAlign: "end" }}>Crop</h1>
          <img
            style={{ width: "335px", height: "256px", float: "right" }}
            src={cropData}
            alt="cropped"
          />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default AvatarFile;
