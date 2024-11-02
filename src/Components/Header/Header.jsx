import "./Header.scss";

import { Link } from "react-router-dom";
import { useRef } from "react";

import MenuNav from "../Common/MenuNav/MenuNav";

import logo from "../../img/logo.svg";
import tg from "../../img/tg.svg";
import profile from "../../img/profile.svg";
import Socials from "../Common/Socials/Socials";

export default function Header({
  isMobile,
  pageTitle = "Управление портфелем облигаций",
}) {
  const burgerBtnRef = useRef(null);
  const burgerMenuRef = useRef(null);
  const headerRef = useRef(null);

  function burgerHandle() {
    document.body.classList.toggle("burger-active");
    headerRef.current.classList.toggle("burger-active");
    burgerBtnRef.current.classList.toggle("burger-active");
    burgerMenuRef.current.classList.toggle("burger-active");
  }

  if (isMobile) {
    return (
      <header className="header" ref={headerRef}>
        <div className="header__row">
          <Link to="/" className="nav-menu__logo">
            <img src={logo} alt="logo" />
          </Link>
          <p className="header__title">{pageTitle}</p>
          <button
            class="header__burger"
            ref={burgerBtnRef}
            onClick={burgerHandle}
          >
            <span></span>
          </button>
          <nav className="header__menu" ref={burgerMenuRef}>
            <div className="header-burger__search">
              <form action="#" className="nav-menu__form">
                <input type="search" placeholder="Поиск..." />
              </form>
              <Link to="#" className="nav-menu__profile">
                <img src={profile} alt="profile" />
              </Link>
            </div>
            <MenuNav />
            <Socials />
          </nav>
        </div>
      </header>
    );
  }
  return (
    <header className="header">
      <div className="header__row">
        <Link to="/" className="nav-menu__logo">
          <img src={logo} alt="logo" />
        </Link>
        <MenuNav />
        <Link to="/" className="nav-menu__tg">
          <img src={tg} alt="tg" />
          <p>телеграм-канал</p>
        </Link>
        <form action="#" className="nav-menu__form">
          <input type="search" placeholder="Поиск..." />
        </form>
        <Link to="#" className="nav-menu__profile">
          <img src={profile} alt="profile" />
        </Link>
      </div>
    </header>
  );
}
