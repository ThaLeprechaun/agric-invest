import React from 'react';
import './products.css';
import Card from '../Card/Card';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AntModal from '../AntModal/AntModal';
import { useSelector, useDispatch } from 'react-redux';
import { investAction } from '../../redux/actions/InvestmentAction';

interface FarmProduceType {
  farmProduct: {
    _id: string;
    farmName: string;
    farmProduce: string;
    farmLocation: string;
    unitPrice: number;
    produceRate: number;
    unitsAvailable: number;
    duration: string;
  };
  image?: string;
}

export default function ProductCard({ farmProduct, image }: FarmProduceType) {
  const {
    _id,
    farmName,
    farmProduce,
    farmLocation,
    unitPrice,
    produceRate,
    unitsAvailable,
    duration,
  } = farmProduct;
  const initialState = {
    units: 0,
    investmentPrice: unitPrice,
    investmentRate: produceRate,
    totalValue: '',
  };
  const [investmentDetails, setInvestmentDetails] = useState(initialState);
  const {
    units,
    investmentPrice,
    investmentRate,
    totalValue,
  } = investmentDetails;
  console.log(investmentDetails);
  const selectedData = useSelector((state: any) => state);
  console.log(selectedData);
  const dispatch = useDispatch();
  const userId = selectedData?.authUser?.user?.user._id;
  const farmId = _id;

  // if(!userId) {
  //   return (
  //     <SuspenseBoundary>
  //       <LoginForm />
  //     </SuspenseBoundary>
  //   )
  // }

  // useEffect(()=>{

  // }, [])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setInvestmentDetails({
      ...investmentDetails,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (userId === undefined) {
    //   return alert('You need to Login/Register to make an investment');
    // }

    if (Number(units) < 1) {
      return alert('Units must be higher than 0');
    }

    const body = { units };
    console.log(body);
    dispatch(investAction(userId, farmId, body));
    return;
  };

  return (
    <>
      <Card cardClass="farm-card__container">
        <div className="farm-card__image">
          <img
            src={require(`../../img/image-roosters.png`)}
            alt="product_avatar"
            className="card__image"
          />
        </div>
        <div className="product__details">
          <p className="farm-heading">{farmName}</p>
          <p>Farm Produce: {farmProduce}</p>
          <p>Available Units: {unitsAvailable}</p>
          <p>Unit Price: {unitPrice}</p>
          <p>ROI: {produceRate}%</p>
          <p>Location: {farmLocation}</p>
          <p>Farm Duration: {duration}</p>
        </div>
        <AntModal buttonName="Invest">
          <form className="invest-form" id="farmForm" onClick={handleSubmit}>
            <input
              type="text"
              name="units"
              value={units}
              onChange={handleChange}
              placeholder="Units"
              aria-label="units"
              required
            />
            <input
              type="text"
              name="unit-price"
              value={investmentPrice}
              onChange={handleChange}
              placeholder="Unit Price"
              aria-label="unit price"
              required
              disabled
            />
            <input
              type="text"
              name="roi"
              value={investmentRate}
              onChange={handleChange}
              placeholder="ROI"
              aria-label="roi"
              required
              disabled
            />
            <input
              type="text"
              name="total value"
              value={totalValue}
              onChange={handleChange}
              placeholder="Total Return Value"
              aria-label="total value"
              required
              disabled
            />
            <Button
              buttonName="Add Investment"
              buttonClass="farm-invest__button"
            />
          </form>
        </AntModal>
      </Card>
    </>
  );
}
