import BondTable from "./BondTable";

export default function BondTables({ bondTables, isMobile }) {
  if (!bondTables) return;

  return (
    <section className="bond-tables">
      <BondTable
        title={bondTables.pay.title}
        header={bondTables.pay.header}
        body={bondTables.pay.body}
        mobile={bondTables.pay.mobile}
        maxCount={bondTables.pay.maxCountOnce}
        isMobile={isMobile}
      />
      <BondTable
        title={bondTables.actions.title}
        header={bondTables.actions.header}
        body={bondTables.actions.body}
        maxCount={bondTables.actions.maxCountOnce}
        isMobile={isMobile}
      />
    </section>
  );
}
