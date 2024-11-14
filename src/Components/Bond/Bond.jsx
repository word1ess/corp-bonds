import "./Bond.scss";

import { useBondData } from "../../hooks/useBondData";
import { useOutletContext, useParams } from "react-router-dom";

import BondHeader from "./BondHeader/BondHeader";
import BondInfo from "./BondInfo/BondInfo";
import BondTables from "./BondTables/BondTables";
import BondChart from "./BondChart/BondChart";
import BondLinks from "./BondLinks/BondLinks";
import { useSelector } from "react-redux";

export default function Bond({ isinFromPopup }) {
  const { isMobile } = useOutletContext();
  const { isinUrl } = useParams();
  const { loading, error, bondData } = useBondData(isinFromPopup || isinUrl);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!bondData) return <div>No data</div>;

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
