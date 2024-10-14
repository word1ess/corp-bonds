import "./Footer.scss";

import { Link } from "react-router-dom";

import MenuNav from "../Common/MenuNav/MenuNav";

import logo from "../../img/logo.svg";
import Socials from "../Common/Socials/Socials";

function Footer({ isMobile }) {
  if (isMobile) {
    return (
      <footer className="footer">
        <div className="footer__logo">
          <Link to="/" className="nav-menu__logo">
            <img src={logo} alt="logo" />
          </Link>
          <nav className="footer__nav">
            <Link to="#">О проекте</Link>
            <Link to="#">Политика конфиденциальности</Link>
          </nav>
          <p>Copyright © 2024 CorpBonds. Все права защищены.</p>
        </div>
        <MenuNav />
      </footer>
    );
  }
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Link to="/" className="nav-menu__logo">
          <img src={logo} alt="logo" />
        </Link>
        <p>Copyright © 2024 CorpBonds. Все права защищены.</p>
      </div>
      <MenuNav />
      <nav className="footer__nav">
        <Link to="#">О проекте</Link>
        <Link to="#">Политика конфиденциальности</Link>
      </nav>
      <Socials />
    </footer>
  );
}

export default Footer;
