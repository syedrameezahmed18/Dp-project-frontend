import { Fade } from "react-reveal";

import "./Welcome.css";

import Button from "../Button/Button";

export default function Welcome(props) {
  const { toggleOnWelcomePage, isDataSending } = props;

  return (
    <Fade top>
      <div className="welcome">
        <h1 className="welcome__heading">
          Welcome to My<span className="welcome__bank-name">Bank</span>
        </h1>
        <div className="welcome__intro-container">
          <h3 className="welcome__intro">
            Let&apos;s get started. Click on button below to create your
            account.
          </h3>
        </div>
        <Button
          text="Start"
          size="large"
          handlers={{ onClick: toggleOnWelcomePage }}
          isDisabled={isDataSending}
        />
      </div>
    </Fade>
  );
}
