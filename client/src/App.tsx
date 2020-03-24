import React, { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SuspenseBoundary from './common/Boundary/SuspenseBoundary';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/authUserAction';
// import RegisterCard from './pages/Register/RegisterCard';

// import getStore from './store';
// import { PersistGate } from 'redux-persist/integration/react';

// export const { store, persistor } = getStore();
const RegisterCard = lazy(() => import('./pages/Register/RegisterCard'));
const LoginCard = lazy(() => import('./pages/Login/LoginCard'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <SuspenseBoundary>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/register" component={RegisterCard} />
          <Route path="/login" component={LoginCard} />
        </Switch>
      </SuspenseBoundary>
    </Router>
  );
}

export default App;
