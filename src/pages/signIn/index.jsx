import { Button, Form, Input, Alert, Card } from 'antd';
import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext"
import { SEO } from "../../components/SEO"

const SignIn = () => {
  const { signIn } = useContext(AuthContext)
  const [invalidSignIn, setInvalidSignIn] = useState(false);


 const onFinish = async ({username, password}) => {
    try {
      await signIn({username, password}) 
    } catch (error) {
    setInvalidSignIn(true)
    }
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
    <SEO title="SignIn | FIEMG" description="Sign In" />
    <div className="site-card-border-less-wrapper">
    <Card
      title="Login"
      bordered={true}
      style={{
        width: 500,
        borderRadius: "10px",
        textAlign: 'center'
      }}
    >
    <Form
      name="signIn"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='formContent'
    >
      <Form.Item
        label="Usuário"
        name="username"
        rules={[
          {
            required: true,
            message: 'Insira seu usuário',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[
          {
            required: true,
            message: 'Insira sua senha',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
        {invalidSignIn && 
        <Alert 
          message="Erro"
          description="Usuário e/ou senha inválidos."
          type="error"
          showIcon 
          style={{marginBottom: "10px", textAlign: "start"}}
        />}
      <Form.Item
        wrapperCol={{
          span: 25,
        }}
      >
        <Button type="primary" htmlType="submit" className='button'>
          Entrar
        </Button>
      </Form.Item>
    </Form>
    </Card>
  </div>
    </>
  );
};

export default SignIn;