import BondInfoItem from "../BondInfoItem/BondInfoItem";

export default function BondInfo({ bondInfoItems, linkImg }) {
  return (
    <main className="bond-info">
      {bondInfoItems.map((item) => {
        return (
          <BondInfoItem
            title={item.title}
            body={item.body}
            links={item.links}
            linkImg={linkImg}
          />
        );
      })}
    </main>
  );
}
