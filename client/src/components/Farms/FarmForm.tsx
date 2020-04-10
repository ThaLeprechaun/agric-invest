import React, { useState } from 'react';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { newFarm } from '../../redux/actions/farmAction';
import './farmForm.css';

export default function FarmForm() {
  const dispatch = useDispatch();
  const selectedData = useSelector((state: any) => state);
  const userId = selectedData.authUser.user.user._id;
  const initialState = {
    farmName: '',
    farmCategory: '',
    farmProduce: '',
    farmLocation: '',
    unitPrice: '',
    produceRate: '',
    unitsAvailable: '',
    duration: '',
  };

  const [farm, setFarm] = useState(initialState);

  const {
    farmName,
    farmCategory,
    farmProduce,
    farmLocation,
    unitPrice,
    produceRate,
    unitsAvailable,
    duration,
  } = farm;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setFarm({ ...farm, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !farmName ||
      !farmCategory ||
      !farmProduce ||
      !farmLocation ||
      !unitPrice ||
      !produceRate ||
      !unitsAvailable ||
      !duration
    ) {
      alert('All fields are required');
      return;
    }

    const body = {
      farmName,
      farmCategory,
      farmProduce,
      farmLocation,
      unitPrice,
      produceRate,
      unitsAvailable,
      duration,
    };
    dispatch(newFarm(userId, body));
    return;
  };
  return (
    <>
      <div className="form__card--heading">Create a new farm</div>
      <form className="form" onSubmit={handleSubmit} id="farmForm">
        <input
          type="text"
          name="farmName"
          placeholder="Farm Name"
          onChange={handleChange}
          value={farmName}
          aria-label="Farm Name"
          required
        />
        <input
          type="text"
          name="farmCategory"
          placeholder="Farm Category"
          onChange={handleChange}
          value={farmCategory}
          aria-label="Farm Category"
          required
        />
        <input
          type="text"
          name="farmProduce"
          placeholder="Farm Produce"
          onChange={handleChange}
          value={farmProduce}
          aria-label="Farm Produce"
          required
        />
        <input
          type="text"
          name="unitPrice"
          placeholder="Unit Price"
          onChange={handleChange}
          value={unitPrice}
          aria-label="Unit Price"
          required
        />
        <input
          type="text"
          name="farmLocation"
          placeholder="Farm Location"
          onChange={handleChange}
          value={farmLocation}
          aria-label="Farm Location"
          required
        />
        <input
          type="text"
          name="produceRate"
          placeholder="Produce Rate"
          onChange={handleChange}
          value={produceRate}
          aria-label="Produce Rate"
          required
        />
        <input
          type="text"
          name="unitsAvailable"
          placeholder="Units Available"
          onChange={handleChange}
          value={unitsAvailable}
          aria-label="Units Available"
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Farm duration"
          onChange={handleChange}
          value={duration}
          aria-label="Farm duration"
          required
        />
        <Button buttonName="create farm" buttonClass="farm__form-button" />
      </form>
    </>
  );
}
