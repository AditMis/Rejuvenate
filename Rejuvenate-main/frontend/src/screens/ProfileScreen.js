import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import {
  userActions_getUserDetails,
  userActions_updateUserProfile,
} from '../actions/userActions';
import { orderActions_listMyOrders } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //useState(null) setconfirmPassoword=useState(null);
  //const [message, setMessage] = useState()
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(userActions_getUserDetails('profile'));
        dispatch(orderActions_listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
    } else {
      //DISPATCH UPDATE PROFILE
      dispatch(
        userActions_updateUserProfile({ id: user._id, name, email, password })
      );
    }
  };

  return (
    <Container style={{ padding: '1.2rem' }}>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated!</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label className='mt-2 mb-1'>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label className='mt-2 mb-1'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label className='mt-2 mb-1'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label className='mt-2 mb-1'>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Button className='mt-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
