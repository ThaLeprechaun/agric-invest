import React, { useEffect } from 'react';
import Card from '../Card/Card';
import './userItemDetail.css';
import { useSelector } from 'react-redux';

export default function UserItemDetails() {
  const selectedData = useSelector((state: any) => state);
  const farmDetails = selectedData.farm.farm?.doc;

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
              <th>Unit Price(₦)</th>
              <th>Rate(%)</th>
              <th>Farm Location</th>
              <th>Farm Duartion</th>
            </tr>
          </thead>
          <tbody>
            {farmDetails &&
              farmDetails.map((farm: any, index: any) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{farm?.farmName}</td>
                  <td>{farm?.farmProduce}</td>
                  <td>{farm?.unitPrice}</td>
                  <td>{farm?.produceRate}</td>
                  <td>{farm?.farmLocation}</td>
                  <td>{farm?.duration}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
