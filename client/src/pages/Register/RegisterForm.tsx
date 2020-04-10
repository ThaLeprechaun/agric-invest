import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
// import Select from 'react-select';
import { registerUser } from '../../redux/actions/userAction';
import './registerForm.css';
import { useDispatch } from 'react-redux';

export default function RegisterForm() {
  const dispatch = useDispatch();
  // const options = [
  //   { value: 'farmer', label: 'Farmer' },
  //   { value: 'investor', label: 'Investor' }
  // ]
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userCategory: '',
  };

  const [user, setUser] = useState(initialState);

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    userCategory,
  } = user;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert('All fields are required');
      return;
    }

    //Check for password match
    if (user.password !== user.confirmPassword) {
      alert('Passwords must match');
      return;
    }

    const body = {
      firstName,
      lastName,
      email,
      phone,
      password,
      userCategory,
    };
    dispatch(registerUser(body));
    return;
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit} id="registerForm">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={firstName}
          aria-label="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={lastName}
          aria-label="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="email"
          onChange={handleChange}
          value={email}
          aria-label="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={phone}
          aria-label="Phone Number"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
          aria-label="Password"
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={confirmPassword}
          aria-label="Confirm Password"
          required
          autoComplete="off"
        />
        <input
          type="userCategory"
          name="userCategory"
          placeholder="userCategory"
          onChange={handleChange}
          value={userCategory}
          aria-label="userCategory"
          required
        />
        {/* <Select options={options} /> */}
        {/* <select id='user' name='userCategory' form='registerForm' className='select__menu'>
          <option >Select a category</option>
          <option value='farmer'>Farmer</option>
          <option value='investor'>Investor</option>
        </select> */}
        <Button buttonName="Register" buttonClass="form__button" />
      </form>
      <div className="info">
        Already have an account?{' '}
        <Link className="login" to="/login">
          Login
        </Link>
      </div>
    </>
  );
}
