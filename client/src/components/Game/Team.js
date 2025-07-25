import React, { useEffect } from 'react';
import '../../styles.css';
import { X } from "react-bootstrap-icons";
import { useSearchParams } from 'react-router-dom';
import useSound from 'use-sound';
import errorSound from './error.mp3';

const Team = React.memo(({ players = [], socket, getRoomInfo }) => {
    const [searchParams] = useSearchParams();
    const [playErrorSound] = useSound(errorSound, { playbackRate: 0.75, volume: 0.5 });

    useEffect(() => {
        if (socket && searchParams.get("roomId")) {
            socket.emit('join', searchParams.get("roomId"));
            socket.on('updateError', () => {
                playErrorSound();
                getRoomInfo();
            });

            socket.on('updatePoints', () => {
                console.log('asdasd')
                getRoomInfo();
            });
        }

        return () => {
            if (socket) {
                socket.off('updateError');
            }
        };
    }, [socket, getRoomInfo, playErrorSound, searchParams]);

    return (
        <div className="teams-wrapper">
            {players.map(player => (
                <div className="team" key={player.name}>
                    <div className="team-name">
                        <h2>{player.name}</h2>
                    </div>
                    <div className="team-points">
                        <h2>{player.points}</h2>
                    </div>
                    <div className="team-error">
                        {[...Array(3)].map((_, i) => (
                            i < player.errors ? (
                                <X className="error-mark red" key={i} />
                            ) : (
                                <X className="error-mark" key={i} />
                            )
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
});

export default Team;

