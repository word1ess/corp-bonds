import TableComponent from "./ScreenerTable/ScreenerTable";

import "./Screener.scss";
export default function Screener() {
  return (
    <article className="screener">
      <h1>Скринер</h1>
      <TableComponent />
    </article>
  );
}
