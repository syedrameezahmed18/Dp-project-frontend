import React from 'react'

import { Colors } from '../../constants/Colors'
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import "./../../css/MainStep.css"


const Step2 = (props) => {
    return (
        <div class="step-main-inputdiv">

            <div style={{ cursor: 'pointer' }} onClick={props.onClickTop}>
                <BsFillArrowUpCircleFill color={Colors.primaryColor} size={30} />
            </div>
            <p class="step-heading-light" style={{ color: Colors.blackColor }}>{`Hello ${props.prevVal || "User"}, enter your father's name`}</p>
            <input value={props.currentVal} className="step-input" type="text" onChange={e => props.onChange("fatherName", e.target.value)} />

            <div style={{ cursor: 'pointer' }} onClick={props.onClickBottom}>
                <BsFillArrowDownCircleFill color={Colors.primaryColor} size={30} />
            </div>

        </div>
    )
}

export default Step2