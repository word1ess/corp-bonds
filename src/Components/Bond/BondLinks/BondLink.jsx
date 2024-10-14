import { Link } from "react-router-dom";

export default function BondLink({ title, links, linkImg }) {
  return (
    <section className="bond-link">
      <h2>{title}</h2>
      <nav className="bond-link__links">
        {links.map((link) => {
          return (
            <Link to={link.link}>
              {link.text}
              <img src={linkImg} alt="" />
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
