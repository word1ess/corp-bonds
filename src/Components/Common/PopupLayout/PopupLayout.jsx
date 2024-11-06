import { useState } from "react";
import "./PopupLayout.scss";

export default function PopupLayout({
  isPopupOpen,
  handleCloseClick,
  children,
}) {
  isPopupOpen
    ? document.querySelector(".header").classList.add("popup-open")
    : document.querySelector(".header").classList.remove("popup-open");

  return (
    <div className="popup-overlay" onClick={handleCloseClick}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-close" onClick={handleCloseClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.63672 6L18.3646 18.7279"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M5.63672 19L18.3646 6.27208"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}
