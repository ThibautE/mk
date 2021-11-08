import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/core/SwitchUnstyled';

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

const SwitchComp = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
`;

const SwitchEnabled = ({enabled, changeEnabled, infoText}) => {

    const [switchEnabled, setSwitchEnabled] = useState(enabled);

    useEffect(() => {
        setSwitchEnabled(enabled);
    }, [enabled])

    return (
        <SwitchComp>
            { infoText && <div style={{marginLeft: 20}}>{ switchEnabled ? 'Activée' : 'Désactivée' }</div>}
            <SwitchUnstyled checked={switchEnabled} component={Enable} onChange={() => {
                setSwitchEnabled(!switchEnabled);
                changeEnabled();
            }} />
        </SwitchComp>
    );
}

export default SwitchEnabled;
