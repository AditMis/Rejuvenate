import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productActions_list } from '../actions/productActions';
import Message from '../components/message';
import { Image, InputGroup, Form } from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  //extracting 'productList' part of state, defined in store
  const productList = useSelector((state) => state.productList);
  //extracting info from 'productList' part of state into an Obj
  const { loading, error, products } = productList;

  //dispatching 'list products' action using useEffect
  useEffect(() => {
    dispatch(productActions_list(keyword));
  }, [dispatch, keyword]);

  document.body.addEventListener(
    'click',
    () => !keyword.trim() && setKeyword('')
  );
  return (
    <>
      <Form>
        <InputGroup>
          <Form.Control
            type='text'
            autoComplete='off'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search...'
            className='srch mr-sm-2 ml-sm-5'
          ></Form.Control>
        </InputGroup>
        {keyword.trim() &&
          (loading ? (
            <div style={{ position: 'absolute', zIndex: '10' }}>
              <div
                className='dropdown-item'
                style={{
                  backgroundColor: 'white',
                  minWidth: '100%',
                  padding: '5px',
                  borderRadius: '8px',
                  paddingTop: '0.7rem',
                  paddingBottom: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <div
                  className='dropdown-item'
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                  }}
                >
                  Please Wait...
                </div>
              </div>
            </div>
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div
              style={{
                position: 'absolute',
                zIndex: '10',
                marginTop: '0.5rem',
                backgroundColor: 'white',
                paddingTop: '0.8rem',
                borderRadius: '8px',
              }}
            >
              {products.map((product) => (
                <div
                  className='dropdown-item'
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                  }}
                >
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={`/${product.image}`}
                      className='srchImg'
                    ></Image>
                    {product.name}
                    <hr />
                  </Link>
                </div>
              ))}
            </div>
          ))}
      </Form>
    </>
  );
};

export default SearchBox;
