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
    if (Array.isArray(bodyItem)) {
      return (
        <td>
          {bodyItem.map((item) => {
            return <TableDataInner innerText={item} />;
          })}
        </td>
      );
    }
    if (typeof bodyItem === "object") {
      if ("link" in bodyItem) {
        return (
          <td>
            <CustomLinkArrow text={bodyItem.text} link={bodyItem.link} />
          </td>
        );
      }

      return (
        <td>
          <TableDataInner innerText={bodyItem.text} />
          <CustomTooltip
            parent={bodyItem?.parent}
            textTooltip={bodyItem.textTooltip}
            place={bodyItem.place}
          />
        </td>
      );
    }
    return (
      <td>
        <TableDataInner innerText={bodyItem} />
      </td>
    );
  }
  function TableDataInner({ innerText }) {
    if (typeof innerText === "number") {
      return <p className={innerText < 0 ? "red" : "green"}>{innerText}%</p>;
    }
    return <p>{innerText}</p>;
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
