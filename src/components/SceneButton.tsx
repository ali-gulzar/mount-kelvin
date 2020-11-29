import React from 'react';
import { Scence } from '../types';

interface props {
    id: string;
    siteKey: string;
    applySceneFunction: (scene: Scence) => void 
}

const SceneButton: React.FC<props> = ({ id, siteKey, applySceneFunction }) => {

    let brightness;
    if (id.includes(':')) {
        brightness = id.split(':')[1]
    } else {
        brightness = id
    }

    const scene: Scence = {
        siteKey,
        data: {
            id
        }
    }

    return (
        <div className="button" onClick={() => applySceneFunction(scene)}>
            <div className="circle"/>
            <p className="sceneValue">{brightness}</p>
        </div>
    )
}

export default SceneButton;