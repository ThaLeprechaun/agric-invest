import React, { useEffect } from 'react';
import Card from '../Card/Card';
import './userItemDetail.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUserFarm } from '../../redux/actions/farmAction';

export default function UserItemDetails() {
  const selectedData = useSelector((state: any) => state);
  const farmDetails = selectedData.farm.farm!.farm;
  const investorFarm = selectedData.authUser.user.investment;
  const dispatch = useDispatch();

  useEffect(() => {
    investorFarm.map((farm: any) => dispatch(getUserFarm(farm.farm)));
  }, [dispatch, investorFarm]);

  return (
    <div className="cardItemContainer">
      <Card cardClass="card-class">
        <div className="card-class__header">Farm Investment Details</div>
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Farm</th>
              <th>Farm Produce</th>
              <th>Unit Price(N)</th>
              <th>Rate(%)</th>
              <th>Farm Location</th>
              <th>Farm Duartion</th>
            </tr>
          </thead>
          <tbody>
            {investorFarm.map((farm: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{farmDetails.farmName}</td>
                <td>{farmDetails.farmProduce}</td>
                <td>{farmDetails.unitPrice}</td>
                <td>{farmDetails.produceRate}</td>
                <td>{farmDetails.farmLocation}</td>
                <td>{farmDetails.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
