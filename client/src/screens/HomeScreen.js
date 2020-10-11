import React, { useEffect } from 'react'

//Bootstrap
import { Row, Col } from 'react-bootstrap'

//Components
import Product from '../components/Product'
import Message from '../utils/Message'
import Loader from '../utils/Loader'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productAction'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((prod) => (
            <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={prod} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
