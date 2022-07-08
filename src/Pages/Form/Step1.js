import React from 'react'
import { Fade } from 'react-reveal'
import Button from '../../Components/Button'

const Step1 = (props) => {
    return (
        <Fade top>
            <div class="step-main">
                <p class="step-heading">Please enter your name</p>
                <input class="step-input" type="text" onChange={e => props.onChange("name",e.target.value)}/>
                <Button text="Next" onClick={props.onClick}/>
            </div>
        </Fade>
    )
}

export default Step1