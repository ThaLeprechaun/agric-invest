import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import FarmForm from '../Farms/FarmForm';
import './welcome.css';
import InvestmentForm from '../Investments/InvestmentForm';

export default function Welcome() {
  const selectedData = useSelector((state: any) => state);
  const userCategory = selectedData.authUser.user.user.userCategory;
  const firstName = selectedData.authUser.user.user.firstName;
  const lastName = selectedData.authUser.user.user.lastName;

  return (
    <div className="welcome__container">
      <div className="welcome__container--item">
        {userCategory === 'investor' ? (
          <div className="welcome__container--header">
            <div>
              Welcome, {firstName} {lastName}!
            </div>
            <div>
              <Modal buttonLabel="New Investment">
                <InvestmentForm />
              </Modal>
            </div>
          </div>
        ) : (
          <div className="welcome__container--header">
            <div>
              Welcome, {firstName} {lastName}!
            </div>
            <div>
              <Modal buttonLabel="New Farm">
                <FarmForm />
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
