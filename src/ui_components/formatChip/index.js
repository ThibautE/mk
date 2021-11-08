import React from "react";
import { styled } from '@mui/system';
import { Chip } from "@mui/material";

const Format = styled(Chip)`
    background-color: #cfd4da;
    margin-left: 5px;
    border: none;
    border-radius: 99px;
    height: 26px;
    font-size: 12px;
    & > span {
        padding: 1px 10px 0 10px;
    }
`;

const FormatChip = ({format, onClick}) => {
    
    return (
        <Format onClick={onClick} label={`${format.width}x${format.height}`} />
    );
}

export default FormatChip;
