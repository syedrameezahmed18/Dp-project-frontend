import "./FormStep.css";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Fade } from "react-reveal";

import Button from "../Button/Button";

export default function FormStep(props) {
  const { heading, value, handlers, isDataSending } = props;

  return (
    <Fade right>
      <div className="form-step">
        <div className="form-step__left-arrow-container">
          <BsFillArrowLeftCircleFill
            className="form-step__left-arrow"
            size={40}
            onClick={handlers?.stepDown || null}
          />
        </div>

        {props.children ? (
          props.children
        ) : (
          <div className="form-step__input-container">
            <p className="form-step__input-heading">{heading}</p>
            <input
              className="input-base form-step__input-text"
              type="text"
              value={value}
              onChange={handlers?.inputOnChange}
            />
            <Button
              text="Next"
              size="medium"
              handlers={{ onClick: handlers.stepUp }}
              isDisabled={isDataSending}
            />
          </div>
        )}

        <div className="form-step__right-arrow-container">
          <BsFillArrowRightCircleFill
            className="form-step__right-arrow"
            size={40}
            onClick={handlers?.stepUp || null}
          />
        </div>
      </div>
    </Fade>
  );
}
