import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


const ConnectToGame = () => {
    const navigate = useNavigate();
    const onFinish = values => {
    navigate(`/controller?roomId=${values.roomCode}`);
};

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Код комнаты"
                name="roomCode"
                rules={[{ required: true, message: 'Введите код комнаты' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ConnectToGame;