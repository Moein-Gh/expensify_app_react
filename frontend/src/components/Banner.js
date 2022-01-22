import React from 'react'
import { Row, Col, Image, Card } from 'react-bootstrap'

const Banner = () => {
  return (
    <Row style={{ padding: '0', margin: '0' }}>
      <Col
        style={{ padding: '0', margin: '0' }}
        className='bannerImageContainer'
      >
        <Row>
          <Col xs={5} md={4} lg={3} className='bannerTextContainer py-3'>
            <Row className=''>
              {' '}
              <h1>WELCOME</h1>
            </Row>
            <Row className=''>
              <h1>
                {' '}
                <i className='fas fa-paw'></i> TO <i className='fas fa-paw'></i>
              </h1>
            </Row>
            <Row className=''>
              <h1>PET SHOP</h1>
            </Row>
          </Col>
        </Row>
        {/* <Image
          className='bannerImage'
          src='../images/banner7.jpg'
          style={{
            objectFit: 'cover',
            width: '100%',
            left: '0',
            paddingBottom: '3rem',
            overflow: 'hidden',
            padding: '0',
            margin: '0',
            minHeight: '500px',
          }}
        ></Image> */}
      </Col>
    </Row>
  )
}

export default Banner
