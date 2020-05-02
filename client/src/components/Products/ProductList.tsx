import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

import './products.css';

export default function ProductLists() {
  const selectedData = useSelector((state: any) => state);
  const farms = selectedData.farm.farm?.doc;
  return (
    <div className="farm-products">
      {farms &&
        farms.map((product: any, index: number) => (
          <ProductCard farmProduct={product} key={index} />
        ))}
    </div>
  );
}
