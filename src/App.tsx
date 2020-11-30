import React from 'react';
import axios from 'axios';
import * as io from 'socket.io-client';

import { Scence, ActivatedScene } from './types';
import SceneButton from './components/SceneButton';
import Loading from './components/Loading';

const SITE_KEY = 'needed-endurable-plough'

const socket = io.connect('https://api.mountkelvin.com/', {
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      transports: ['websocket'],
    })

socket.on('connect', () => {
    socket.emit('subscribe', { siteKey: SITE_KEY })
}) 

const App: React.FC = () => {

  const [siteName, setSiteName] = React.useState(''); 
  const [loading, setLoading] = React.useState(true);
  const [activatedScene, setActivatedScenes] = React.useState<ActivatedScene>({
    'allOn': false,
    'allOn:70': false,
    'allOn:30': false,
    'allOff': false
  })

  const defaultScenes: ActivatedScene = {
    'allOn': false,
    'allOn:70': false,
    'allOn:30': false,
    'allOff': false
  }

  React.useEffect(() => {
    setLoading(true)
    const fetchSiteName = async () => {
      setLoading(true);
      const response = await axios.get(`https://api.mountkelvin.com/v1/site/${SITE_KEY}`)
      setSiteName(response.data.name)
      setLoading(false)
    }
    fetchSiteName()
  },[])

  const setScene = async (scence: Scence, sceneKey: string) => {
    socket.on('siteKeyFound', () => {
      socket.emit('apply/scene', scence)
    })
    setActivatedScenes({...defaultScenes, [sceneKey]: true})
  };

  const display = () => (
    <div>
      <p className="siteName">{siteName}</p>
      <div className="sceneButtons">
        {Object.keys(activatedScene).map(scene => <SceneButton key={scene} scene={scene} siteKey={SITE_KEY} activated={activatedScene[scene]} applySceneFunction={setScene}/>)}
      </div>
    </div>
  )

  return (
    <div>
      {loading ? <Loading /> : display()}
    </div>
  );
}

export default App;
