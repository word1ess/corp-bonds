import { Link } from "react-router-dom";
import "./MenuNav.scss";

export default function MenuNav() {
  return (
    <nav className="nav-menu">
      <Link to="/bond">Портфель</Link>
      <Link to="/screener">Скринер</Link>
      <Link to="#">Аналитика</Link>
      <Link to="#">Первичные размещения</Link>
      <Link to="#">Обучение</Link>
      <Link to="#">Тарифы</Link>
    </nav>
  );
}
