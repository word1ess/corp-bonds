import CustomTooltip from "../../Common/CustomTooltip/CustomTooltip";
import CustomLinkArrow from "../../Common/LinkWithArrow/LinkWithArrow";

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
    console.log(Object.keys(bodyItem));

    if (Array.isArray(bodyItem)) {
      return (
        <td>
          {bodyItem.map((item) => {
            return <p>{item}</p>;
          })}
        </td>
      );
    }
    if (typeof bodyItem === "object") {
      return (
        <td>
          <p>{bodyItem.text}</p>
          <CustomTooltip
            parent={bodyItem?.parent}
            textTooltip={bodyItem.textTooltip}
            place={bodyItem.place}
          />
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
          return <CustomLinkArrow text={link.text} link={link.link} />;
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
