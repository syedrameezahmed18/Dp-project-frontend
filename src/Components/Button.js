import React from 'react'
import { Colors } from '../constants/Colors'

const Button = (props) => {

    const parentStyles = {
        backgroudColor:props.backgroudColor || Colors.primaryColor,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:props.height || "40px",
        minWidth: props.width || "120px",
        borderRadius: props.borderRadius || "20px"
    }

    const childStyles = {
        color: props.color || Colors.whiteColor
    }

    return (
        <div style={parentStyles} onClick={props.onClick}>
            <p style={childStyles}>
                {props.text || "Button"}
            </p>
        </div>
    )
}

export default Button