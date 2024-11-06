import "./Bond.scss";

// import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import BondHeader from "./BondHeader/BondHeader";
import BondInfo from "./BondInfo/BondInfo";
import BondTables from "./BondTables/BondTables";
import BondChart from "./BondChart/BondChart";
import BondLinks from "./BondLinks/BondLinks";

export default function Bond({ bondDataProps }) {
  const isMobile = useOutletContext();
  // Всегда вызываем useSelector для получения данных
  const bondDataFromStore = useSelector((state) => state.bond.bonds[0]);

  // Используем bondDataProps, если он передан, иначе используем данные из Redux
  const bondData = bondDataProps || bondDataFromStore;

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
