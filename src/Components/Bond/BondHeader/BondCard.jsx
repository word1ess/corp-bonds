export default function BondCard({
  title,
  body,
  isTextGreen = false,
  additionalClass = "",
}) {
  function BondCardBody({ body }) {
    if (typeof body === "object" && !Array.isArray(body)) {
      // Отображение объекта
      return (
        <div className="text-with-date">
          {Object.entries(body).map(([key, value]) => {
            return <p>{value}</p>;
          })}
        </div>
      );
    }
    if (Array.isArray(body) && body.every((item) => typeof item === "object")) {
      // Отображение массива объектов в одной строке
      return (
        <div className="text text-rating">
          {body.map((item, index) => (
            <p>
              {Object.entries(item)
                .map(([key, value]) => `${value} `)
                .join("")}
            </p>
          ))}
        </div>
      );
    }
    if (Array.isArray(body)) {
      // Отображение простого массива
      return (
        <div className={`text ${isTextGreen ? "green" : ""}`}>
          {body.map((text) => {
            return <p>{text}</p>;
          })}
        </div>
      );
    }
    return <p className={`text ${isTextGreen ? "green" : ""}`}>{body}</p>;
  }
  return (
    <article className={`bond-card ${additionalClass}`}>
      <h3>{title}</h3>
      <BondCardBody body={body} />
    </article>
  );
}
