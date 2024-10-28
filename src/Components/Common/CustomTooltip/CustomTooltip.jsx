import "./CustomTooltip.scss";

import { Tooltip } from "react-tooltip";

export default function CustomTooltip({
  parent,
  textTooltip = "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  place = "top",
  type = "question",
}) {
  if (type === "question") {
    return (
      <>
        <a
          href="#"
          className={`${parent} tooltip`}
          data-tooltip-id={parent}
          data-tooltip-content={textTooltip}
        >
          ?
        </a>
        <Tooltip anchorSelect={`.${parent}`} place={place} variant="light" />
      </>
    );
  }
  return (
    <>
      <a
        href="#"
        className={`${parent} tooltip tooltip-plus`}
        data-tooltip-id={parent}
        data-tooltip-content={textTooltip}
      >
        +
      </a>
      <Tooltip anchorSelect={`.${parent}`} place={place} variant="light" />
    </>
  );
}
