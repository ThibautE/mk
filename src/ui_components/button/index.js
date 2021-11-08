import React from "react";
import { styled } from '@mui/system';
import { Button } from "@mui/material";

const EditButton = styled(Button)`
    text-transform: capitalize;
    border-radius: 20px;
    width: 30%;
    border: 2px solid #232323;
    &:hover {
        ${props => props.fill ? 
            `background-color: #fff;
            color: #242424`
            : 
            `background-color: #242424;
            color: #fff`
        };
    }
    ${props => props.fill ? 
        `background-color: #242424;
        color: #fff`
        : 
        `background-color: #fff;
        color: #242424`
    };
`;

const ButtonUI = ({children, component, to, onClick, fill, style}) => {

    return (
        <EditButton fill={fill? 1 : 0} component={component} to={to} onClick={onClick} style={style}>
            { children }
        </EditButton>
    );
}

export default ButtonUI;
