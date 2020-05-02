import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './investment.css';
import Card from '../Card/Card';
import { getInvestmentDetails } from '../../redux/actions/InvestmentAction';
import { getUserFarm } from '../../redux/actions/farmAction';

export default function Investments() {
  const selectedData = useSelector((state: any) => state);
  console.log(selectedData);
  const investments = selectedData.authUser.user.investment;
  const userId = selectedData.authUser.user.user._id;
  console.log(userId);
  const farmDetails = selectedData.farm.farm?.doc;
  console.log('lll', farmDetails);
  const dispatch = useDispatch();

  console.log(investments);
  useEffect(() => {
    farmDetails &&
      farmDetails.map((farm: any) => dispatch(getUserFarm(farm?.farm)));
  }, [dispatch, farmDetails]);
  console.log(farmDetails);

  // useEffect(() => {
  //   farmDetails && farmDetails.map((farm: any) => farm);
  // }, [dispatch, investments]);
  return (
    <div className="investmentContainer">
      <Card cardClass="card-investment">
        <div className="card-class__header">Investment Details</div>
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Farm</th>
              <th>Unit Invested</th>
              <th>Amount Invested</th>
              <th>ROI(₦)</th>
              <th>Date of Investment</th>
              <th>Expected Return Date</th>
            </tr>
          </thead>
          <tbody>
            {investments &&
              investments.map((farm: any, index: any) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{farm.farm}</td>
                  <td>{farm.units}</td>
                  <td>{farm?.amount}</td>
                  <td>{farm?.returns}</td>
                  <td>{farm?.investmentDate}</td>
                  <td>{farm?.duration}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
