import React from "react";
import { styled } from '@mui/system';
import { CircularProgress } from "@mui/material";

const LoaderDiv = styled('div')`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const LoaderUI = () => {

    return (
        <LoaderDiv>
            <CircularProgress />
        </LoaderDiv>
    );
}

export default LoaderUI;
