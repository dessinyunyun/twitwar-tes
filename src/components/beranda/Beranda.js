import React from "react";
import Postingan from "./Postingan";
import Header from "../Header";
import Aside from "../Aside";
import { Link } from "react-router-dom";

import "./beranda.css";

import { modeContext } from "../../context/ModeContext";

import axios from "axios";

const Beranda = () => {
  const [status, setStatus] = React.useState([]);
  const { mode, setMode } = React.useContext(modeContext);
  status.sort(function compare(a, b) {
    let dateA = new Date(a.time),
      dateB = new Date(b.time);

    return dateB - dateA;
  });

  const [newStatus, setNewStatus] = React.useState("");
  const [newImage, setNewImage] = React.useState("");
  const [imagePreviews, setImagePreviews] = React.useState(null);
  const [perubahan, setPerubahan] = React.useState(false);
  const [phone, setPhone] = React.useState(false);
  console.log(phone);

  React.useEffect(() => {
    getStatus();

    if (window.innerWidth < 1023) {
      setMode(true);
    }
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
    setImagePreviews(null);
    getStatus();
  };

  const writeStatus = (e) => {
    setNewStatus((prev) => e.target.value);
    console.log(newImage);
  };

  const ImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    console.log(newImage.length);
    if (file) {
      setImagePreviews(URL.createObjectURL(file));
    }
  };

  const closeImage = () => {
    setNewImage("");
    setImagePreviews(null);
  };

  // console.log("dari  beranda");

  const kumpulanStatus = status.map((sts) => {
    return <Postingan status={sts.text} gambar={`https://merntwitwar.herokuapp.com/${sts.image}`} setPerubahan={setPerubahan} id={sts._id} />;
  });
  return (
    <div class="container-fluid">
      <div class="row">
        <Header setPerubahan={setPerubahan} mode={mode} />

        <div class="col-sm-6 center colom-postingan">
          <main>
            {mode ? <div class="kosong"></div> : <p className="text-start mx-3 tittle">Beranda</p>}
            {mode ? (
              <div class="kosong"></div>
            ) : (
              <div class="updateStatus row px-3">
                <div class="col-sm-2 col-2">
                  <div class="img">
                    <Link to={`/:username`}>
                      <img src="./sohee.jpg" class="rounded-circle img-thumbnail profile" alt="sohee" width="50px" />
                    </Link>
                  </div>
                </div>
                <div class="type col-sm-9">
                  <form onSubmit={addStatus}>
                    <textarea name="" id="" placeholder="twitter war..." value={newStatus} onChange={writeStatus}></textarea>
                    {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
                    <hr />
                    <div class="imagePreviews ">
                      {imagePreviews && (
                        <div className="border p-2 mb-3 position-relative">
                          <button type="button" class="btn-close position-absolute top-0 end-0" onClick={closeImage} aria-label="Close"></button>
                          <img src={imagePreviews} alt="" />{" "}
                        </div>
                      )}
                    </div>

                    <div class="footer-status d-flex justify-content-between">
                      <div class="media  mb-3">
                        <label for="uploadGambar">
                          <img src="./status-pack/gallery.png" alt="galerry" />
                        </label>
                        <input type="file" id="uploadGambar" onChange={ImageUpload} class="btn btn-outline-secondary" />
                      </div>
                      <div class="tombol-war">
                        {newStatus.length > 0 || newImage ? (
                          <button className="btn btn-primary rounded-pill btn-sm" type="submit">
                            War!!!
                          </button>
                        ) : (
                          <button type="button" class="btn button-tidak-aktif rounded-pill btn-sm">
                            War!!!
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {kumpulanStatus}
          </main>
          {status.length == 0 && <h3 className="mt-5 px-3">Tunggu beberapa saat, maklum Hosting gratis</h3>}
        </div>

        {mode ? <div class="kosong"></div> : <Aside />}
      </div>
    </div>
  );
};

export default Beranda;
