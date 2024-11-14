import BondLink from "./BondLink";

export default function BondLinks({ bondLinks, linkImg }) {
  return (
    <section className="bond-links">
      {bondLinks?.map((bondLinkBlock) => {
        return (
          <BondLink
            title={bondLinkBlock.title}
            links={bondLinkBlock.body}
            linkImg={linkImg}
          />
        );
      })}
    </section>
  );
}
