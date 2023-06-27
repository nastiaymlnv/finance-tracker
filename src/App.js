import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
// import GlobalFonts from './assets/fonts/fonts';
import GlobalStylesReset from './assets/reset';



import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



import router from "./Router";

function App() {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (windowInnerWidth <= 480)
    return (
      <>
        {/* <GlobalFonts /> */}
        <GlobalStylesReset />
        <RouterProvider router={router} />
      </>
    )
  else
    return (
      <>
        <h1>
          This site is temporarily available only on mobile devices. {<br/>}
          Please reopen this app via your mobile
        </h1>
        <h2>
          Sorry for the inconvenience
        </h2>
      </>
    )
}

export default App;