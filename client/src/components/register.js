import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button } from "antd";

export default function Register() {
    const [form, setForm] = useState({
        username:'',
        email:'',
        password:'',
        confirm:''
    });

    const navigate = useNavigate();

    const updateForm = (value) => {
        return setForm( (prev) => {
            return{...prev, ...value};
        });
    }

    const onSubmit = async (values) => {
        const newUser = values;
        console.log(newUser);

        await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
        .catch (err => {
            window.alert(err);
            return;
        });

        setForm({ username:'', email:'', password:'', confirm:'' });
        navigate('/');
    }

    return (
        <section>
            <h2>Register</h2>
            <Form onFinish={onSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'This is not a valid email'
                        },
                        {
                            required: true,
                            message: 'Please input your email'
                        }
                    ]}
                >
                    <Input placeholder="name@service.com"/>
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if(!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords don"t match'))
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </section>

    );
}