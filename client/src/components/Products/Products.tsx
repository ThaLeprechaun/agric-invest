import React from 'react';
import ProductLists from './ProductList';

import './products.css';

export default function Products() {
  return (
    <div className="container">
      <div className="row">
        <div className="product__container">
          <div className="heading text-header">
            <h4>Our Farms</h4>
          </div>
          <ProductLists />
        </div>
      </div>
    </div>
  );
}
