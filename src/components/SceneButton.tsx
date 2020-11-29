import React from 'react';
import { Scence } from '../types';

interface props {
    id: string;
    siteKey: string;
    applySceneFunction: (scene: Scence) => void 
}

const SceneButton: React.FC<props> = ({ id, siteKey, applySceneFunction }) => {

    // let brightness;
    // if (id.includes(':')) {
    //     brightness = id.split(':')[1]
    // } else {
    //     brightness = id
    // }

    const scene: Scence = {
        siteKey,
        data: {
            id
        }
    }

    const button = {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'pink'
    }

    const circle = {
        width: 40,
        height: 40,
        borderRadius: 20,
    }

    return (
        <div style={button} onClick={() => applySceneFunction(scene)}>
            <div style={circle} className="circle"/>
        </div>
    )
}

export default SceneButton;