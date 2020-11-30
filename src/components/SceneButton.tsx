import React from 'react';
import styled from 'styled-components';

import { Scence } from '../types';
import { getBrightness } from '../helpers';

interface props {
    scene: string;
    siteKey: string;
    applySceneFunction: (scene: Scence) => void 
}

interface SampleProps {
    height: number
}

const Circle = styled.div<SampleProps>`
width: 50px;
height: 50px;
border-radius: 25px;
border:1px solid black;
position: relative;
overflow: hidden;
&:after {
    ${({height}) => {
        if (height !== 0) return 'content: "";'
    }}
    position:absolute;
    background:black;
    border:1px solid black;
    bottom:0;
    left:0; 
    right: 0;
    height:${({height}) => height}%;
}
`

const Square = styled.div`
    width:100px;
    height:100px;
    border:1px solid black;
    border-radius: 5px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`

const SceneButton: React.FC<props> = ({ scene, siteKey, applySceneFunction }) => {


    const { brightness, brightnessText } = getBrightness(scene)

    const sceneValue: Scence = {
        siteKey,
        data: {
            id: scene
        }
    }

    return (
        <Square onClick={() => applySceneFunction(sceneValue)}>
            <Circle height={brightness}/>
            <p className="sceneText">{brightnessText}</p>
        </Square>
    )
}

export default SceneButton;