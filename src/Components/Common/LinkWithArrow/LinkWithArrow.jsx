import { Link } from "react-router-dom";
import "./LinkWithArrow.scss";

import leftArrow from "../../../img/link-arrow.svg";
import bottomArrow from "../../../img/bottom-arrow.svg";

export default function CustomLinkArrow({ text, link = "#", type = "left" }) {
  let imgSrc;
  switch (type) {
    case "bottom":
      imgSrc = bottomArrow;
      break;

    default:
      imgSrc = leftArrow;
      break;
  }
  return (
    <Link to={link} className="link-arrow">
      {text}
      <img src={imgSrc} alt="" />
    </Link>
  );
}
