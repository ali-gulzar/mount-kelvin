import React from 'react';
import axios from 'axios';

const App: React.FC = () => {

  const [siteName, setSiteName] = React.useState('');

  React.useEffect(() => {
    const fetchSiteName = async () => {
      const response = await axios.get('https://api.mountkelvin.com/v1/site/needed-endurable-plough');
      setSiteName(response.data.name);
    }
    fetchSiteName();
  },[])

  const setScene = async () => {
    console.log('set scene...')
  };

  return (
    <div>
      <p>{siteName}</p>
      <button onClick={setScene}>post</button>
    </div>
  );
}

export default App;
