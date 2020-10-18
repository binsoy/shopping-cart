import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

//Bootstrap
import { Carousel, Image } from 'react-bootstrap'

//Components
import Loader from '../utils/Loader'
import Message from '../utils/Message'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../redux/actions/productAction'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((p) => (
        <Carousel.Item key={p._id}>
          <Link to={`/product/${p._id}`}>
            <Image src={p.image} alt={p.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {p.name} ${p.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
