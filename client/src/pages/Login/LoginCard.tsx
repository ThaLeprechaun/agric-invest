import React from 'react';
import Card from '../../components/Card/Card';
import LoginForm from './LoginForm';
import '../Register/registerCard.css';

export default function LoginCard() {
  return (
    <div className="form__card">
      <h2>Welcome Back</h2>
      <p>Login to your account</p>
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}
