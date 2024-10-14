import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const checkIsMobile = (width) => {
    return width < 992 ? true : false;
  };
  const [isMobile, setisMobile] = useState(checkIsMobile(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setisMobile(checkIsMobile(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header isMobile={isMobile} />
      <main className="content">
        <Outlet context={isMobile} />
      </main>
      <Footer isMobile={isMobile} />
    </>
  );
}

export default App;
