import React from 'react'
import ProductTable from '../../no2_components/sales/product/ProductTable'
import styled from 'styled-components'


const ProductPage = () => {
  return (
    <Container>
      <ProductTable/>
    </Container>
  )
}

export default ProductPage

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f3f4f6;
  padding: 30px;
  box-sizing: border-box;
`