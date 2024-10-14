import "./Bond.scss";

// import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import linkImg from "../../img/link-arrow.svg";

import BondHeader from "./BondHeader/BondHeader";
import BondInfo from "./BondInfo/BondInfo";
import BondTables from "./BondTables/BondTables";
import BondChart from "./BondChart/BondChart";
import BondLinks from "./BondLinks/BondLinks";

export default function Bond() {
  const isMobile = useOutletContext();
  const bondData = useSelector((state) => state.bond);

  return (
    <section className="bond">
      <BondHeader
        bondHeader={bondData.bondHeader}
        linkImg={linkImg}
        isMobile={isMobile}
      />
      <BondInfo bondInfoItems={bondData.bondInfo} linkImg={linkImg} />
      <BondTables bondTables={bondData.bondTables} isMobile={isMobile} />
      <BondChart isMobile={isMobile} />
      <BondLinks bondLinks={bondData.bondLinks} linkImg={linkImg} />
    </section>
  );
}
