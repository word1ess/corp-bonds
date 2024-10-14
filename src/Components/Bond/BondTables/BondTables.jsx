import BondTable from "./BondTable";

export default function BondTables({ bondTables, isMobile }) {
  return (
    <section className="bond-tables">
      {bondTables.map((bondTable) => {
        return (
          <BondTable
            title={bondTable.title}
            header={bondTable.header}
            body={bondTable.body}
            mobile={bondTable.mobile}
            maxCount={bondTable.maxCountOnce}
            isMobile={isMobile}
          />
        );
      })}
    </section>
  );
}
