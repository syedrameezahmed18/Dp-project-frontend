import React from 'react'
import Button from '../../Components/Button'
import { Colors } from '../../constants/Colors'
import {Fade} from 'react-reveal'

const WelcomeStep = (props) => {
    return (
       <Fade top>
        <div className='step-main'>
            <p class="step-heading" style={{color:Colors.primaryColor}}>
                Welcome to the application
            </p>
            <p class="step-mini-heading">Let us begin our journey</p>
            <Button
                text="Start"
                onClick={props.onClick}
                backgroundColor={Colors.primaryColor}
                width={'120px'}
            />
        </div>
        </Fade>
    )
}

export default WelcomeStep