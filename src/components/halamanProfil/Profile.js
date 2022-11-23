import React from "react";
import axios from "axios";
import Header from "../Header";
import Aside from "../Aside";
import Postingan from "../beranda/Postingan";
import "./profile.css";
import { modeContext } from "../../context/ModeContext";
import HeaderMode from "../HeaderMode";
import { Link } from "react-router-dom";

const Profile = () => {
  const { mode, setMode } = React.useContext(modeContext);
  const [status, setStatus] = React.useState([]);
  console.log(mode);

  status.sort(function compare(a, b) {
    let dateA = new Date(a.time),
      dateB = new Date(b.time);

    return dateB - dateA;
  });

  // status = _.sortBy(status, function(dateObj) {
  //   return new Date(dateObj.time);
  // });

  const [newStatus, setNewStatus] = React.useState("");
  const [newImage, setNewImage] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);
  const [perubahan, setPerubahan] = React.useState(false);

  React.useEffect(() => {
    getStatus();
  }, [perubahan]);

  const getStatus = async () => {
    const response = await axios.get("https://merntwitwar.herokuapp.com/");
    setStatus(response.data);
  };

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
    getStatus();
  };

  const writeStatus = (e) => {
    setNewStatus((prev) => e.target.value);
  };

  const ImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const closeImage = () => {
    setNewImage("");
    setImagePreview(null);
  };

  console.log("dari  beranda");

  const kumpulanStatus = status.map((sts) => {
    return <Postingan status={sts.text} gambar={`https://merntwitwar.herokuapp.com/${sts.image}`} setPerubahan={setPerubahan} id={sts._id} />;
  });
  return (
    <div className="container-fluid container-profile">
      <div class="row">
        <Header setPerubahan={setPerubahan} />
        <div class="col-sm-6  center">
          <main>
            {" "}
            {mode ? (
              <div class="nav-mobile d-flex py-1 px-2">
                <div class="img-user">
                  <Link to={`/`}>
                    <img src="./left-arrow.png" class="rounded-circle img-thumbnail profile" alt="sohee" width="40px" />
                  </Link>
                </div>
                <div class="text my-auto mx-3">
                  {" "}
                  <b>Nyun</b>{" "}
                </div>
              </div>
            ) : (
              ""
            )}
            <div class="jumbotron-profile">
              <div class="picture  position-relative">
                <div class="sampul">
                  <img src="./skate.jpg" alt="" />
                </div>
                <di v class="ava position-absolute px-3 justify-content-between d-flex ">
                  <div class="col-sm-3 col-4">
                    <img src="./sohee.jpg" class="rounded-circle img-thumbnail profile" alt="sohee" />
                  </div>
                  <div class="edit-profile col-sm-8 col-5 align-self-end d-flex justify-content-end ">
                    <button type="button" class="btn btn-outline-dark btn-sm rounded-pill ">
                      Edit Profile
                    </button>
                  </div>
                </di>
              </div>
              {/* tes */}
              <div class="detail-user mt-3 text-start px-3">
                <p className="fw-bold">nyun</p>
                <p className="disabled">@dessinyunyun</p>
                <p class="bio mb-4">amor fati</p>
                <p className="disabled">Kendari | bergabung September 2012</p>

                <span className="d-flex gap-4">
                  <div class="mengikuti d-flex gap-1">
                    <p className="fw-bold"> 220</p> <p>Mengikuti</p>
                  </div>
                  <div class="Pengikut d-flex gap-1">
                    <p className="fw-bold">82</p> <p>Pengikut</p>
                  </div>
                </span>
              </div>
            </div>
            {kumpulanStatus}
          </main>
        </div>
        {/* {mode ? <div class="kosong"></div> : <Aside />} */}
      </div>
    </div>
  );
};

export default Profile;
