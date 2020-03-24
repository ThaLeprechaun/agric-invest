import React, { Suspense } from 'react';

function loading() {
  return <>Loading...</>;
}

type MyProps = {
  children: string | JSX.Element | JSX.Element[];
};

const SuspenseBoundary = ({ children }: MyProps) => {
  return <Suspense fallback={loading}>{children}</Suspense>;
};

export default SuspenseBoundary;
