import React, { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SuspenseBoundary from './common/Boundary/SuspenseBoundary';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/authUserAction';
import Nav from './components/Nav/Nav';
import { getAllFarms } from './redux/actions/farmAction';
// import RegisterCard from './pages/Register/RegisterCard';

// import getStore from './store';
// import { PersistGate } from 'redux-persist/integration/react';

// export const { store, persistor } = getStore();
const HomePage = lazy(() => import('./pages/Home/Home'));
const RegisterPage = lazy(() => import('./pages/Register/RegisterCard'));
const LoginPage = lazy(() => import('./pages/Login/LoginCard'));
const userPage = lazy(() => import('./pages/UserView/UserView'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllFarms());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Nav logo="Agro-Invest" />
        <SuspenseBoundary>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={userPage} />
          </Switch>
        </SuspenseBoundary>
      </Router>
    </>
  );
}

export default App;
