import React from 'react'
import { Row, Card } from 'react-bootstrap'
import SideBarRow from './SideBarRow'

const SideBar = () => {
  const categories = [
    { category: 'All Categories', icon: '../images/icons/all.png' },
    { category: 'Dog', icon: '../images/icons/dog.png' },
    { category: 'Cat', icon: '../images/icons/cat.png' },
    { category: 'Rabbit', icon: '../images/icons/rabbit.png' },
    { category: 'Rodent', icon: '../images/icons/rodent.png' },
    { category: 'Hedgehog', icon: '../images/icons/hedgehog.png' },
    { category: 'Turtle', icon: '../images/icons/turtle.png' },
    { category: 'Bird', icon: '../images/icons/bird.png' },
    { category: 'Fish', icon: '../images/icons/fish.png' },
  ]
  return (
    <Card className='SideBarCard'>
      <Row className='mx-auto' id='titleOfCard'>
        <h3
          className='border-bottom py-2 sideBarTextColor'
          style={{ width: '100%' }}
        >
          Categories
        </h3>
      </Row>

      {categories.map((category) => (
        <SideBarRow key={category.category} category={category} />
      ))}
    </Card>
  )
}

export default SideBar
