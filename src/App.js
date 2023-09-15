import React, { useEffect, useState } from "react";

import Router from "./Router";

import { BottomNavBar } from "./components";

import "./App.module.css";

function App() {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [showBottomNav, setShowBottomNav] = useState(true);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (windowInnerWidth >= 560)
    return (
      <>
        <h1>
          This site is temporarily available only on mobile devices. {<br />}
          Please reopen this app via your mobile
        </h1>
      </>
    )
    else {
      return (
      <>
        <Router setShowBottomNav={setShowBottomNav} />
        {showBottomNav && <BottomNavBar />}
      </>
    )

    }
}

export default App;
