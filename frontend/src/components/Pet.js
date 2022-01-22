import React from 'react'
import { Badge } from 'react-bootstrap'

const Pet = ({ pet }) => {
  return (
    <article className='HSpetCard light green'>
      <div className='petCardImageContainer'>
        <a className='HSpetCard__img_link' href={`/pet/${pet._id}`}>
          <Badge className='tag__item petBadge'>
            <i className='fas fa-tags mr-2'></i> &nbsp;
            {pet.category}
          </Badge>
          <img className='HSpetCard__img' src={pet.image} alt={pet.name} />
        </a>
      </div>
      <div className='HSpetCard__text t-dark w-100'>
        <h1 className='HSpetCard__title green'>
          <a href={`/pet/${pet._id}`}>{pet.name}</a>
        </h1>
        <div className='HSpetCard__subtitle small'>
          <time dateTime='2020-05-25 '>
            <i className='fas fa-calendar-alt mr-2'></i>
            &nbsp;{pet.createdAt.split('T')[0]}
          </time>
        </div>
        <div className='HSpetCard__bar'></div>
        <div className='HSpetCard__description fs-4'>
          {pet.description.substring(0, 20)} ...
        </div>
        <div>
          <ul className='HSpetCard__tagbox'>
            <li className='tag__item petTag'>
              <i className='fas fa-calendar-alt mr-2'></i>
              &nbsp;{pet.age}&nbsp;(MO)
            </li>
            {pet.forSellOrDonation === 'sell' ? (
              <li className='tag__item petTag'>
                <i className='fas fa-money-bill-alt mr-2'></i>
                &nbsp;{`$${pet.price}`}
              </li>
            ) : (
              pet.forSellOrDonation === 'donation' && (
                <li className='tag__item petTag'>
                  <i className='fas fa-handshake mr-2'></i>
                  &nbsp;For Donation
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </article>

    // <Card className='mb-2 rounded HSpetCardBody'>
    //   <Link to={`/pet/${pet._id}`}>
    //     <Card.Img
    //       className='cardImage'
    //       src={pet.image}
    //       variant='top'
    //       style={{ borderRadius: '10px' }}
    //     ></Card.Img>
    //   </Link>
    //   <Card.Body
    //     className=''
    //     style={{ padding: '0.75rem 2rem', color: 'black' }}
    //   >
    //     <Link
    //       to={`/pet/${pet._id}`}
    //       style={{
    //         textDecoration: 'none',
    //       }}
    //     >
    //       <Card.Title
    //         as='div'
    //         className='fs-5 text-center PetTitle'
    //         style={{
    //           borderBottom: 'black 1px dotted',
    //           paddingBottom: '5px',
    //           color: 'black',
    //         }}
    //       >
    //         {' '}
    //         <strong> {pet.name}</strong>
    //       </Card.Title>
    //     </Link>
    //     <Row>
    //       <Col md={6} sm={6} xs={6}>
    //         <Card.Title as='div' className='text-center fs-6'>
    //           <strong>Age</strong>(month)
    //           <br></br>
    //           {pet.age}
    //         </Card.Title>
    //       </Col>
    //       <Col md={6} sm={6} xs={6}>
    //         <Card.Title as='div' className='text-center fs-6'>
    //           <strong>Category</strong> <br></br>
    //           {pet.category}
    //         </Card.Title>
    //       </Col>
    //     </Row>

    //     <Card.Text
    //       as='h3'
    //       className='text-center'
    //       style={{ borderTop: 'black 1px dotted', paddingBottom: '5px' }}
    //     >
    //       {pet.forSellOrDonation === 'sell' ? `$${pet.price}` : 'For Donation'}
    //     </Card.Text>
    //   </Card.Body>
    // </Card>
  )
}

export default Pet
