import React, { useState, useEffect } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import WelcomeStep from './WelcomeStep'
import "./../../css/MainStep.css"
import { Fade } from 'react-reveal'

const MainStep = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const [formDetails, setFormDetails] = useState({
        name: ''
    })

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

    console.log('form details are', formDetails)

    return (
        <div class="main-app">

            {
                currentStep === 1 ?
                    (<>
                        <Fade top>
                            <Step1 currentVal={formDetails.name} onChange={onChangeForm} onClickTop={stepDown} onClickBottom={stepUp} /> :
                        </Fade>
                    </>) :
                    currentStep === 2 ?
                        (<>
                            <Fade left>
                                <Step2 currentVal={formDetails.fatherName} prevVal={formDetails.name} onChange={onChangeForm} onClickTop={stepDown} onClickBottom={stepUp} /> :
                            </Fade>

                        </>) :

                        currentStep === 3 ?

                            (<>
                                <Fade top>
                                    <Step3 currentVal={formDetails.address} onChange={onChangeForm} onClickTop={stepDown} onClickBottom={stepUp} /> :
                                </Fade>
                            </>) :

                            currentStep === 4 ?

                                (<>
                                    <Fade top>
                                        <Step4 currentVal={formDetails.cnicNum} onChange={onChangeForm} onClickTop={stepDown} onClickBottom={stepUp} /> :
                                    </Fade>
                                </>) :

                                currentStep === 5 ?

                                    (<>
                                        <Fade top>
                                            <Step5 currentVal={formDetails.age} onChange={onChangeForm} onClickTop={stepDown} onClickBottom={stepUp} /> :
                                        </Fade>
                                    </>) :

                                    currentStep === 6 ?

                                    (<>
                                        <Fade top>
                                            <Step6 currentVal={formDetails.age} onChange={onChangeForm} onClickTop={stepDown} onClickBottom={stepUp} />
                                        </Fade>
                                    </>) :

                                        <WelcomeStep onClick={stepUp} />

            }

        </div>
    )
}

export default MainStep