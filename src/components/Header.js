import React from "react";
import axios from "axios";
import "./header.css";
import { modeContext } from "../context/ModeContext";
import HeaderMode from "./HeaderMode";

const Header = (props) => {
  const [newStatus, setNewStatus] = React.useState("");
  const [newImage, setNewImage] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);
  const { mode, setMode } = React.useContext(modeContext);
  console.log(mode);
  console.log(window.innerWidth);

  React.useEffect(() => {
    if (window.innerWidth < 1023) {
      setMode(true);
    } else {
      setMode(false);
    }
  }, []);

  const addStatus = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("text", newStatus);

    data.append("image", newImage);

    await axios
      .post("https://merntwitwar.herokuapp.com/", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("berhasil");
      })
      .catch((err) => {
        console.log("error:", err);
      });
    setNewStatus("");
    setNewImage("");
    setImagePreview(null);
    props.setPerubahan((prev) => !prev);
  };

  const ImageUploads = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const writeStatus = (e) => {
    setNewStatus((prev) => e.target.value);
  };
  const closeImage = () => {
    setNewImage("");
    setImagePreview(null);
  };

  return <div class="col-sm-3 text-start ">{<HeaderMode mode={mode} addStatus={addStatus} newStatus={newStatus} writeStatus={writeStatus} imagePreview={imagePreview} closeImage={closeImage} newImage={newImage} />}</div>;
};

export default Header;
