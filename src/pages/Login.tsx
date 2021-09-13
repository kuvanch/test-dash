import React from 'react'
import {useDispatch} from 'react-redux';
import { Typography,Space,Form,Input,Button } from 'antd'
import authAction from '../redux/actions/authAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {useHistory} from 'react-router-dom'
export interface IAuth {
    _subdomain: string;
    _username: string;
    _password: string
}
export const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const {isLoading,error} = useTypedSelector(state => state.auth)
    const onFinish = (values: IAuth) => {
        dispatch(authAction(values))
      };
    if(localStorage.getItem('token')) {
        history.push('/home')
    } 
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <div className="login__body">
                <Space direction='vertical'>
                    <Typography.Title level={3} className='login__title'>Авторизазия</Typography.Title>
                    <Typography.Title level={5} type='danger' className='login__title'>{error}</Typography.Title>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                        <Form.Item
                            label="Domain"
                            name="_subdomain"
                            rules={[{ required: true, message: 'Please input your domain!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="_username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="_password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button  className='login__btn' type="primary" htmlType="submit" >
                                {isLoading ? '...loading': 'Вход'}
                            </Button>
                        </Form.Item>
                        </Form>
                </Space>
            </div>
        </div>
    )
}
