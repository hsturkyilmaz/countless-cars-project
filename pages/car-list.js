import React, { useEffect, useState } from 'react';
import Router from "next/router";
import Head from 'next/head'
import styles from '../styles/CarList.module.scss'

const CarList = ({ cars }) => {

  const [filters, setFilters] = useState({});
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  
  const resetFilters = () => {
    setSelectedVendor('');
    setSelectedBrand('');
    setSelectedTransmission('');
  };

  useEffect(() => {
    fetch("https://ylc-fr-case.herokuapp.com/api/filters", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: 'imparator fatih terim'
      }
    })
    .then(response => response.json())
    .then(data => setFilters(data))
  },[])

  return (
    <div className="container my-5">
      <Head>
        <title>Countless Cars | Car List</title>
        <meta name="description" content="You have countless cars!" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`row justify-content-center ${styles.filters}`}>
        <div className="col-lg-3 col-md-12">
          <select className="form-select" onChange={event => setSelectedVendor(event.target.value)}>
            <option disabled selected>Select vendor</option>
            {filters.vendors?.map(vendor => <option key={vendor} >{vendor}</option>)}
          </select>
        </div>
        <div className="col-lg-3 col-md-6">
          <select className="form-select" onChange={event => setSelectedBrand(event.target.value)}>
            <option disabled selected>Select brand</option>
            {filters.brand?.map(brand => <option key={brand}>{brand}</option>)}
          </select>
        </div>
        <div className="col-lg-3 col-md-6">
          <select className="form-select" onChange={event => setSelectedTransmission(event.target.value)}>
            <option disabled selected>Select transmission</option>
            {filters.transmission?.map(transmission =>
            <option key={transmission}>{transmission}
            </option>)}
          </select>
        </div>
        <button className="col-lg-3 col-md-12 btn btn-outline-warning w-50" onClick={resetFilters}>Reset Filters</button>
      </div>
      
      <div className={`row justify-content-center ${styles['card-wrapper']}`}>{cars.map((data) => (
        <div className={`
          col-12
          ${styles.card}
          ${!(selectedVendor || selectedBrand || selectedTransmission) ? 'd-flex' : ''}
          ${(selectedVendor === data.vendor.name)
            || (selectedBrand === data.car.brand.name)
            || (selectedTransmission === data.car.transmission) ? '' : styles.hidden}
        `} key={data.id}>
          <h1 className={styles.brand}>{data.car.brand.name} {data.car.name}</h1>
          <div className="row gx-5">
            <div className={`col-md-6 ${styles['card-left']}`}>
              <figure>
                <img src={data.car.image.large} alt={data.car.name} width="256px" />
              </figure>
              <div className={styles['car-info']}>
                <div>🕹️ {data.car.transmission}</div>
                <div>⛽ {data.car.fuel}</div>
                <div>🚙 {data.car.class}</div>
              </div>
            </div>
            <div className={`col-md-6 justify-content-center mt-5 ${styles['card-right']}`}>
              <div className={styles['vendor-info']}>
                ℹ️ How to pick up your car? <strong>{data.vendor.name} Office</strong>
              </div>
              <div className={styles['rental-info']}>
                <img src={data.vendor.logoUrl} alt={data.vendor.name} width="128px" />
                <div>
                  <strong>{data.pricing.totalPrice}</strong>
                  <small> {data.currency}</small>
                </div>
              </div>
              <button className="btn btn-success btn-lg w-100" onClick={() => Router.push('/payment')}>Rent now!</button>
            </div>
          </div>
        </div>
      ))}</div>
    </div>
  )
}

CarList.getInitialProps = async (ctx) => {
  const res = await fetch('https://ylc-fr-case.herokuapp.com/api/cars', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: 'imparator fatih terim'
    },
  })
  const json = await res.json()
  return { cars: json }
}

export default CarList;