import React from 'react';
import RegisterForm from './RegisterForm';
import Card from '../../components/Card/Card';
import './registerCard.css';

function RegisterCard() {
  return (
    <div className="form__card">
      <div className="form__card--heading">
        <h2>Welcome!</h2>
        <p>Sign up</p>
      </div>
      <Card>
        <RegisterForm />
      </Card>
    </div>
  );
}

export default RegisterCard;
