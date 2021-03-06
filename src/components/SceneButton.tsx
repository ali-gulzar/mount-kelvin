import React from 'react';
import styled from 'styled-components';

import { Scence } from '../types';
import { getBrightness } from '../helpers';

interface props {
    scene: string;
    siteKey: string;
    activated: boolean;
    applySceneFunction: (scene: Scence, sceneKey: string) => void 
}

interface CircleProps {
    height: number
}

interface SquareProps {
    activated: boolean
}

const Circle = styled.div<CircleProps>`
width: 50px;
height: 50px;
border-radius: 30px;
border-style: solid;
border-color: aliceblue;
position: relative;
overflow: hidden;
@media (max-width: 900px) {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-top: 20px;
}
&:after {
    ${({height}) => {
        if (height !== 0) return 'content: "";'
    }}
    position:absolute;
    background:aliceblue;
    border:1px solid aliceblue;
    bottom:0;
    left:0; 
    right: 0;
    height:${({height}) => height}%;
}
`

const Square = styled.div<SquareProps>`
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
    border-color: ${({activated}) => activated ? 'aliceblue' : 'gray'};
    color: aliceblue;
    @media (max-width: 900px) {
        width: 200px;
        height: 200px;
    }
`

const SceneButton: React.FC<props> = ({ scene, siteKey, applySceneFunction, activated }) => {

    const { brightness, brightnessText } = getBrightness(scene)

    const sceneValue: Scence = {
        siteKey,
        data: {
            id: scene
        }
    }

    return (
        <Square onClick={() => applySceneFunction(sceneValue, scene)} activated={activated}>
            <Circle height={brightness}/>
            <p className="sceneText">{brightnessText}</p>
        </Square>
    )
}

export default SceneButton;