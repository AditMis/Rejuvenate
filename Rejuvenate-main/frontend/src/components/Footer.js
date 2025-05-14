import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='foot text-white mt-5'>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item className='mt-5'>
                <h4>Rejuvenate</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <i
                  className='fab fa-facebook-square'
                  style={{ fontSize: '1.5rem', marginRight: '1rem' }}
                ></i>
                <i
                  className='fab fa-instagram-square'
                  style={{ fontSize: '1.5rem' }}
                ></i>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <div className='mt-5'>
                <h5 style={{ color: 'white', marginBottom: '2rem' }}>About</h5>
              </div>
              <div>Our Values</div>
              <div>Privacy Policies</div>
              <div>Terms & Conditions</div>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <div className='mt-5'>
                <h5 style={{ color: 'white', marginBottom: '2rem' }}>Help</h5>
              </div>
              <div>Knowledge</div>
              <div>FAQs</div>
              <div>Refund & Return Policies</div>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <div className='mt-5'>
                <h5 style={{ color: 'white', marginBottom: '2rem' }}>
                  Sign Up and Save !
                </h5>
              </div>
              <div>
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </div>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col className='text-center mt-4 py-3'>&copy; Rupesh 2021</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
