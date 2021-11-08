import React, { useState } from "react";
import { styled } from '@mui/system';
import { useMutation, useQuery } from 'react-query'
import { getAllCreative, updateCreative } from "../../api/ressources/creativesRessource";
import { Chip, Button } from "@mui/material";
import CreativeComp from "./Creative";
import { SwitchEnabled, FormatChip, PaginationUI, LoaderUI } from "../../ui_components";

const CreativeListDiv = styled('div')`
    border: 2px solid #242424;
    width: 80%;
    margin-top: 2%;
    @media (max-width: 1440px) {
        width: 95%;
    }
`;

const ButtonDiv = styled(Button)`
    text-align: left;
    width: 100%;
    height: 60px;
    justify-content: space-between;

    &:hover {
        background-color: #fff;
    }
`;

const Creative  = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Title = styled('p')`
    text-align: left;
    margin: 0 0 0 15px;
    flex: 2;
    align-items: left;
    text-transform: capitalize;
    color: #242424;
    @media (max-width: 768px) {
		margin: 0 0 0 5px;
        font-size: 12px;
    }
`;

const Contributor = styled(Chip)`
    background-color: #c4c4c4;
    margin: -7px;
    border: 1px solid #242424;
    border-radius: 99px;
    font-size: 12px;
    width: 32px;
    height: 32px;
    & > span {
        padding: 0;
    }
    @media (max-width: 768px) {
		width: 25px;
        height: 25px;
    }
`;

const FormatList = styled('div')`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 2;
    align-items: center;
`;

const ContributorList = styled('div')`
    flex: 1;
    @media (max-width: 768px) {
		display: none;
    }
`;


const Home = () => {

    const [page, setPage] = useState(1);
    const [creativeSelected, setCreativeSelected] = useState();
    const { data, status, refetch } = useQuery(['creatives', { page }], () => getAllCreative(page, 5), {
        keepPreviousData: true,
        refetchOnWindowFocus: false
    })

    const displayCreative = (creative) => setCreativeSelected(creative);

    const mutation = useMutation((creative) => {
        return updateCreative(creative.id, {...creative, enabled: !creative.enabled})
    })

    const changeEnabled = (creative) => {
        mutation.mutate(creative);
        refetch();
    }

    if (status === "loading") {
        return (<LoaderUI />)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <header
			style={{
				marginTop: 10,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
        >
          <img src="/mediakeys.png" width="80" alt="logo" />
        </header>
        <CreativeListDiv>
            { data.map((creative, index) => 
                <Creative key={index}>
                    <ButtonDiv key={index} onClick={() => displayCreative(creative)}>
                        <Title>{creative.title}</Title>
                        <ContributorList>
                            { creative.contributors.map((creator, index) => 
                                <Contributor 
                                    label={`${creator.firstName[0]}${creator.lastName[0]}`}
                                    key={`creator-${index}`} 
                                />
                            )}
                        </ContributorList>
                        <FormatList>
                            { creative.formats.map((format, index) => 
                                <FormatChip
                                    format={format} 
                                    key={`format-${index}`}
                                />
                            )}
                        </FormatList>
                    </ButtonDiv>
                    <div style={{marginRight: 20}}>
                        <SwitchEnabled
                            key={`switch-${index}`}
                            enabled={creative.enabled}
                            changeEnabled={() => changeEnabled(creative)}
                        />
                    </div>
                </Creative>
            )}
        </CreativeListDiv>
        <PaginationUI page={page} setPage={setPage} />
        { creativeSelected &&
            <CreativeComp creative={creativeSelected} />
        }
        </div>
      );
}

export default Home;
