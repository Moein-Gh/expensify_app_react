import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SideBarRow = ({ category }) => {
  return (
    <Link
      to={
        category.category === 'All Categories'
          ? `/category`
          : `/category/${category.category}`
      }
      style={{
        textDecoration: 'none',
      }}
    >
      <Row className='sideBarRowContainer' style={{ marginBottom: '10px' }}>
        <Col
          md={6}
          sm={6}
          xs={6}
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          <Image src={category.icon} className='p-1' style={{ width: '50%' }} />
        </Col>
        <Col md={6} sm={6} xs={6} className='m-auto sideBarTextColor fs-2'>
          {category.category}
        </Col>
      </Row>
    </Link>
  )
}

export default SideBarRow
