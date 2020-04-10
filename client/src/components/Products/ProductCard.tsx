import React from 'react';
import './products.css';

interface FarmProduceType {
  farmProduct: {
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
    farmName,
    farmProduce,
    farmLocation,
    unitPrice,
    produceRate,
    unitsAvailable,
    duration,
  } = farmProduct;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card-deck">
        <div className="card card-holder">
          <div className="image__badge--holder">
            <img
              src={require(`../../img/image-roosters.png`)}
              alt="product_avatar"
              className="card__image"
            />
            {unitsAvailable === 0 ? (
              <div className="badge__close">Closed</div>
            ) : (
              <div className="badge__open">Open</div>
            )}
          </div>
          <div className="product__details">
            <p>{farmName}</p>
            <p>{farmProduce}</p>
            <p>Available Units: {unitsAvailable}</p>
            <p>Unit price: {unitPrice}</p>
            <p>ROI: {produceRate}%</p>
            <p>Location: {farmLocation}</p>
            <p>Farm Duration: {duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
