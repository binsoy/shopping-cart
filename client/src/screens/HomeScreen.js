import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
//Bootstrap
import { Row, Col } from 'react-bootstrap'

//Components
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import Message from '../utils/Message'
import Loader from '../utils/Loader'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productAction'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((prod) => (
              <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={prod} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
