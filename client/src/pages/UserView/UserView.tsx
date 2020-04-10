import React from 'react';
import Nav from '../../components/Nav/Nav';
import './userview.css';
import { useSelector } from 'react-redux';
import SideNav from '../../components/SideNav/SideNav';
import Main from '../../components/Main/Main';
import Welcome from '../../components/Welcome/Welcome';
import SuspenseBoundary from '../../common/Boundary/SuspenseBoundary';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import Investments from '../../components/Investments/Investments';
import Farms from '../../components/Farms/Farms';

export default function UserView() {
  const selectedData = useSelector((state: any) => state);
  const user = selectedData.authUser.user;
  if (!user) {
    return <>Loading...</>;
  }
  return (
    <>
      <SideNav />
      <Main>
        <Welcome />
        <SuspenseBoundary>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/dashboard/my-investments">
              <Investments />
            </Route>
            <Route path="/dashboard/my-farms">
              <Farms />
            </Route>
          </Switch>
        </SuspenseBoundary>
      </Main>
    </>
  );
}
