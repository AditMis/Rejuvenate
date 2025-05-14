import React, { useState } from 'react';
import { Container, Form, FormGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { cartActions_saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch saveShippingAddress
    dispatch(
      cartActions_saveShippingAddress({ address, city, postalCode, country })
    );
    history.push('/payment');
  };
  return (
    <Container style={{ padding: '1.2rem' }}>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId='address'>
            <Form.Label className='mt-2 mb-1'>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='city'>
            <Form.Label className='mt-2 mb-1'>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='postalCode'>
            <Form.Label className='mt-2 mb-1'>PostalCode</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postalCode'
              value={postalCode}
              required
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='country'>
            <Form.Label className='mt-2 mb-1'>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              required
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></Form.Control>
          </FormGroup>
          <Button className='mt-3' type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};
export default ShippingScreen;
