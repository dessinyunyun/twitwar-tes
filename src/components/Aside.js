import React from "react";
import "./aside.css";
const Aside = () => {
  return (
    <div class="col-sm-3">
      <aside>
        <div class="pencarian rounded-pill">
          <div class="input-group input-group-sm mb-3 rounded-pill">
            <span class="input-group-text  " id="inputGroup-sizing-sm">
              <button>
                <img src="./search.png" alt="" />
              </button>
            </span>
            <input type="text" class="form-control " placeholder="cari di twitwar ..." aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
          </div>
        </div>

        <div class="trendings mt-5 bg ">
          <div class="tittle">
            <p className="text-start fw-bold">Trending untuk you</p>
          </div>
          <div class="list-trending">
            <ul className="text-start">
              <li>rachel venya dan okin tiktokan bareng</li>
              <li>rachel venya dan okin tiktokan bareng</li>
              <li>rachel venya dan okin tiktokan bareng</li>
              <li>rachel venya dan okin tiktokan bareng</li>
              <li>rachel venya dan okin tiktokan bareng</li>
              <li>rachel venya dan okin tiktokan bareng</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
