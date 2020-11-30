import React from 'react';
import axios from 'axios';
import * as io from 'socket.io-client';

import { Scence } from './types';
import SceneButton from './components/SceneButton';
import Loading from './components/Loading';

const SITE_KEY = 'needed-endurable-plough'

const App: React.FC = () => {

  const [siteName, setSiteName] = React.useState(''); 
  const [loading, setLoading] = React.useState(true);
  const scenes: Array<string> = ['allOn', 'allOn:70', 'allOn:30', 'allOff']

  let socket: SocketIOClient.Socket;

  const fetchSiteNameAndConnectToWebSocket = async () => {
    setLoading(true);
    const response = await axios.get(`https://api.mountkelvin.com/v1/site/${SITE_KEY}`)
    socket =  io.connect('https://api.mountkelvin.com/', {
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      transports: ['websocket'],
    })

    socket.on('connect', () => {
        socket.emit('subscribe', { siteKey: SITE_KEY })
        setLoading(false)
    }) 
    setSiteName(response.data.name)
  }

  React.useEffect(() => {
    setLoading(true)
    fetchSiteNameAndConnectToWebSocket()
  },[])

  const setScene = async (scence: Scence) => {
    socket.on('siteKeyFound', () => {
      socket.emit('apply/scene', scence)
    })
    socket.on('noSuchSiteKey', () => {
      fetchSiteNameAndConnectToWebSocket()
      socket.emit('apply/scene', scence)
    })
    console.log(scence)
  };

  const display = () => (
    <div>
      <p className="siteName">{siteName}</p>
      <div className="sceneButtons">
        {scenes.map(scene => <SceneButton key={scene} scene={scene} siteKey={SITE_KEY} applySceneFunction={setScene}/>)}
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
