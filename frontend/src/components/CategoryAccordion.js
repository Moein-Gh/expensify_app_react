import React from 'react'
import { Row, Col, Accordion, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryAccordion = () => {
  const categories = [
    { category: 'All Categories', icon: '../images/icons/all.png' },
    { category: 'Dog', icon: '../images/icons/dog.png' },
    { category: 'Cat', icon: '../images/icons/cat.png' },
    { category: 'Rabbit', icon: '../images/icons/rabbit.png' },
    { category: 'Rodent', icon: '../images/icons/rodent.png' },
    { category: 'hedgehog', icon: '../images/icons/hedgehog.png' },
    { category: 'turtle', icon: '../images/icons/turtle.png' },
    { category: 'bird', icon: '../images/icons/bird.png' },
    { category: 'fish', icon: '../images/icons/fish.png' },
  ]
  return (
    <Accordion defaultActiveKey='1' flush className='pb-3 px-4 '>
      <Accordion.Item eventKey='0'>
        <Accordion.Header className='fs-4'>Categories</Accordion.Header>
        <Accordion.Body>
          <Row>
            {categories.map((category) => (
              <Col
                key={category.category}
                sm={4}
                md={4}
                xs={4}
                style={{ padding: '1rem' }}
              >
                <Link
                  to={
                    category.category === 'All Categories'
                      ? `/category/`
                      : `/category/${category.category}`
                  }
                  style={{ textDecoration: 'none !important' }}
                >
                  <Row>
                    <Col sm={6} md={6} xs={6} style={{ textAlign: 'right' }}>
                      <Image
                        src={category.icon}
                        className=''
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <Col
                      className='fs-5'
                      sm={6}
                      md={6}
                      xs={6}
                      style={{
                        margin: 'auto',
                        paddingLeft: '0',
                        color: 'black',
                      }}
                    >
                      {category.category}
                    </Col>
                  </Row>
                </Link>
              </Col>
            ))}
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default CategoryAccordion
