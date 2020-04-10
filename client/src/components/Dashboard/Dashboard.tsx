import React from 'react';
import UserItems from '../UserItems/UserItems';
import UserItemDetails from '../UserItemDetails/UserItemDetails';
import { useSelector } from 'react-redux';
import Farms from '../Farms/Farms';

export default function Dashboard() {
  const selectedData = useSelector((state: any) => state);
  const userCategory = selectedData.authUser.user.user.userCategory;
  return (
    <div className="dashboard-container">
      <UserItems />
      {userCategory === 'investor' ? <UserItemDetails /> : <Farms />}
    </div>
  );
}
