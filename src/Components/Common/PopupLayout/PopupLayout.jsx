import { Link, useOutletContext } from "react-router-dom";
import "./PopupLayout.scss";

export default function PopupLayout({
  isPopupOpen,
  handleCloseClick,
  children,
  isin = false,
}) {
  isPopupOpen
    ? document.querySelector(".header").classList.add("popup-open")
    : document.querySelector(".header").classList.remove("popup-open");

  return (
    <div className="popup-overlay" onClick={handleCloseClick}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-btns">
          {isin && (
            <Link
              className="popup-fullscreen"
              to={`/bond/${isin}`}
              onClick={handleCloseClick}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0911 3.91187C20.1702 3.99135 20.2299 4.0828 20.2702 4.18037C20.3107 4.27789 20.3331 4.38477 20.3335 4.49685V4.49935V9.49935C20.3335 9.95958 19.9604 10.3327 19.5001 10.3327C19.0399 10.3327 18.6668 9.95958 18.6668 9.49935V6.51119L14.2561 10.9219C13.9306 11.2473 13.403 11.2473 13.0776 10.9219C12.7521 10.5965 12.7521 10.0689 13.0776 9.74342L17.4883 5.33268H14.5001C14.0399 5.33268 13.6668 4.95958 13.6668 4.49935C13.6668 4.03912 14.0399 3.66602 14.5001 3.66602H19.5C19.7292 3.66602 19.937 3.75857 20.0876 3.90833L20.0911 3.91187Z"
                  stroke-width="0.01"
                />
                <path
                  d="M10.9227 14.2546L6.51192 18.6653H9.50008C9.96032 18.6653 10.3334 19.0384 10.3334 19.4987C10.3334 19.9589 9.96032 20.332 9.50008 20.332H4.50066H4.49758C4.28592 20.3313 4.07445 20.2506 3.9126 20.0897L3.90906 20.0862C3.83004 20.0067 3.77035 19.9153 3.72998 19.8177C3.68924 19.7194 3.66675 19.6117 3.66675 19.4987V14.4987C3.66675 14.0384 4.03985 13.6653 4.50008 13.6653C4.96031 13.6653 5.33341 14.0384 5.33341 14.4987V17.4868L9.74416 13.0761C10.0696 12.7507 10.5972 12.7507 10.9227 13.0761C11.2481 13.4015 11.2481 13.9292 10.9227 14.2546Z"
                  stroke-width="0.01"
                />
              </svg>
            </Link>
          )}
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
        </div>

        {children}
      </div>
    </div>
  );
}
