import React from "react";
import { styled } from '@mui/system';
import { Button, Pagination } from "@mui/material";

const PaginationButton = styled(Button)`
    text-transform: capitalize;
    background-color: #cfd4da;
    color: #32373d;
    border-radius: 80px;
    padding: 0 15px 0 15px;
    height: 32px;
`;

const PaginationDiv = styled('div')`
    margin-top: 20px;
`;

const PaginationUI = ({page, setPage}) => {

    const handleChange = (event, value) => setPage(value);

    return (
        <PaginationDiv style={{display: 'flex', flexDirection: 'row'}}>
            <PaginationButton onClick={() => setPage(page - 1)} disabled={page === 1}>Précédent</PaginationButton>
            <Pagination siblingCount={0} shape="circular" hidePrevButton hideNextButton onChange={handleChange} page={page} count={10} />
            <PaginationButton onClick={() => setPage(page + 1)} disabled={page === 8}>Suivant</PaginationButton>
        </PaginationDiv>
    );
}

export default PaginationUI;
