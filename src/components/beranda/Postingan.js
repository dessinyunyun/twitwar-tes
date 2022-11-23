import React from "react";
import axios from "axios";
// import "./beranda.css";
import "./postingan.css";
// import { Link } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";

const Postingan = (props) => {
  const [options, setOptions] = React.useState(false);
  const navigate = useNavigate();
  const [resultEdit, setResultEdit] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showHapusModal, setShowHapusModal] = React.useState(false);
  const [idnya, setIdnya] = React.useState("");

  const handleClose = () => setShow(false);
  const handleCloseHapus = () => setShowHapusModal(false);
  // console.log(idnya);
  React.useEffect(() => {
    setStatus(props.status);
  }, []);

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://merntwitwar.herokuapp.com/${idnya}`, {
        text: status,
      });
      setShow(false);
      props.setPerubahan((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const setValuenya = (e) => {
    console.log(e.target.dataset.valuenya);
  };

  const optionsClick = (e) => {
    setOptions(true);
  };

  const mmk = (e) => {
    setIdnya(e.target.dataset.idnya);
    setShow(true);
  };
  const hapusStatus = (e) => {
    setIdnya(e.target.dataset.idnya);
    setShowHapusModal(true);
  };
  const settingShow = () => {
    setOptions(false);
  };

  const hapus = async (id) => {
    try {
      await axios.delete(`https://merntwitwar.herokuapp.com/${idnya}`);
      setShowHapusModal(false);
      props.setPerubahan((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="updateStatus border-bottom p-3 text-start">
      {/* MODAL HAPUS */}
      <Modal show={showHapusModal} onHide={handleCloseHapus} animation={false}>
        <form onSubmit={saveEdit}>
          <Modal.Header closeButton>
            <p>Konfirmasi Hapus</p>
          </Modal.Header>
          <Modal.Body>Hapus?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary btn-sm" onClick={handleCloseHapus}>
              Batal
            </Button>
            <Button variant="danger btn-sm" type="button" onClick={() => hapus(idnya)}>
              Hapus
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/* AKHIR MODAL HAPUS */}

      <div class="modalaja">
        <>
          <Modal show={show} onHide={handleClose} animation={false}>
            <form onSubmit={saveEdit}>
              <Modal.Header closeButton>
                {/* <Modal.Title> */} <p>edit tweet</p> {/* </Modal.Title> */}
              </Modal.Header>
              <Modal.Body>
                <textarea name="" id="" cols="30" rows="1" onChange={(e) => setStatus(e.target.value)} value={status} />
                {props.gambar.length > 40 && (
                  <div class="gambarUpdate mt-3">
                    <img src={props.gambar} alt="" />
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary btn-sm" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary btn-sm" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>{" "}
      </div>
      <div class="ndatau position-relative">
        {options && (
          <div class="options-container" onClick={settingShow}>
            <div class="options border">
              <ul className="text-start p-1">
                <li className="p-1 " data-idnya={props.id} onClick={mmk}>
                  edit
                </li>
                <li className="p-1 delete" data-idnya={props.id} onClick={hapusStatus}>
                  hapus
                </li>
              </ul>{" "}
            </div>
          </div>
        )}
        <div class="row  header">
          <div class="img col-sm-2 col-3">
            <img src="./sohee.jpg" class="rounded-circle img-thumbnail" alt="..." />
          </div>
          <div class=" col-sm-9  col-9">
            <div class="header text-start align-self-center d-flex username d-flex justify-content-between">
              <div class="username d-flex">
                <p className="name me-1 fs-6">han so hee</p>
                <p className="fs-6">@hansohee</p>
              </div>
              <div class="option">
                <img src="./status-pack/option.png" onClick={optionsClick} alt="" />
              </div>
            </div>
            <div class="main">
              {props.status && <p>{props.status}</p>}

              {props.gambar.length > 40 && (
                <div class="image-status">
                  {" "}
                  <img src={props.gambar} alt="" className=" mb-3" />{" "}
                </div>
              )}
              {/* ============================== FOOTER ======================================== */}
              <div class="row">
                <div class="footer d-flex justify-content-between col-sm-11">
                  <div class="comments">
                    <label htmlFor="comment">
                      <img src="./status-pack/chat.png" alt="" />
                    </label>
                    <button id="comment">tes</button>
                  </div>
                  <div class="retweet">
                    <label htmlFor="retweet">
                      <img src="status-pack/repost.png" alt="" />
                    </label>
                    <button id="retweet">tes</button>
                  </div>
                  <div class="love">
                    <label htmlFor="love">
                      <img src="./status-pack/heart.png" alt="" />
                    </label>
                    <button id="love">tes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postingan;
