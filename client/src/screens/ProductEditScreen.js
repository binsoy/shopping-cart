import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//Bootstrap
import { Form, Button } from 'react-bootstrap'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { productDetails, updateProduct } from '../redux/actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../redux/types'

//Components
import Message from '../utils/Message'
import Loader from '../utils/Loader'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const dispatch = useDispatch()

  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const productDetail = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCountInStock(product.countInStock)
        setCategory(product.category)
        setDescription(product.description)
      }
    }
  }, [dispatch, product, productId, history, successUpdate])

  const handleUploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setIsUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/formdata',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post('/api/uploads', formData, config)

      if (data) {
        setImage(data.imageUrl)
      }
      setIsUploading(false)
    } catch (error) {
      console.error(error)
      setIsUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price Value</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.File
                id='image-file'
                label='Choose file'
                custom
                onChange={handleUploadFile}
              />
              {isUploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='Brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
