import React from "react";
import Header from "./Header";
import Aside from "./Aside";
import Beranda from "./beranda/Beranda";

const Main = () => {
  return (
    <div className="container-fluid">
      <div class="row">
        <Header />
        <Beranda />
        {/* <Aside /> */}
      </div>
    </div>
  );
};

export default Main;
