import React, { use, useEffect, useState } from 'react';
import '../../styles.css'
import { useSearchParams } from "react-router-dom";
import RoomService from '../../services/RoomService';
import QuestionService from '../../services/QuestionService';
import AnswerService from '../../services/AnswerService';
import { FileMinus, Plus } from 'react-bootstrap-icons';
import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

const Controller = ({ socket }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [players, setPlayers] = useState('');
    const [round, setRound] = useState('');
    const [questionPack, setQuestionPack] = useState('');
    const [activePlayer, setActivePlayer] = useState('');
    const [question, setQuestion] = useState('');
    const [questionStatus, setQuestionStatus] = useState('');

    const getRoomInfo = async () => {
        const roomInfo = await RoomService.get({ code: searchParams.get("roomId") }).then(el => el.data);
        setPlayers(roomInfo.players)
        setRound(roomInfo.round)
        setQuestionPack(roomInfo.questionPack)
        getQuestion(roomInfo.round, roomInfo.questionPack);
    }

    const getQuestion = async (roundInfo, questionPackInfo) => {
        const questionInfo = await QuestionService.get({ round: roundInfo, questionPack: questionPackInfo }).then(el => el.data);
        const answerInfo = await AnswerService.get({ round: roundInfo, roomCode: searchParams.get("roomId") }).then(el => el.data);
        setQuestionStatus(answerInfo)
        setQuestion(questionInfo)
    }

    const setOpenAnswer = async (answer) => {
        const index = question.answers.findIndex(el => el._id === answer._id);
        const currentStatus = questionStatus.find(item => item.answer === index + 1).isOpen
        const activePlayerInfo = players.find(el => el.name === activePlayer);
        console.log(activePlayerInfo)
        await AnswerService.update({ _id: answer._id, isOpen: !currentStatus, round: round, roomCode: searchParams.get("roomId"), answer: index + 1 });
        await RoomService.update({ _id: activePlayerInfo._id, points: activePlayerInfo.points + answer.points });
        await getRoomInfo();

        socket.emit('updateAnswer', {
            text: 'openAnswer',
            room: searchParams.get("roomId"),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });
        console.log('mesage sended')

    }

    const setErrorToPlayer = async (player) => {
        await RoomService.update({ _id: player._id, errors: player.errors + 1 });
        socket.emit('updateError', {
            text: 'error',
            room: searchParams.get("roomId"),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });

        await getRoomInfo();
    }

    const removeErrorToPlayer = async (player) => {
        await RoomService.update({ _id: player._id, errors: player.errors - 1 });
        socket.emit('updateError', {
            text: 'error',
            room: searchParams.get("roomId"),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });

        await getRoomInfo();
    }

    useEffect(() => {
        socket.emit('join', searchParams.get("roomId"));
        getRoomInfo();
    }, []);

    const addPointsToPlayer = async (formData) => {
        await RoomService.update({ _id: formData._id, points: +formData.points });
        await getRoomInfo();
        socket.emit('updatePoints', {
            text: 'error',
            room: searchParams.get("roomId"),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });
    }



    if (players && round && questionPack && question)
        return (
            <div className='start-screen-wrapper'>
                <div className='players-wrapper'>
                    {
                        players.map(el => (
                            <div>
                                <h1 className={activePlayer === el.name ? 'player-title active' : 'player-title'} onClick={() => setActivePlayer(el.name)}>{el.name} {el.errors}</h1>
                                <div>Error
                                    <div className='error-wrapper'>
                                        <button className='error-button' onClick={() => setErrorToPlayer(el)}><Plus /></button>
                                        <button className='error-button' onClick={() => removeErrorToPlayer(el)}><FileMinus /></button>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='question-wrapper'>
                    {
                        question.answers.map((el, index) => {
                            const isOpen = questionStatus.find(item => item.answer === index + 1).isOpen;
                            return (
                                <div>
                                    <h1 className={isOpen ? 'question-title active' : 'question-title'} onClick={() => setOpenAnswer(el)}>{el.text}</h1>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='points-add'>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={addPointsToPlayer}
                        autoComplete="off"
                    >
                        <Form.Item name="_id" label="Игрок" rules={[{ required: true }]}>
                            <Select allowClear>
                                {
                                    players.map(el => <Option value={el._id}>{el.name}</Option>)
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="points"
                            name="points"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    else
        return null

};

export default Controller;