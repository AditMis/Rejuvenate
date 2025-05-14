import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutScreen = () => {
  return (
    <>
      <Container className='hello' fluid>
        <Row>
          <Col>
            <h1>About Me</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutScreen;
