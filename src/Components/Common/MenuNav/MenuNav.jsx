import { Link } from "react-router-dom";
import "./MenuNav.scss";

export default function MenuNav() {
  return (
    <nav className="nav-menu">
      <Link href="#">Портфель</Link>
      <Link href="#">Скринер</Link>
      <Link href="#">Аналитика</Link>
      <Link href="#">Первичные размещения</Link>
      <Link href="#">Обучение</Link>
      <Link href="#">Тарифы</Link>
    </nav>
  );
}
