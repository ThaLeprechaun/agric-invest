import React from 'react';
import Hero from '../../components/Hero/Hero';

import './home.css';
import Products from '../../components/Products/Products';
import HowItWorks from '../../components/HowItWorks/HowItWorks';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Products />
    </>
  );
}
