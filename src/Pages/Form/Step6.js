import React from 'react'

import { Colors } from '../../constants/Colors'
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import "./../../css/MainStep.css"
import Button from '../../Components/Button'

const Step6 = (props) => {
  return (
    <div class="step-main-inputdiv">

    <div style={{ cursor: 'pointer' }} onClick={props.onClickTop}>
        <BsFillArrowUpCircleFill color={Colors.primaryColor} size={30} />
    </div>
    <p class="step-heading-light" style={{ color: Colors.blackColor }}>{`Choose your account`}</p>

    <div class="buttons-cont">
        <Button text="Young Savers" backgroundColor={Colors.primaryColor} color={Colors.whiteColor}/>
        <Button text="Current" marginLeft="20px" backgroundColor={Colors.whiteColor} color={Colors.primaryColor} isBorder={true} borderColor={Colors.primaryColor}/>
    </div>


    <div style={{ cursor: 'pointer' }} onClick={props.onClickBottom}>
        <BsFillArrowDownCircleFill color={Colors.primaryColor} size={30} />
    </div>

</div>
  )
}

export default Step6