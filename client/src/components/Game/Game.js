import { React, useCallback, useEffect, useMemo, useState } from 'react';
import Team from '../Game/Team';
import Question from '../Game/Question';
import RoomService from '../../services/RoomService';
import { useSearchParams } from "react-router-dom";
import socketIO from 'socket.io-client';



const Game = () => {
    const [players, setPlayers] = useState('');
    const [round, setRound] = useState('');
    const [questionPack, setQuestionPack] = useState('');
    const [searchParams] = useSearchParams();

    const socket = useMemo(() => socketIO.connect(`http://192.168.1.42:9000`, { path: "/socket.io" }), []);

    const getRoomInfo = useCallback(async () => {
        const { players, round, questionPack } = await RoomService.get({ code: searchParams.get("roomId") }).then(el => el.data);
        setPlayers(players);
        setRound(round);
        setQuestionPack(questionPack);
    }, [searchParams]);

    const handleUpdateAnswer = () => {
        socket.on('updateAnswer', async () => {
            await getRoomInfo();
        });
    };

    useEffect(() => {
        getRoomInfo();
        socket.emit('join', searchParams.get("roomId"));
        handleUpdateAnswer();
        return () => {
            socket.off('updateAnswer', handleUpdateAnswer);
        };
    }, [getRoomInfo, socket, searchParams]);

    return (
        <main className='main'>
            <div className='title-game'>
                <h1 className='title'>Раунд {round}</h1>
                {searchParams.get("roomId")}
            </div>
            {questionPack && round && <Question questionPack={questionPack} round={round} roomCode={searchParams.get("roomId")} socket={socket} />}
            {players && <Team players={players} getRoomInfo={getRoomInfo} socket={socket} />}
        </main>
    );
};

export default Game;