import React, { useState } from 'react';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';

export default function InvestmentForm() {
  const dispatch = useDispatch();
  const selectedData = useSelector((state: any) => state);
  const userId = selectedData.authUser.user.user._id;
  console.log(selectedData);
  const [unit, setUnit] = useState(0);

  const handleChange = (e: any) => {
    const value = e.currentTarget.value;
    return setUnit(() => value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!unit) {
      alert('All fields are required');
      return;
    }
  };

  return (
    <>
      <div className="form__card--heading">Create a new farm</div>
      <form className="form" onSubmit={handleSubmit} id="farmForm">
        <input
          type="text"
          name="units"
          placeholder="Units"
          onChange={handleChange}
          value={unit}
          aria-label="Farm Name"
          required
        />
        <Button buttonName="create farm" buttonClass="farm__form-button" />
      </form>
    </>
  );
}
