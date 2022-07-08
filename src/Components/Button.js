import React from 'react'
import { Colors } from '../constants/Colors'

const Button = (props) => {

    const parentStyles = {
        background:props.backgroundColor || Colors.primaryColor,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:props.height || "40px",
        width: props.width || "120px",
        borderRadius: props.borderRadius || "20px",

        cursor:'pointer',
        marginLeft:props.marginLeft || '0px'
    }

    const specialStyles = {
        background:props.backgroundColor || Colors.primaryColor,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:props.height || "40px",
        width: props.width || "120px",
        borderRadius: props.borderRadius || "20px",
        border:`2px solid ${props.borderColor}`,
        cursor:'pointer',
        marginLeft:props.marginLeft || '0px'
    }

    const childStyles = {
        color: props.color || Colors.whiteColor
    }

    return (
        <>
        {
            props.isBorder ? (
                <div style={specialStyles} onClick={props.onClick}>
            <p style={childStyles}>
                {props.text || "Button"}
            </p>
        </div>
            ):
            <div style={parentStyles} onClick={props.onClick}>
            <p style={childStyles}>
                {props.text || "Button"}
            </p>
        </div>
        }


        </>
    )
}

export default Button