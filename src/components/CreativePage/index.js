import React, { useState } from "react";
import { styled } from '@mui/system';
import { Chip, TextField } from "@mui/material";
import { useParams } from "react-router";
import { deleteCreative, getCreativeById, updateCreative } from "../../api/ressources/creativesRessource";
import { useMutation, useQuery } from "react-query";
import FormatChip from "../../ui_components/formatChip";
import { SwitchEnabled, ButtonUI, LoaderUI } from "../../ui_components";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const TitleInput = styled(TextField)`
    border: 2px solid #242424;
    padding: 10px;
    width: 60%;
    & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: none;
    }
    & .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root { 
        padding: 0;
    }
`;

const Formats = styled('div')`
    margin-top: 20px;
`;

const ContentInput = styled(TextField)`
    border: 2px solid #242424;
    margin-top: 20px;
    height: 100px;
    overflow: auto;
    & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: none;
    }
`;

const DescriptionInput = styled(TextField)`
    border: 2px solid #242424;
    margin-top: 20px;
    height: 100px;
    overflow: auto;
    & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: none;
    }
`;

const CreativeComp = styled('div')`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 30%;
    margin-top: 50px;
    @media (max-width: 1440px) {
        width: 60%;
    }
    @media (max-width: 768px) {
        width: 90%;
    }
`;

const AddFormatChip = styled(Chip)`
    background-color: #242424;
    color: #fff;
    margin-left: 10px;
    border: none;
    border-radius: 99px;
    height: 26px;
    font-size: 12px;
    cursor: pointer;
    & > span {
        padding: 0px 15px 0 15px;
    }
`;

const EditButtons = styled('div')`
    text-decoration: none;
    display: flex;
    margin: auto;
    margin-top: 50px;
    flex-direction: row;
    border: 1px dashed #8b74ff;
    width: 30%;
    padding: 20px;
    justify-content: space-between;
    @media (max-width: 1440px) {
        width: 60%;
    }
    @media (max-width: 768px) {
        width: 90%;
    }
`;

const FormatInput = styled(TextField)`
    margin-left: 10px;
    overflow: auto;
    & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: 1px solid #242424;
        border-radius: 40px;
    }
    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 2px 15px 2px 15px;
    }
`;

const CreativePage = () => {

    const navigate = useNavigate();

    const [creative, setCreative] = useState({
        title: '',
        description: '',
        content: '',
        enabled: true,
        formats: []
    });
    const [visible, setVisible] = useState(false);
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    const params = useParams();
    const { data, isLoading } = useQuery(['creative'], () => getCreativeById(params.creativeId), { 
        onSuccess: (data) => setCreative(data)
    });

    const mutationCreative = useMutation(() => updateCreative(data.id, creative));
    const mutationDeleteCreative = useMutation(() => deleteCreative(data.id));
    const mutationEnabled = useMutation(() => updateCreative(data.id, {...data, enabled: !data.enabled}));

    const updateEnabled = () => mutationEnabled.mutate();

    const updateCreativeFunc = () => {
        mutationCreative.mutate();
        navigate('/');
    }

    const deleteCreativeFunc = () => {
        mutationDeleteCreative.mutate();
        navigate('/');
    }

    const addFormat = () => {
        setCreative({...creative, formats: [...creative.formats, dimensions]});
        setVisible(false);
    }

    const deleteFormat = (index) => {
        let forms = creative.formats;
        forms.splice(index, 1)
        setCreative({...creative, formats: forms});
        setVisible(false);
    }

    if (isLoading) {
        return (<LoaderUI />)
    }
    return (      
        <div>
            <CreativeComp>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TitleInput
                        placeholder="Titre créative" 
                        multiline 
                        value={creative.title} 
                        onChange={event => setCreative({...creative, title: event.target.value})} 
                    />
                    <SwitchEnabled 
                        infoText 
                        enabled={creative.enabled} 
                        changeEnabled={updateEnabled}
                    />
                </div>
                <DescriptionInput
                    placeholder="Description"
                    multiline
                    value={creative.description}
                    onChange={event => setCreative({...creative, description: event.target.value})}
                />
                <ContentInput
                    placeholder="Contenu"
                    multiline
                    value={creative.content}
                    onChange={event => setCreative({...creative, content: event.target.value})}
                />
                <Formats>
                { creative.formats?.map((format, index) => 
                    <FormatChip 
                        onClick={() => deleteFormat(index)}
                        format={format}
                        key={`format-${index}`} 
                    />
                )}
                { visible ? 
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                        <FormatInput
                            type="number"
                            placeholder="width"
                            value={dimensions.width}
                            onChange={event => setDimensions({...dimensions, width: parseInt(event.target.value)})}
                        />
                        <FormatInput
                            type="number"
                            placeholder="height"
                            value={dimensions.height}
                            onChange={event => setDimensions({...dimensions, height: parseInt(event.target.value)})} 
                        />
                        <AddFormatChip 
                            label="+" 
                            onClick={() => addFormat()}
                        />
                    </div>
                    :
                    <AddFormatChip
                        label="+"
                        onClick={() => setVisible(true)} 
                    />
                }
                </Formats>
            </CreativeComp>
            <EditButtons>
                <ButtonUI fill={true} onClick={() => updateCreativeFunc()}>Enregistrer</ButtonUI>
                <ButtonUI component={Link} to={'/'}>Retour</ButtonUI>
                <ButtonUI onClick={() => deleteCreativeFunc()}>Supprimer</ButtonUI>
            </EditButtons>
        </div>  
      );
}

export default CreativePage;
