import "./Footer.scss";

import { Link } from "react-router-dom";

import MenuNav from "../Common/MenuNav/MenuNav";

import logo from "../../img/logo.svg";
import Socials from "../Common/Socials/Socials";

function Footer({ isMobile }) {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Link to="/" className="nav-menu__logo">
          <img src={logo} alt="logo" />
        </Link>
        {!isMobile && (
          <p className="footer__copy">
            Copyright © 2024 CorpBonds. Все права защищены.
          </p>
        )}
      </div>
      <MenuNav />
      <nav className="footer__nav">
        <Link to="#">О проекте</Link>
        <Link to="#">Политика конфиденциальности</Link>
      </nav>
      {isMobile && (
        <p className="footer__copy">
          Copyright © 2024 CorpBonds. Все права защищены.
        </p>
      )}
      <Socials />
    </footer>
  );
}

export default Footer;
