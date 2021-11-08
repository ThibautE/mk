import React from "react";
import { styled } from '@mui/system';
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonUI } from "../../../ui_components";

const CreativeDiv = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 2px solid #242424;
    width: 80%;
    margin-top: 2%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Contributors = styled('div')`
    margin-top: 20px;
    border: none;
    background-color: #f1f5fa;
`;

const Contributor = styled('div')`
    padding: 15px 30px;
`;

const Title = styled('h3')`
    margin: 0 0 20px 0;
`;

const LeftPanel = styled('div')`
    flex: 3;
    padding: 30px;
`;

const RightPanel = styled('div')`
    flex: 1;
    padding: 30px;
`;

const CustomSkeleton = styled(Skeleton)`
    height: 30px;
    margin-top: 5px;
    background-color: #f1f5fa;
`;

const CreativeComp = ({creative}) => {

    return (
        <CreativeDiv>
            <LeftPanel>
                <Title>{creative.title}</Title>
                <p>{creative.description}</p>
                <p>{creative.content}</p>
                <CustomSkeleton animation={false} />
                <CustomSkeleton animation={false} />
                <CustomSkeleton width="80%" animation={false} />
            </LeftPanel>
            <RightPanel>
                <div>Créé par {creative.createdBy.firstName + ' ' + creative.createdBy.lastName}</div>
                <div style={{marginTop: 20}}>Dernière modification le {creative.lastModified}</div>
                <Contributors>{creative.contributors?.map((creator, index) => 
                    <Contributor key={`creative-${index}`}>
                        {creator.firstName + ' ' + creator.lastName}
                    </Contributor>)}
                </Contributors>
                <ButtonUI fill component={Link} to={`/creative/${creative.id}`} style={{width: '100%', marginTop: 20}}>Modifier</ButtonUI>
            </RightPanel>
        </CreativeDiv>
      );
}

export default CreativeComp;
