import "./BankCard.css";

import VisaLogo from "../../assets/icons/Visa-logo.png";
import MasterCardLogo from "../../assets/icons/MasterCard-logo.png";

export default function BankCard(props) {
  const { cardType, cardVariant, cardNumber, cardHolderName, cardValidity } =
    props;

  return (
    <div className={`bank-card bank-card--${cardVariant}`}>
      <div className="bank-card__header">
        <p className="bank-card__bank-name">
          My<span>Bank</span>
        </p>
        <p className="bank-card__card-type">{cardType}</p>
      </div>

      <div className="bank-card__details">
        <p className="bank-card__card-number">{cardNumber}</p>
        <div className="bank-card__card-validity">
          <p className="bank-card__card-validity-text">VALID THRU</p>
          <p className="bank-card__card-validity-date-format">DD-MM</p>
          <p className="bank-card__card-validity-date">{cardValidity}</p>
        </div>
        <p className="bank-card__card-holder-name">{cardHolderName}</p>
        <div className="bank-card__card-scheme-container">
          <div
            className={`bank-card__card-scheme bank-card__card-scheme--${cardType}`}
          >
            <img
              src={cardType === "Debit" ? VisaLogo : MasterCardLogo}
              alt="VISA"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
