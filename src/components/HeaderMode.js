import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const HeaderMode = (props) => {
  console.log(props);
  return (
    <div>
      <div class="col-sm-3 text-start headers-container">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form onSubmit={props.addStatus}>
                  <textarea name="" id="" placeholder="twitter war..." value={props.newStatus} onChange={props.writeStatus}></textarea>

                  <hr />
                  <div class="imagePreview ">
                    {props.imagePreview && (
                      <div className="border p-2 mb-3 position-relative">
                        <button type="button" class="btn-close position-absolute top-0 end-0" onClick={props.closeImage} aria-label="Close"></button>
                        <img src={props.imagePreview} alt="" />{" "}
                      </div>
                    )}
                  </div>

                  <div class="footer-status d-flex justify-content-between">
                    <div class="media  mb-3">
                      <label for="uploadGambars">
                        <img src="./status-pack/gallery.png" alt="galerry" />
                      </label>
                      <input type="file" id="uploadGambars" onChange={props.ImageUploads} class="btn btn-outline-secondary" />
                    </div>
                    <div class="tombol-war">
                      {props.newStatus.length > 0 || props.newImage ? (
                        <button className="btn btn-primary rounded-pill btn-sm" type="submit" data-bs-dismiss="modal" onClick={(e) => props.setPerubahan(!props.perubahan)}>
                          War!!!
                        </button>
                      ) : (
                        <button type="button" class="btn button-tidak-aktif rounded-pill btn-sm" data-bs-dismiss="modal">
                          War!!!
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <header>
          <div class="menu d-flex justify-content-start">
            <ul id="ulheaders" className="gap-3">
              {props.mode ? (
                ""
              ) : (
                <li className="d-flex gap-3 mb-3 justify-items-start bg logo-headers">
                  <img src="./logo.svg" alt="twitwar" className="twit" />
                </li>
              )}
              <Link to={`/`}>
                <li className={props.mode ? "d-flex gap-3  align-items-center bg" : "d-flex gap-4 align-items-center bg"}>
                  <img src="./header-pack/home.png" alt="gntot" />

                  <p>Beranda</p>
                </li>
              </Link>
              <Link to={`/`}>
                <li className={props.mode ? "d-flex gap-3 align-items-center bg" : "d-flex gap-4 align-items-center bg"}>
                  <img src="./header-pack/hastag.png" alt="tot" />

                  <p>Jelajahi</p>
                </li>
              </Link>
              <Link to={`/`}>
                <li className={props.mode ? "d-flex gap-3 align-items-center bg" : "d-flex gap-4 align-items-center bg"}>
                  <img src="./header-pack/bell.png" alt="tot" />
                  <p>Pemberitahuan</p>
                </li>
              </Link>
              <Link to={`/`}>
                <li className={props.mode ? "d-flex gap-3 align-items-center bg" : "d-flex gap-4  align-items-center bg"}>
                  <img src="./header-pack/email.png" alt="tot" />
                  <p>Pesan</p>
                </li>
              </Link>
              <Link to={`/`}>
                <li className={props.mode ? "d-flex gap-3 align-items-center bg" : "d-flex gap-4 align-items-center bg"}>
                  <img src="./header-pack/user.png" alt="tot" />
                  <p>Profil</p>
                </li>
              </Link>
              <li className="d-flex  align-items-center row tweet-header">
                <button type="button" class="btn btn-primary btn-lg rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  tweetwar
                </button>
              </li>
            </ul>
          </div>
        </header>

        {props.mode ? (
          <div class="button-tweet-mobile d-flex" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="./pen.png" alt="" className="m-auto" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HeaderMode;
