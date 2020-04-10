import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

export default function Farms() {
  const selectedData = useSelector((state: any) => state);
  const farmDetails = selectedData.authUser.user.farm;
  return (
    <div className="cardItemContainer">
      <Card cardClass="card-class">
        <div className="card-class__header">Farm Details</div>
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Farm</th>
              <th>Farm Produce</th>
              <th>Unit Price(N)</th>
              <th>Rate(%)</th>
              <th>Available Units</th>
              <th>Farm Location</th>
              <th>Farm Duration</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {farmDetails.map((farm: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{farm.farmName}</td>
                <td>{farm.farmProduce}</td>
                <td>{farm.unitPrice}</td>
                <td>{farm.produceRate}</td>
                <td>{farm.unitsAvailable}</td>
                <td>{farm.farmLocation}</td>
                <td>{farm.duration}</td>
                <td>{farm.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
