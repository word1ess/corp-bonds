import { Link } from "react-router-dom";

export default function BondInfoItem({ title, body, links = null, linkImg }) {
  function TableRowItem({ bodyArr }) {
    return (
      <tr>
        {bodyArr.map((bodyItem) => {
          return <TableDataItem bodyItem={bodyItem} />;
        })}
      </tr>
    );
  }
  function TableDataItem({ bodyItem }) {
    if (Array.isArray(bodyItem)) {
      return (
        <td>
          {bodyItem.map((item) => {
            return <p>{item}</p>;
          })}
        </td>
      );
    }
    return <td>{bodyItem}</td>;
  }
  function Links({ links }) {
    if (!Array.isArray(links)) {
      return;
    }
    return (
      <div className="bond-info__links">
        {links.map((link) => {
          return (
            <Link to={link.link}>
              {link.text} <img src={linkImg} alt="" />
            </Link>
          );
        })}
      </div>
    );
  }
  return (
    <article className="bond-info__item">
      <h2>{title}</h2>
      <table>
        <tbody>
          {body.map((tableRow) => {
            return <TableRowItem bodyArr={tableRow} />;
          })}
        </tbody>
      </table>
      <Links links={links} />
    </article>
  );
}
