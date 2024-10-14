import { useState } from "react";

export default function BondTable({
  title,
  header,
  body,
  mobile,
  maxCount,
  isMobile,
}) {
  const [tableBody] = useState(body);
  const [tableBodyMobile] = useState(mobile?.body);
  const [tableMaxCount, setTableMaxCount] = useState(maxCount);

  const updateTableMaxCount = (currentCount, maxCount, increment) => {
    return Math.min(currentCount + increment, maxCount);
  };

  const handleBtnMoreClick = () => {
    if (isMobile) {
      setTableMaxCount(
        updateTableMaxCount(tableMaxCount, tableBodyMobile.length, 20)
      );
    }

    setTableMaxCount(updateTableMaxCount(tableMaxCount, tableBody.length, 20));
  };

  function TableHeader({ header, mobileHeader = header }) {
    return (
      <thead>
        {isMobile
          ? mobileHeader.map((headerItem) => {
              return <th>{headerItem}</th>;
            })
          : header.map((headerItem) => {
              return <th>{headerItem}</th>;
            })}
      </thead>
    );
  }
  function TableBody({ body, mobileBody = body, max }) {
    return (
      <tbody>
        {isMobile
          ? mobileBody.map((rowItem, i) => {
              if (i < max) return <TableRowItem bodyArr={rowItem} />;
            })
          : body.map((rowItem, i) => {
              if (i < max) return <TableRowItem bodyArr={rowItem} />;
            })}
      </tbody>
    );
  }
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
          {bodyItem.map((itemText) => {
            return <p>{itemText}</p>;
          })}
        </td>
      );
    }
    return <td>{bodyItem}</td>;
  }
  function TableFooter({ max }) {
    if (max >= tableBody.length) return;
    return (
      <footer className="bond-table__footer">
        Показано строк: {max} из {tableBody.length}
        <button onClick={handleBtnMoreClick}>Показать еще</button>
      </footer>
    );
  }

  return (
    <article className="bond-table">
      <h2>{title}</h2>
      <table>
        <TableHeader header={header} mobileHeader={mobile?.header} />
        <TableBody
          body={tableBody}
          mobileBody={tableBodyMobile}
          max={tableMaxCount}
        />
      </table>
      <TableFooter max={tableMaxCount} />
    </article>
  );
}
