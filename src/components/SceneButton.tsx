import React from 'react';
import { Scence } from '../types';
import { getBrightness } from '../helpers';

interface props {
    scene: string;
    siteKey: string;
    applySceneFunction: (scene: Scence) => void 
}

const SceneButton: React.FC<props> = ({ scene, siteKey, applySceneFunction }) => {

    const { brightness, brightnessText } = getBrightness(scene)

    const sceneValue: Scence = {
        siteKey,
        data: {
            id: scene
        }
    }

    return (
        <div className="button" onClick={() => applySceneFunction(sceneValue)}>
            <div className="circle"/>
            <p className="sceneText">{brightnessText}</p>
        </div>
    )
}

export default SceneButton;