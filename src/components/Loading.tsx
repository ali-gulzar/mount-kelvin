import React from 'react';
import Loader from 'react-loader-spinner';

const Loading: React.FC = () => (
    <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center', marginTop: window.innerHeight / 2 }}>
        <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
    </div>
)

export default Loading;