import React from 'react'
import Button from '../../Components/Button'

const WelcomeStep = (props) => {
    return (
        <div>
            <p>
                Welcome to the application
            </p>
            <p>Let us begin our journey</p>
            <Button
                text="Start"
                onClick={props.onClick}
            />
        </div>
    )
}

export default WelcomeStep