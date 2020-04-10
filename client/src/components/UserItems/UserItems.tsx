import React from 'react';
import Card from '../Card/Card';
import './userItem.css';
import { useSelector } from 'react-redux';

export default function UserItems() {
  const selectedData = useSelector((state: any) => state);
  const userCategory = selectedData.authUser.user.user.userCategory;
  const type = selectedData.authUser.user;
  return (
    <div className="card-container">
      {userCategory === 'investor' ? (
        <Card cardClass="card-container__item">
          Total Farm Investments: {type.investment.length}
        </Card>
      ) : (
        <Card cardClass="card-container__item">
          Total Farms: {type.farm.length}
        </Card>
      )}
      {userCategory === 'investor' ? (
        <Card cardClass="card-container__item">
          Total ROI:{' '}
          {type.investment.reduce(
            (acc: any, item: any) => acc + item.returns,
            0,
          )}
        </Card>
      ) : (
        <Card cardClass="card-container__item">
          Total Farm Units Available:{' '}
          {type.farm.reduce(
            (acc: any, item: any) => acc + item.unitsAvailable,
            0,
          )}
        </Card>
      )}
      {userCategory === 'investor' ? (
        <Card cardClass="card-container__item">
          Total Units:{' '}
          {type.investment.reduce((acc: any, item: any) => acc + item.units, 0)}
        </Card>
      ) : (
        <Card cardClass="card-container__item">
          User Category: {userCategory}
        </Card>
      )}
    </div>
  );
}
