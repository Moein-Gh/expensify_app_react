import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#212529' }}>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; PetShop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
