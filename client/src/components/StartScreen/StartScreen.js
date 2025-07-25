import React from 'react';
import '../../styles.css'
import NewGame from './NewGame';
import ConnectToGame from './ConnectToGame';

const StartScreen = ({ socket}) => {
    return (
        <div className='start-screen-wrapper'>
            <NewGame socket={socket}/>
            <ConnectToGame socket={socket}/>
        </div>
    );
};

export default StartScreen;