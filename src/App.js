import "./App.css";

// import Postingan from "./components/beranda/Postingan";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { modeContext } from "./context/ModeContext";

import React from "react";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Beranda from "./components/beranda/Beranda";
import Profile from "./components/halamanProfil/Profile";

function App() {
  const [mode, setMode] = React.useState(false);
  const [perubahan, setPerubahan] = React.useState(false);

  React.useEffect(() => {
    if (window.innerWidth < 1023) {
      setMode(true);
    }
  }, [perubahan]);

  return (
    <BrowserRouter>
      <div className="App">
        <modeContext.Provider value={{ mode, setMode, perubahan, setPerubahan }}>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/:username" element={<Profile />} />
          </Routes>
        </modeContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
