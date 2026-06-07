import React, { useMemo, useState } from 'react'
import { useAllProduct, useDeleteProduct, useRegisterProduct, useUpdateProduct } from '../../../no3_store/hooks/sales/useProduct';
import ProductModal from './ProductModal';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';

const ProductTable = () => {
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(null);
    const {data: productList=[], isLoading, error} = useAllProduct();
    const registerMutation = useRegisterProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const handleRegister = () => {
      setNewProduct(null);
      setOpen(true);
    }

    const handleUpdate = (item) =>{
      setNewProduct(item)
      setOpen(true)
    }
    const handleDelete = async (id) =>{
      if(window.confirm("정말 삭제하시겠습니까?")){
        await deleteMutation.mutateAsync(id)
      }
    }
    const defaultColDef = useMemo(()=> (
        {sortable: true, filter: true, resizable: true}
    ), [])

    const columnDefs = useMemo(()=>[
      {field: "product_name", headerName: "상품명", flex: 1},
      {field: "color", headerName: "색상", flex: 1},
      {field: "cost_price", headerName: "원가", flex: 1},
      {field: "sale_price", headerName: "판매가", flex: 1},
      {field: "category_code", headerName: "카테고리 코드", flex: 1},
      {
        headerName: "상품 관리",
        cellRenderer: (params) => (
          <ActionBox>
            <UpdateButtonn onClick={()=>handleUpdate(params.data)}>
              수정
            </UpdateButtonn>
            <DeleteButton onClick={()=>handleDelete(params.data.id)}>
              삭제
            </DeleteButton>
          </ActionBox>
        ),
         flex: 1},
    ], [handleUpdate, handleDelete])

    if(isLoading) return <Message>Loading...</Message>
    if(error) return <Message>{error.message}</Message>


    return (
    <Wrapper>
      <Header>
        <Title>상품 관리</Title>
        <RegisterButton onClick={handleRegister}>상품 등록</RegisterButton>
      </Header>
      <GridWrapper className='ag-theme-alpine'>
        <AgGridReact
          rowData={productList}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={25}
          animateRows={true}
          getRowId={(params) => params.data.id.toString()}
        />

      </GridWrapper>

      <ProductModal
        open={open}
        setOpen={setOpen}
        initialValues={newProduct}
        onSubmit={async (values) => {
          if(newProduct) {
            await updateMutation.mutate({...values, id: newProduct.id})
          }else{
            await registerMutation.mutate(values)
          }
        }}
      />
    </Wrapper>
  )
}

export default ProductTable;

const Wrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h2`
  margin: 0;
  color: #1e293b;
`

const RegisterButton = styled.button`
  border: none;
  padding: 12px 10px;
  border-radius: 10px;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  &:hover{
    background: #2563eb;
  }
`;

const GridWrapper = styled.div`
  width: 100%;
  height: 700px;
  border-radius: 12px;
  overflow: hidden;
`

const ActionBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 100%;
`

const UpdateButtonn = styled.button`
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  background: #10b981;
  color: white;
  vursor: pointer;
  &:hover{
    background: #059669;
  }
`;

const DeleteButton = styled.button`
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  background: #ef4444;
  color: white;
  vursor: pointer;
  &:hover{
    background: #dc2626;
  }
`

const Message = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 22px;
  font-weight: bold;
`