import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';
import { useQuery } from 'react-query'
import { getAllCreative } from "../api/ressources/creativesRessource";
import { Chip, Button } from "@mui/material";
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/core/SwitchUnstyled';

const HomeDiv = styled('div')`
    border: 2px solid #242424;
    width: 80%;
    margin-top: 2%;
`;

const ButtonDiv = styled(Button)`
    text-align: left;
    width: 100%;
    height: 60px;
    justify-content: space-between;
`;

const Creative  = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Title = styled('p')`
    text-align: left;
    margin: 0;
    flex: 2;
    align-items: left;
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
        padding: 0 !important;
    }
`;

const Format = styled(Chip)`
    background-color: #cfd4da;
    margin-left: 5px;
    border: none;
    border-radius: 99px;
    font-size: 12px;
`;

const Enable = styled('span')`
    position: relative;
    display: inline-block;
    width: 32px;
    height: 18px;
    margin: 10px;
    cursor: pointer;
    border: 2px solid #32373d;
    border-radius: 99px;

    & .${switchUnstyledClasses.track} {
        background: #fff;
        border-radius: 8px;
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    & .${switchUnstyledClasses.thumb} {
        display: block;
        width: 12px;
        height: 12px;
        top: 3px;
        left: 3px;
        border-radius: 16px;
        background-color: #32373d;
        position: relative;
        transition: all 200ms ease;
    }

    &.${switchUnstyledClasses.checked} {
        .${switchUnstyledClasses.thumb} {
            left: 14px;
            top: 3px;
            background-color: #fff;
        }

        .${switchUnstyledClasses.track} {
            background: #32373d;
        }
    }

    & .${switchUnstyledClasses.input} {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 1;
        margin: 0;
    }
`;


// /creatives?_page=:page&_limit=:limit

const Home = () => {

    const [page, setPage] = useState(1);

    const { data, status } = useQuery(['posts1'], () => getAllCreative(1, 5)) 

    console.log('creatives', data, status);

    if (status === "loading") {
        return (<div>WAIT</div>)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <HomeDiv>
            {
                data.map((d, index) => 
                    <Creative>
                        <ButtonDiv key={index}>
                            <Title>{d.title}</Title>
                            <div style={{flex: 1}}>
                                { d.contributors.map((creator, index) => 
                                    <Contributor label={`${creator.firstName[0]}${creator.lastName[0]}`} key={`creator-${index}`} />
                                )}
                            </div>
                            <div style={{flex: 1}}>
                            { d.formats.map((format, index) => 
                                    <Format label={`${format.width}x${format.height}`} key={`format-${index}`} />
                                )}
                            </div>
                        </ButtonDiv>
                        <div>
                            <SwitchUnstyled component={Enable} defaultChecked />
                        </div>
                    </Creative>
                )
            }
        </HomeDiv>
        </div>
      );
}

export default Home;
