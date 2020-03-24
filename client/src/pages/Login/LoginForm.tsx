import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../redux/actions/authUserAction';
import Button from '../../components/Button/Button';
import { Link, useHistory } from 'react-router-dom';
import '../Register/registerForm.css';

export default function LoginForm() {
  const dispatch = useDispatch();
  const selectedData = useSelector((state: any) => state);
  const isAuthenticated = selectedData.authUser.isAuthenticated;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  const initialState = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialState);

  const { email, password } = user;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('All fields are required');
      return;
    }
    const body = { email, password };
    dispatch(authUser(body));
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
          aria-label="Email"
          required
        />

        <input
          type="password"
          name="password"
          className="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
          aria-label="Password"
          required
          autoComplete="off"
        />
        <Button buttonName="Register" buttonClass="form__button" />
      </form>
      <div className="info">
        Don't have an account?{' '}
        <Link className="login1" to="/register">
          Register
        </Link>
      </div>
    </>
  );
}
