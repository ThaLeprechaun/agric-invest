import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './investment.css';
import Card from '../Card/Card';
import { getUserFarm } from '../../redux/actions/farmAction';

export default function Investments() {
  const selectedData = useSelector((state: any) => state);
  const investments = selectedData.authUser.user.investment;
  const farmDetails = selectedData.farm.farm!.farm;
  console.log(farmDetails);
  const dispatch = useDispatch();

  console.log(investments);
  useEffect(() => {
    investments.map((farm: any) => dispatch(getUserFarm(farm.farm)));
  }, [dispatch, investments]);
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
              <th>ROI(N)</th>
              <th>Date of Investment</th>
              <th>Expected Return Date</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{farmDetails.farmName}</td>
                <td>{investment.units}</td>
                <td>{investment.amount}</td>
                <td>{investment.returns}</td>
                <td>{investment.investmentDate}</td>
                <td>{investment.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
