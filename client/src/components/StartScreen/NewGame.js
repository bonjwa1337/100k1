import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import RoomService from '../../services/RoomService';
import AnswerService from '../../services/AnswerService';
const { Option } = Select;

const NewGame = ({ socket }) => {
    const navigate = useNavigate();


    const onFinish = async (values) => {
        const generateRoomId = Math.random().toString(36).substr(2, 9);
        socket.emit('create', generateRoomId);
        const array = Array(6).fill().map((_, index) => ({ isOpen: false, answer: index + 1 }));
        await RoomService.create({ ...values, roomId: generateRoomId });
        await AnswerService.create({ roomCode: generateRoomId, round: 1, questionPack: values.questionPack, answers: array});
        navigate(`/game?roomId=${generateRoomId}`);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="create-game"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Команда 1"
                name='teamOne'
                rules={[{ required: true, message: 'Введите код комнаты' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Команда 2"
                name='teamTwo'
                rules={[{ required: true, message: 'Введите код комнаты' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Пак вопросов"
                name='questionPack'
                rules={[{ required: true, message: 'Введите код комнаты' }]}
            >
                <Select
                    placeholder="Пак вопросов"
                    allowClear
                >
                    <Option value="1">Первый</Option>
                    <Option value="2">Второй</Option>
                    <Option value="3">Третий</Option>
                </Select>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Новая игра
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewGame;