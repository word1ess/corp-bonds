import CustomLinkArrow from "../../Common/LinkWithArrow/LinkWithArrow";
export default function BondLink({ title, links, linkImg }) {
  return (
    <section className="bond-link">
      <h2>{title}</h2>
      <nav className="bond-link__links">
        {links.map((link) => {
          return <CustomLinkArrow text={link.text} link={link.link} />;
        })}
      </nav>
    </section>
  );
}
