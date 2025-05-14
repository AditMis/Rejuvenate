//script for rendering the Product screen

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import {
  productActions_details,
  productActions_createProductReview,
} from '../actions/productActions';
import Loader from '../components/loader';
import Message from '../components/message';

// <Route/> renders ProductScreen component by passing
// props (match, location, history)
// here, we're extracting history & match for use
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' });
    }
    dispatch(productActions_details(match.params.id));
  }, [dispatch, match, successProductReview]);

  //handles add to cart button presses
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productActions_createProductReview(match.params.id, { rating, comment })
    );
  };
  return (
    <Container style={{ padding: '1.2rem' }}>
      <Link className='btn btn-outline-primary my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' />
      ) : (
        <>
          <Row>
            <Col md={6} className='text-center'>
              <Image src={`/${product.image}`} width='400px' fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2 className='py-2'>{product.name}</h2>
                  <div className='ctg'>{product.category}</div>
                </ListGroupItem>

                <ListGroupItem className='my-2'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>

                <ListGroupItem>
                  Price: <span className='mrp'>₹{product.price + 200}</span> ₹
                  {product.price}
                </ListGroupItem>

                <ListGroupItem className='my-2'>
                  <h5 className='mb-3'>Description: </h5>
                  {product.description}
                </ListGroupItem>

                <ListGroupItem>
                  <h5 className='mb-3'>Beneficial for: </h5> {product.category}
                </ListGroupItem>

                <ListGroupItem>
                  <h5 className='mt-2 mb-3'>This product is</h5>
                  <p>
                    <i
                      className='far fa-check-square'
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    &nbsp; Fragrance Free
                  </p>

                  <p>
                    <i
                      className='far fa-check-square'
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    &nbsp; Silicone Free
                  </p>

                  <p>
                    <i
                      className='far fa-check-square'
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    &nbsp; Brightens Complexion
                  </p>

                  <p>
                    <i
                      className='far fa-check-square'
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    &nbsp; Paraben Free
                  </p>

                  <p>
                    <i
                      className='far fa-check-square'
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    &nbsp; Reduces Dark Spots
                  </p>

                  <p>
                    <i
                      className='far fa-check-square'
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    &nbsp; pH: 3.9 - 4.9
                  </p>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup varients='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          {/*  */}
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button
                      className='btn btn-primary w-100'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label className='mb-1 mt-2'>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label className='mb-1 mt-2'>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button className='mt-3' type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Sign In</Link> to write a review.
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
