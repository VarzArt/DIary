import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../styles/Cropper.css";
import { FieldArray } from "formik";

const AvatarFile = ({ errors, values, post, setPost }) => {
  const defaultSrc =
    "https://img3.akspic.ru/crops/1/9/1/0/5/150191/150191-igri-elektrik-pressa-sina_korp-gadzhet-1920x1080.jpg";

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

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

	const getFileSchema = (file) => file && ({
		file: file,
		type: file.type,
		name: file.name
	})

	const getArrErrorMessages = (errors) => {
		const result = []
		errors && Array.isArray(errors) && errors.forEach((value) => {
			if (typeof value === 'string') {
				result.push(value)
			} else {
				Object.values(value).forEach((error) => result.push(error))
			}
		})
		 return result.length >=3 ? [result[0]] : result
	}

  return (
    <div className="cropper">
      <div style={{ width: "100%" }}>
				<FieldArray name = "avatar">
					{(arrayHelper) => (
						<>
						<p>
        <input type="file" onChange={e => {
					e.preventDefault();
					const files = e.target.files
					const file = getFileSchema(files[0]) 
					const reader = new FileReader();
					if (!file) {
						arrayHelper.remove(0)
						setImage(defaultSrc)
					}
					if (Array.isArray(values.avatar)) {
						arrayHelper.replace(0, file)
					} else {
						arrayHelper.push(file)
					}
					reader.onload = () => {
						setImage(reader.result);
					};
					reader.readAsDataURL(files[0]);
				}} name="avatar"/>
				</p>
				{errors.avatar ? getArrErrorMessages(errors.avatar).map((error) => (
						error && <div key = {error} className="validate__error">{error}</div>
					)) : <br/>}
				</>
					)}
				</FieldArray>
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
