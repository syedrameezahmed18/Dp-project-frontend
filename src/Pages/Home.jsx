import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountService from "../services/account";

import Button from "../Components/Button/Button";
import FormStep from "../Components/FormStep/FormStep";
import Welcome from "../Components/Welcome/Welcome";

export default function Home() {
  const navigate = useNavigate();

  const [onWelcomePage, setOnWelcomePage] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formDetails, setFormDetails] = useState({
    name: "",
    fatherName: "",
    address: "",
    cnicNum: "",
    age: "",
  });
  const [isAccountCreating, setIsAccountCreating] = useState(false);
  const [isDataSending, setIsDataSending] = useState(false);

  const toggleOnWelcomePage = useCallback(async () => {
    if (onWelcomePage) {
      try {
        setIsDataSending(true);
        await AccountService.createAccountBuilder();

        setIsDataSending(false);
      } catch (error) {
        setIsDataSending(false);

        return alert("Server is down.");
      }
    }
    setOnWelcomePage((prev) => !prev);
  }, [onWelcomePage]);

  const stepUp = useCallback(async () => {
    let result;

    const accountServices = {
      1: {
        formField: formDetails.name,
        service: AccountService.setName({ name: formDetails.name }),
        errorMessage: "Please enter name to continue.",
      },
      2: {
        formField: formDetails.fatherName,
        service: AccountService.setFatherName({
          fatherName: formDetails.fatherName,
        }),
        errorMessage: "Please enter father name to continue.",
      },
      3: {
        formField: formDetails.address,
        service: AccountService.setAddress({ address: formDetails.address }),
        errorMessage: "Please enter address to continue.",
      },
      4: {
        formField: formDetails.cnicNum,
        service: AccountService.setCnicNum({ cnicNum: formDetails.cnicNum }),
        errorMessage: "Please enter CNIC number to continue.",
      },
      5: {
        formField: formDetails.age,
        service: AccountService.setAge({ age: formDetails.age }),
        errorMessage: "Please enter age to continue.",
      },
    };

    async function executeAccountService(serviceType) {
      try {
        setIsDataSending(true);
        result = await accountServices[serviceType].service;
        setIsDataSending(false);
      } catch (error) {
        setIsDataSending(false);
        return alert("Error!\nServer is down.");
      }
    }

    if (!accountServices[currentStep].formField) {
      return alert(accountServices[currentStep].errorMessage);
    }

    await executeAccountService(currentStep);

    // console.log("result:", result);

    if (result?.status && result?.status !== 200) {
      return alert("Error!\nPlease try again");
    }

    setCurrentStep((prev) => prev + 1);
  }, [
    currentStep,
    formDetails.address,
    formDetails.age,
    formDetails.cnicNum,
    formDetails.fatherName,
    formDetails.name,
  ]);

  const stepDown = useCallback(() => {
    if (currentStep === 1) {
      return toggleOnWelcomePage();
    }

    setCurrentStep((prev) => prev - 1);
  }, [currentStep, toggleOnWelcomePage]);

  const handleFormDetails = (event, key) => {
    setFormDetails((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleCreateAccount = useCallback(
    (accountType) => {
      setIsAccountCreating(true);

      setTimeout(async () => {
        try {
          const result = await AccountService.createAccount(accountType);

          setIsAccountCreating(false);

          // console.log("createAccount result:", result);

          const message = result.data;
          alert(message);

          navigate("/account", { replace: true, state: { isRouted: true } });
        } catch (error) {
          // console.log("createAccount error:", error);
          setIsAccountCreating(false);

          const errorMessage = error?.response?.data || error.message;
          alert(errorMessage);
        }
      }, 1000);
    },
    [navigate]
  );

  const formSteps = useCallback(() => {
    const steps = {
      1: (
        <FormStep
          heading="Enter Your Name"
          handlers={{
            stepUp,
            stepDown,
            inputOnChange: (event) => handleFormDetails(event, "name"),
          }}
          value={formDetails.name}
          isDataSending={isDataSending}
        />
      ),
      2: (
        <FormStep
          heading="Enter Your Father's name"
          handlers={{
            stepUp,
            stepDown,
            inputOnChange: (event) => handleFormDetails(event, "fatherName"),
          }}
          value={formDetails.fatherName}
          isDataSending={isDataSending}
        />
      ),
      3: (
        <FormStep
          heading="Enter Your Address"
          handlers={{
            stepUp,
            stepDown,
            inputOnChange: (event) => handleFormDetails(event, "address"),
          }}
          value={formDetails.address}
          isDataSending={isDataSending}
        />
      ),
      4: (
        <FormStep
          heading="Enter Your CNIC number"
          handlers={{
            stepUp,
            stepDown,
            inputOnChange: (event) => handleFormDetails(event, "cnicNum"),
          }}
          value={formDetails.cnicNum}
          isDataSending={isDataSending}
        />
      ),
      5: (
        <FormStep
          heading="Enter Your Age (minimum 18)"
          handlers={{
            stepUp,
            stepDown,
            inputOnChange: (event) => handleFormDetails(event, "age"),
          }}
          value={formDetails.age}
          isDataSending={isDataSending}
        />
      ),
      6: (
        <FormStep
          heading="Choose Account Type"
          handlers={{
            stepUp: () => alert("Choose Account type."),
            stepDown,
          }}
        >
          <div className="form-step__account-type">
            <p className="form-step__account-type-heading">
              Choose Account Type
            </p>

            <div className="form-step__account-type-buttons">
              <Button
                text="Young Saver"
                size="medium"
                handlers={{ onClick: () => handleCreateAccount("youngSaver") }}
              />
              <Button
                text="Current"
                size="medium"
                handlers={{ onClick: () => handleCreateAccount("current") }}
              />
            </div>
          </div>
        </FormStep>
      ),
    };

    return steps[currentStep];
  }, [
    currentStep,
    formDetails.address,
    formDetails.age,
    formDetails.cnicNum,
    formDetails.fatherName,
    formDetails.name,
    handleCreateAccount,
    isDataSending,
    stepDown,
    stepUp,
  ]);

  return (
    <div className="home">
      {onWelcomePage && (
        <Welcome
          toggleOnWelcomePage={toggleOnWelcomePage}
          isDataSending={isDataSending}
        />
      )}
      {!onWelcomePage && !isAccountCreating && formSteps()}
      {isAccountCreating && (
        <p className="home__creating-account">Creating account...</p>
      )}
    </div>
  );
}
