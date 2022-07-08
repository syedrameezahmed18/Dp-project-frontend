import React, { useState, useEffect } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import WelcomeStep from './WelcomeStep'
import "./../../css/MainStep.css"

const MainStep = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const [formDetails, setFormDetails] = useState({})

    const stepUp = () => {
        if (currentStep < 6) {
            setCurrentStep(currentStep + 1)
        }
        else return
    }

    const stepDown = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
        else return
    }

    const onChangeForm = (key, val) => {
        setFormDetails((prev) => ({
            ...prev,
            [key]: val
        }))
    }

    return (
        <div class="main-app">
            <div class="main-inner-div">
                {
                    currentStep === 1 ?

                        <Step1 onChange={onChangeForm} onClick={stepUp}/> :

                        currentStep === 2 ?

                            <Step2 /> :

                            currentStep === 3 ?

                                <Step3 /> :

                                currentStep === 4 ?

                                    <Step4 /> :

                                    currentStep === 5 ?

                                        <Step5 /> :

                                        currentStep === 6 ?

                                            <Step6 /> :

                                            <WelcomeStep onClick={stepUp} />

                }
            </div>
        </div>
    )
}

export default MainStep