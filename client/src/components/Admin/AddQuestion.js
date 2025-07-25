import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import QuestionService from '../../services/QuestionService';
const { Option } = Select;


const AddQuestion =  () => {
    const onFinish = async (values) => {
        await QuestionService.create(values);
    };

    const renderAnswerFields = (count) => {
        const fields = [];
        for (let i = 1; i <= count; i++) {
            fields.push(
                <Space key={i}>
                    <Form.Item
                        label={`Ответ ${i}`}
                        name={`answer${i}`}
                        rules={[{ required: true, message: 'Введите код комнаты' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={`Очки ${i}`}
                        name={`point${i}`}
                        rules={[{ required: true, message: 'Введите код комнаты' }]}
                    >
                        <Input />
                    </Form.Item>
                </Space>
            );
        }
        return fields;
    };

    return (
        <Form
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="questionPack" label="Пак" rules={[{ required: true }]}>
                <Select allowClear>
                    <Option value="1">Первый</Option>
                    <Option value="2">Второй</Option>
                    <Option value="3">Третий</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Round" name='round' rules={[{ required: true, message: 'Введите код комнаты' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Text" name='text' rules={[{ required: true, message: 'Введите код комнаты' }]}>
                <Input />
            </Form.Item>

            {renderAnswerFields(6)}

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AddQuestion;