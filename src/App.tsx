import React from 'react';
import axios from 'axios';
import * as io from 'socket.io-client';
import { Scence } from './types';
import SceneButton from './components/SceneButton';

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
  const scenes = ['allOn', 'allOn:70', 'allOn:30', 'allOff']

  React.useEffect(() => {
    setLoading(true)
    const fetchSiteName = async () => {
      const response = await axios.get(`https://api.mountkelvin.com/v1/site/${SITE_KEY}`)
      setSiteName(response.data.name)
      setLoading(false)
    }
    fetchSiteName()
  },[])

  const setScene = async (scence: Scence) => {
    socket.emit('apply/scene', scence)
    console.log(scence)
  };

  const renderDisplay = () => (
    <div>
      <p>{siteName}</p>
      <div className="sceneButtons">
        {scenes.map(scene => <SceneButton key={scene} scene={scene} siteKey={SITE_KEY} applySceneFunction={setScene}/>)}
      </div>
    </div>
  )

  return (
    <div>
      {loading ? <p>loading...</p> : renderDisplay()}
    </div>
  );
}

export default App;
