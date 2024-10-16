import bondImg from "./img/1.png";

import BondCard from "./BondCard";
import CustomTooltip from "../../Common/CustomTooltip/CustomTooltip";
import CustomLinkArrow from "../../Common/LinkWithArrow/LinkWithArrow";

export default function BondHeader({ bondHeader, isMobile }) {
  const liquiditySteps = Array(5)
    .fill(false)
    .fill(true, 0, bondHeader.liquidity.stage);

  function BondBigCardHeader({ bondHeader, isMobile }) {
    if (isMobile) {
      return (
        <>
          <header className="bond-big-card__header">
            <div className="bond-big-card__img">
              <img src={bondImg} alt="bondImg" />
            </div>
            <div>
              <h1>{bondHeader.name}</h1>
              <h2>{bondHeader.code}</h2>
              <div className="bond-big-card__emitent">
                <p>Эмитент:</p>

                <CustomLinkArrow
                  text={bondHeader.emitent.text}
                  link={bondHeader.emitent.link}
                />
              </div>
            </div>
          </header>
          <div className="bond-big-card__liquidity">
            <p>Ликвидность:</p>
            <div className="liquidity-steps">
              {liquiditySteps.map((step) => {
                return (
                  <div className={`liquidity-step ${step ? "green" : ""}`} />
                );
              })}
            </div>
            <p>{bondHeader.liquidity.moneyInDay}</p>
          </div>
        </>
      );
    }
    return (
      <header className="bond-big-card__header">
        <div className="bond-big-card__img">
          <img src={bondImg} alt="bondImg" />
        </div>
        <div>
          <h1>{bondHeader.name}</h1>
          <h2>{bondHeader.code}</h2>
          <div className="bond-big-card__emitent">
            <p>Эмитент:</p>

            <CustomLinkArrow
              text={bondHeader.emitent.text}
              link={bondHeader.emitent.link}
            />
          </div>
          <div className="bond-big-card__liquidity">
            <p>Ликвидность:</p>
            <div className="liquidity-steps">
              {liquiditySteps.map((step) => {
                return (
                  <div className={`liquidity-step ${step ? "green" : ""}`} />
                );
              })}
            </div>
            <CustomTooltip parent="liquidity" place="top" />
            <p>{bondHeader.liquidity.moneyInDay}</p>
          </div>
        </div>
      </header>
    );
  }
  function BondBigCardFooter({ isRerender }) {
    if (isRerender) {
      return (
        <>
          <footer className="bond-big-card__footer">
            <button className="bond-big-card__btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.1562 2.04532L6.76446 4.44443H14.7314C14.6136 4.14618 14.431 3.86674 14.1821 3.62174L14.1757 3.6154L12.6225 2.0444C11.6649 1.09601 10.1134 1.09632 9.1562 2.04532ZM5.32508 3.99972L8.21569 1.1002C9.69342 -0.366738 12.0862 -0.366732 13.5639 1.10021L13.5684 1.10459L15.1209 2.67485C15.8087 3.35355 16.1789 4.22219 16.2224 5.12344C16.2321 5.32479 16.1502 5.51972 15.9995 5.65369C15.8489 5.78766 15.6457 5.84627 15.4469 5.81313C15.287 5.78648 15.1072 5.77777 14.8898 5.77777H6.00093C5.78381 5.77777 5.57779 5.79327 5.3823 5.82334C5.13595 5.86125 4.88903 5.75856 4.7422 5.55714C4.59538 5.35572 4.57317 5.08922 4.68464 4.86629C4.84826 4.53905 5.07403 4.25083 5.32508 3.99972C5.3252 3.9996 5.32496 3.99984 5.32508 3.99972Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.22174 12.889C2.62548 12.889 1.33285 14.1816 1.33285 15.7779C1.33285 16.3196 1.48442 16.8297 1.74918 17.2591L1.75477 17.2681L1.7547 17.2682C2.25231 18.1047 3.16762 18.6668 4.22174 18.6668C5.27585 18.6668 6.19116 18.1047 6.68877 17.2682L6.69422 17.259L6.69429 17.2591C6.95905 16.8297 7.11062 16.3196 7.11062 15.7779C7.11062 14.1816 5.81799 12.889 4.22174 12.889ZM-0.000488281 15.7779C-0.000488281 13.4453 1.8891 11.5557 4.22174 11.5557C6.55437 11.5557 8.44396 13.4453 8.44396 15.7779C8.44396 16.5677 8.22324 17.3181 7.83197 17.9544C7.10229 19.1775 5.76125 20.0001 4.22174 20.0001C2.68221 20.0001 1.34117 19.1775 0.611494 17.9544C0.220224 17.318 -0.000488281 16.5677 -0.000488281 15.7779Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.23096 15.7599C2.23096 15.3917 2.52943 15.0933 2.89762 15.0933H5.54651C5.9147 15.0933 6.21318 15.3917 6.21318 15.7599C6.21318 16.1281 5.9147 16.4266 5.54651 16.4266H2.89762C2.52943 16.4266 2.23096 16.1281 2.23096 15.7599Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.21916 13.7954C4.58735 13.7954 4.88582 14.0939 4.88582 14.4621V17.1198C4.88582 17.488 4.58735 17.7865 4.21916 17.7865C3.85097 17.7865 3.55249 17.488 3.55249 17.1198V14.4621C3.55249 14.0939 3.85097 13.7954 4.21916 13.7954Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.00027 5.77767C5.78316 5.77767 5.57714 5.79317 5.38164 5.82325L5.36328 5.82581C4.37899 5.94933 3.60524 6.37075 3.07542 6.99235C2.54425 7.61555 2.22249 8.48244 2.22249 9.55545V12.0603C2.8161 11.7392 3.49675 11.5554 4.22249 11.5554C6.55513 11.5554 8.44472 13.445 8.44472 15.7777C8.44472 16.4956 8.26235 17.1809 7.93528 17.7777H14.8892C16.071 17.7777 17.0041 17.3866 17.64 16.7507C18.2759 16.1148 18.6669 15.1817 18.6669 13.9999V9.55545C18.6669 8.47518 18.3396 7.60288 17.8 6.97766C17.2617 6.35386 16.4759 5.93359 15.4788 5.81764C15.4679 5.81637 15.4571 5.81484 15.4462 5.81303C15.2863 5.78638 15.1065 5.77767 14.8892 5.77767H6.00027ZM5.18812 4.50401C5.45194 4.46393 5.72284 4.44434 6.00027 4.44434H14.8892C15.1289 4.44434 15.3876 4.45301 15.6487 4.4951C16.9381 4.64855 18.0354 5.20958 18.8094 6.10655C19.5854 7.00579 20.0003 8.20016 20.0003 9.55545V13.9999C20.0003 15.4847 19.5024 16.7739 18.5828 17.6935C17.6632 18.6132 16.374 19.111 14.8892 19.111H6.56027C6.27998 19.111 6.02962 18.9357 5.93378 18.6723C5.83795 18.4089 5.91711 18.1137 6.13186 17.9335C6.34782 17.7524 6.53819 17.5274 6.68664 17.2729L6.69505 17.2589C6.95981 16.8295 7.11138 16.3193 7.11138 15.7777C7.11138 14.1814 5.81875 12.8888 4.22249 12.8888C3.35715 12.8888 2.58528 13.27 2.05642 13.8713C1.8732 14.0796 1.58012 14.1527 1.32055 14.0548C1.06097 13.9569 0.88916 13.7084 0.88916 13.431V9.55545C0.88916 8.21068 1.2963 7.02424 2.06068 6.12744C2.8246 5.23117 3.90971 4.66647 5.18812 4.50401Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.2214 11.7779C14.2214 10.432 15.3199 9.3335 16.6659 9.3335H19.3325C19.7007 9.3335 19.9992 9.63197 19.9992 10.0002C19.9992 10.3684 19.7007 10.6668 19.3325 10.6668H16.6659C16.0563 10.6668 15.5548 11.1684 15.5548 11.7779C15.5548 12.3875 16.0563 12.8891 16.6659 12.8891H19.3325C19.7007 12.8891 19.9992 13.1875 19.9992 13.5557C19.9992 13.9239 19.7007 14.2224 19.3325 14.2224H16.6659C15.3199 14.2224 14.2214 13.1239 14.2214 11.7779Z"
                  fill="white"
                />
              </svg>
              Добавить в портфель
            </button>
            <button className="bond-big-card__favorite">
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1156 0.67634C10.4908 -0.0348065 11.5092 -0.0348074 11.8844 0.676339L14.4383 5.51685C14.583 5.79109 14.8468 5.9827 15.1523 6.03557L20.5451 6.96865C21.3374 7.10574 21.6521 8.07437 21.0917 8.65097L17.2773 12.5757C17.0612 12.798 16.9604 13.108 17.0046 13.415L17.7836 18.8322C17.8981 19.628 17.0741 20.2267 16.3526 19.8719L11.4412 17.457C11.163 17.3201 10.837 17.3201 10.5588 17.457L5.64744 19.8719C4.92589 20.2267 4.10192 19.628 4.21637 18.8322L4.99542 13.415C5.03955 13.108 4.93882 12.798 4.72271 12.5757L0.908307 8.65097C0.347911 8.07438 0.662639 7.10574 1.45492 6.96865L6.84771 6.03557C7.15325 5.9827 7.41698 5.79109 7.56167 5.51685L10.1156 0.67634Z"
                  fill="#3AB54A"
                />
              </svg>
            </button>
            <button className="bond-big-card__share">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 4.5C19 6.15685 17.6569 7.5 16 7.5C14.3431 7.5 13 6.15685 13 4.5C13 2.84315 14.3431 1.5 16 1.5C17.6569 1.5 19 2.84315 19 4.5Z"
                  fill="#647383"
                  stroke="#647383"
                  stroke-width="1.5"
                />
                <path
                  d="M7 10C7 11.6569 5.65685 13 4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C5.65685 7 7 8.34315 7 10Z"
                  fill="#647383"
                  stroke="#647383"
                  stroke-width="1.5"
                />
                <path
                  d="M19 15.5C19 17.1569 17.6569 18.5 16 18.5C14.3431 18.5 13 17.1569 13 15.5C13 13.8431 14.3431 12.5 16 12.5C17.6569 12.5 19 13.8431 19 15.5Z"
                  fill="#647383"
                  stroke="#647383"
                  stroke-width="1.5"
                />
                <path
                  d="M6.72852 8.74995L13.2285 5.75049M6.72852 11.2505L13.2285 14.25"
                  stroke="#647383"
                  stroke-width="1.5"
                />
              </svg>
            </button>
          </footer>
          <CustomLinkArrow text="Обзоры эмитента от CorpBonds" type="bottom" />
        </>
      );
    }
    return (
      <footer className="bond-big-card__footer">
        <button className="bond-big-card__btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.1562 2.04532L6.76446 4.44443H14.7314C14.6136 4.14618 14.431 3.86674 14.1821 3.62174L14.1757 3.6154L12.6225 2.0444C11.6649 1.09601 10.1134 1.09632 9.1562 2.04532ZM5.32508 3.99972L8.21569 1.1002C9.69342 -0.366738 12.0862 -0.366732 13.5639 1.10021L13.5684 1.10459L15.1209 2.67485C15.8087 3.35355 16.1789 4.22219 16.2224 5.12344C16.2321 5.32479 16.1502 5.51972 15.9995 5.65369C15.8489 5.78766 15.6457 5.84627 15.4469 5.81313C15.287 5.78648 15.1072 5.77777 14.8898 5.77777H6.00093C5.78381 5.77777 5.57779 5.79327 5.3823 5.82334C5.13595 5.86125 4.88903 5.75856 4.7422 5.55714C4.59538 5.35572 4.57317 5.08922 4.68464 4.86629C4.84826 4.53905 5.07403 4.25083 5.32508 3.99972C5.3252 3.9996 5.32496 3.99984 5.32508 3.99972Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.22174 12.889C2.62548 12.889 1.33285 14.1816 1.33285 15.7779C1.33285 16.3196 1.48442 16.8297 1.74918 17.2591L1.75477 17.2681L1.7547 17.2682C2.25231 18.1047 3.16762 18.6668 4.22174 18.6668C5.27585 18.6668 6.19116 18.1047 6.68877 17.2682L6.69422 17.259L6.69429 17.2591C6.95905 16.8297 7.11062 16.3196 7.11062 15.7779C7.11062 14.1816 5.81799 12.889 4.22174 12.889ZM-0.000488281 15.7779C-0.000488281 13.4453 1.8891 11.5557 4.22174 11.5557C6.55437 11.5557 8.44396 13.4453 8.44396 15.7779C8.44396 16.5677 8.22324 17.3181 7.83197 17.9544C7.10229 19.1775 5.76125 20.0001 4.22174 20.0001C2.68221 20.0001 1.34117 19.1775 0.611494 17.9544C0.220224 17.318 -0.000488281 16.5677 -0.000488281 15.7779Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.23096 15.7599C2.23096 15.3917 2.52943 15.0933 2.89762 15.0933H5.54651C5.9147 15.0933 6.21318 15.3917 6.21318 15.7599C6.21318 16.1281 5.9147 16.4266 5.54651 16.4266H2.89762C2.52943 16.4266 2.23096 16.1281 2.23096 15.7599Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.21916 13.7954C4.58735 13.7954 4.88582 14.0939 4.88582 14.4621V17.1198C4.88582 17.488 4.58735 17.7865 4.21916 17.7865C3.85097 17.7865 3.55249 17.488 3.55249 17.1198V14.4621C3.55249 14.0939 3.85097 13.7954 4.21916 13.7954Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.00027 5.77767C5.78316 5.77767 5.57714 5.79317 5.38164 5.82325L5.36328 5.82581C4.37899 5.94933 3.60524 6.37075 3.07542 6.99235C2.54425 7.61555 2.22249 8.48244 2.22249 9.55545V12.0603C2.8161 11.7392 3.49675 11.5554 4.22249 11.5554C6.55513 11.5554 8.44472 13.445 8.44472 15.7777C8.44472 16.4956 8.26235 17.1809 7.93528 17.7777H14.8892C16.071 17.7777 17.0041 17.3866 17.64 16.7507C18.2759 16.1148 18.6669 15.1817 18.6669 13.9999V9.55545C18.6669 8.47518 18.3396 7.60288 17.8 6.97766C17.2617 6.35386 16.4759 5.93359 15.4788 5.81764C15.4679 5.81637 15.4571 5.81484 15.4462 5.81303C15.2863 5.78638 15.1065 5.77767 14.8892 5.77767H6.00027ZM5.18812 4.50401C5.45194 4.46393 5.72284 4.44434 6.00027 4.44434H14.8892C15.1289 4.44434 15.3876 4.45301 15.6487 4.4951C16.9381 4.64855 18.0354 5.20958 18.8094 6.10655C19.5854 7.00579 20.0003 8.20016 20.0003 9.55545V13.9999C20.0003 15.4847 19.5024 16.7739 18.5828 17.6935C17.6632 18.6132 16.374 19.111 14.8892 19.111H6.56027C6.27998 19.111 6.02962 18.9357 5.93378 18.6723C5.83795 18.4089 5.91711 18.1137 6.13186 17.9335C6.34782 17.7524 6.53819 17.5274 6.68664 17.2729L6.69505 17.2589C6.95981 16.8295 7.11138 16.3193 7.11138 15.7777C7.11138 14.1814 5.81875 12.8888 4.22249 12.8888C3.35715 12.8888 2.58528 13.27 2.05642 13.8713C1.8732 14.0796 1.58012 14.1527 1.32055 14.0548C1.06097 13.9569 0.88916 13.7084 0.88916 13.431V9.55545C0.88916 8.21068 1.2963 7.02424 2.06068 6.12744C2.8246 5.23117 3.90971 4.66647 5.18812 4.50401Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.2214 11.7779C14.2214 10.432 15.3199 9.3335 16.6659 9.3335H19.3325C19.7007 9.3335 19.9992 9.63197 19.9992 10.0002C19.9992 10.3684 19.7007 10.6668 19.3325 10.6668H16.6659C16.0563 10.6668 15.5548 11.1684 15.5548 11.7779C15.5548 12.3875 16.0563 12.8891 16.6659 12.8891H19.3325C19.7007 12.8891 19.9992 13.1875 19.9992 13.5557C19.9992 13.9239 19.7007 14.2224 19.3325 14.2224H16.6659C15.3199 14.2224 14.2214 13.1239 14.2214 11.7779Z"
              fill="white"
            />
          </svg>
          Добавить в портфель
        </button>

        <CustomLinkArrow text="Обзоры эмитента от CorpBonds" type="bottom" />
        <button className="bond-big-card__favorite">
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.1156 0.67634C10.4908 -0.0348065 11.5092 -0.0348074 11.8844 0.676339L14.4383 5.51685C14.583 5.79109 14.8468 5.9827 15.1523 6.03557L20.5451 6.96865C21.3374 7.10574 21.6521 8.07437 21.0917 8.65097L17.2773 12.5757C17.0612 12.798 16.9604 13.108 17.0046 13.415L17.7836 18.8322C17.8981 19.628 17.0741 20.2267 16.3526 19.8719L11.4412 17.457C11.163 17.3201 10.837 17.3201 10.5588 17.457L5.64744 19.8719C4.92589 20.2267 4.10192 19.628 4.21637 18.8322L4.99542 13.415C5.03955 13.108 4.93882 12.798 4.72271 12.5757L0.908307 8.65097C0.347911 8.07438 0.662639 7.10574 1.45492 6.96865L6.84771 6.03557C7.15325 5.9827 7.41698 5.79109 7.56167 5.51685L10.1156 0.67634Z"
              fill="#3AB54A"
            />
          </svg>
        </button>
        <button className="bond-big-card__share">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 4.5C19 6.15685 17.6569 7.5 16 7.5C14.3431 7.5 13 6.15685 13 4.5C13 2.84315 14.3431 1.5 16 1.5C17.6569 1.5 19 2.84315 19 4.5Z"
              fill="#647383"
              stroke="#647383"
              stroke-width="1.5"
            />
            <path
              d="M7 10C7 11.6569 5.65685 13 4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C5.65685 7 7 8.34315 7 10Z"
              fill="#647383"
              stroke="#647383"
              stroke-width="1.5"
            />
            <path
              d="M19 15.5C19 17.1569 17.6569 18.5 16 18.5C14.3431 18.5 13 17.1569 13 15.5C13 13.8431 14.3431 12.5 16 12.5C17.6569 12.5 19 13.8431 19 15.5Z"
              fill="#647383"
              stroke="#647383"
              stroke-width="1.5"
            />
            <path
              d="M6.72852 8.74995L13.2285 5.75049M6.72852 11.2505L13.2285 14.25"
              stroke="#647383"
              stroke-width="1.5"
            />
          </svg>
        </button>
      </footer>
    );
  }

  return (
    <header className="bond-header">
      <section className="bond-big-card">
        <BondBigCardHeader bondHeader={bondHeader} isMobile={isMobile} />
        <BondBigCardFooter
          isRerender={window.screen.width < 1600 ? true : false}
        />
      </section>
      <main className="bond-cards">
        <BondCard title="YTM" body={bondHeader.ytm} />
        <BondCard
          title="М спред"
          body={bondHeader.spreds.m}
          isTextGreen={true}
        />
        <BondCard
          title="G спред"
          body={bondHeader.spreds.g}
          isTextGreen={true}
        />
        <BondCard
          title="Цена"
          body={bondHeader.price}
          additionalClass="text-big"
        />
        <BondCard title="Срок, лет" body={bondHeader.years.term} />
        <BondCard title="Дюрация, лет" body={bondHeader.years.duration} />
        <BondCard title="Рейтинг" body={bondHeader.rating} />
        <BondCard title="Тип" body={bondHeader.type} />
      </main>
    </header>
  );
}
