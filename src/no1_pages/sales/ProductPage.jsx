import React from 'react'
import ProductTable from '../../no2_components/sales/product/ProductTable'
import styled from 'styled-components'
import { getCurrentUser } from '../../no3_store/hooks/useUser'
import AuthControl from '../../no2_components/layout/AuthControl'


const ProductPage = () => {
  const user = getCurrentUser();
  if(!user){
    return(
      <AuthControl
        message="로그인 후 상품 정보 조회 및 관리 가능합니다."
      />
    )
  }
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