import "./Bond.scss";

import linkImg from "../../img/link-arrow.svg";
import { useOutletContext } from "react-router-dom";

import BondHeader from "./BondHeader/BondHeader";
import BondInfo from "./BondInfo/BondInfo";
import BondTables from "./BondTables/BondTables";
import BondChart from "./BondChart/BondChart";
import BondLinks from "./BondLinks/BondLinks";

export default function BondPopup({ bondData }) {
  const isMobile = useOutletContext();
  return (
    <section className="bond">
      <BondHeader bondHeader={bondData.bondHeader} isMobile={isMobile} />
      <BondInfo bondInfoItems={bondData.bondInfo} />
      <BondTables bondTables={bondData.bondTables} isMobile={isMobile} />
      <BondChart isMobile={isMobile} />
      <BondLinks bondLinks={bondData.bondLinks} />
    </section>
  );
}
