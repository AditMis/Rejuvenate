//script for rendering the Homescreen
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions_list } from '../actions/productActions';
import { Carousal, Container, Image, Row, Col } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/loader';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
//list of all products
//state levels- component(menu,forms) and global(products, users)

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  //extracting 'productList' part of state, defined in store
  const productList = useSelector((state) => state.productList);
  //extracting info from 'productList' part of state into an Obj
  const { loading, error, products, page, pages } = productList;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //dispatching 'list products' action using useEffect
  useEffect(() => {
    dispatch(productActions_list('', pageNumber));
  }, [dispatch, match, pageNumber]);

  return (
    <>
      {/* explore */}
      <Container className='hello' fluid>
        <Row>
          <Col>
            <h1>Let's talk Science.</h1>
          </Col>
        </Row>
      </Container>
      <Container className='helloImg' fluid>
        <Row>
          <Col>
            <Image
              alt=''
              src='https://cdn.shopify.com/s/files/1/0410/9608/5665/files/minimalist-skin-1-min.png?v=1593807250'
              fluid
            ></Image>
          </Col>
        </Row>
      </Container>
      <Container className='text-center py-5' fluid>
        <Row style={{ paddingLeft: '6rem', paddingRight: '6rem' }}>
          <Col>
            <h4>
              <strong>Looking for clean & effective skincare products?</strong>
            </h4>
            <p style={{ paddingTop: '1rem' }}>
              We have all been there. You look for a product that addresses your
              particular skin concern. But there's an ocean of products out
              there with numerous promises & claims but hardly any clear
              information about ingredients used and their concentration. We are
              here to offer no-nonsense, hardworking, active based products that
              do what they are expected to do.
            </p>
          </Col>
        </Row>
      </Container>

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='holder.js/800x400?text=First slide&bg=373940'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='holder.js/800x400?text=Second slide&bg=282c34'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='holder.js/800x400?text=Third slide&bg=20232a'
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h3
        style={{
          textAlign: 'center',
          marginTop: '4rem',
          marginBottom: '1.8rem',
        }}
      >
        <span className='underlineCustom'>Shop our bestsellers</span>
      </h3>
      {/*if loading then show loading, else show error, else show actual data*/}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Container className='mb-5'>
            <Row className='justify-content-center'>
              {/*loop through all products and render Product component for each product, while
                    passing array element as a prop*/}
              {products.map((currProduct) => (
                <Col xs={5} sm={5} md={4} lg={3}>
                  <Product product={currProduct} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} />
          </Container>
          {/* explore */}
          <Container fluid>
            <Container className='text-center'>
              <Row className='mb-2'>
                <h2 style={{ marginTop: '8rem' }}>Real Stories</h2>
              </Row>
              <Row style={{ marginBottom: '11rem' }}>
                <Col sm={6} md={4}>
                  <i
                    className='fas fa-quote-left'
                    style={{ float: 'left' }}
                  ></i>
                  <p>
                    &nbsp; I love this Vitamin C serum, I can see my skin
                    becomes brighter after one to two days only which is
                    remarkable.
                  </p>
                  <p>
                    <strong> - John Doe </strong>
                  </p>
                </Col>
                <Col sm={6} md={4}>
                  <i
                    className='fas fa-quote-left'
                    style={{ float: 'left' }}
                  ></i>
                  <p>
                    &nbsp; I have been struggling with oily, acne-prone skin.
                    After applying the serum before bed, I wake up with fresh &
                    even skin that hasn't gotten oily overnight!
                  </p>
                  <p>
                    <strong> - Jane Fletcher</strong>
                  </p>
                </Col>
                <Col sm={6} md={4}>
                  <i
                    className='fas fa-quote-left'
                    style={{ float: 'left' }}
                  ></i>
                  <p>
                    &nbsp; Its really working. I was having mild wrinkles around
                    my eyes but it has been reduced after 4-5 applications.
                  </p>
                  <p>
                    <strong> - Alex Mercer </strong>
                  </p>
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreen;
