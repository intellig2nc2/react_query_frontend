import React, { useCallback, useMemo, useState } from 'react'
import {
  useAllProduct,
  useDeleteProduct,
  useRegisterProduct,
  useUpdateProduct
} from '../../../no3_store/hooks/sales/useProduct'
import ProductModal from './ProductModal'
import { AgGridReact } from 'ag-grid-react'
import styled from 'styled-components'

const ProductTable = () => {
  const [open, setOpen] = useState(false)
  const [newProduct, setNewProduct] = useState(null)

  const { data: productList = [], isLoading, error } = useAllProduct()

  const registerMutation = useRegisterProduct()
  const updateMutation = useUpdateProduct()
  const deleteMutation = useDeleteProduct()

  const handleRegister = () => {
    setNewProduct(null)
    setOpen(true)
  }

  const handleUpdate = useCallback((item) => {
    setNewProduct(item)
    setOpen(true)
  }, [])

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        await deleteMutation.mutateAsync(id)
      }
    },
    [deleteMutation]
  )

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true
    }),
    []
  )

  const columnDefs = useMemo(
    () => [
      {
        field: 'product_name',
        headerName: '상품명',
        flex: 1.4
      },
      {
        field: 'color',
        headerName: '색상',
        flex: 1
      },
      {
        field: 'cost_price',
        headerName: '원가',
        flex: 1,
        valueFormatter: (params) =>
          params.value ? `${Number(params.value).toLocaleString()}원` : ''
      },
      {
        field: 'sale_price',
        headerName: '판매가',
        flex: 1,
        valueFormatter: (params) =>
          params.value ? `${Number(params.value).toLocaleString()}원` : ''
      },
      {
        field: 'category_code',
        headerName: '카테고리 코드',
        flex: 1
      },
      {
        headerName: '상품 관리',
        flex: 1.2,
        cellRenderer: (params) => (
          <ActionBox>
            <UpdateButton onClick={() => handleUpdate(params.data)}>
              수정
            </UpdateButton>

            <DeleteButton onClick={() => handleDelete(params.data.id)}>
              삭제
            </DeleteButton>
          </ActionBox>
        )
      }
    ],
    [handleUpdate, handleDelete]
  )

  if (isLoading) {
    return (
      <MessageBox>
        <MessageTitle>상품 정보를 불러오는 중입니다.</MessageTitle>
        <MessageText>잠시만 기다려 주세요.</MessageText>
      </MessageBox>
    )
  }

  if (error) {
    return (
      <MessageBox>
        <MessageTitle>상품 정보를 불러오지 못했습니다.</MessageTitle>
        <MessageText>{error.message}</MessageText>
      </MessageBox>
    )
  }

  return (
    <Wrapper>
      <Header>
        <TitleBox>
          <Title>상품 관리</Title>
          <SubTitle>등록된 상품 정보를 확인하고 수정할 수 있습니다.</SubTitle>
        </TitleBox>

        <RegisterButton onClick={handleRegister}>
          + 상품 등록
        </RegisterButton>
      </Header>

      <InfoBar>
        <InfoText>
          전체 상품 <strong>{productList.length}</strong>개
        </InfoText>
      </InfoBar>

      <GridWrapper className="ag-theme-alpine" style={{height: "800px",width:"100%"}}>
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
          if (newProduct) {
            await updateMutation.mutateAsync({
              ...values,
              id: newProduct.id
            })
          } else {
            await registerMutation.mutateAsync(values)
          }

          setOpen(false)
        }}
      />
    </Wrapper>
  )
}

export default ProductTable

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 22px;
`

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
`

const SubTitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #64748b;
`

const RegisterButton = styled.button`
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.25);

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 18px;
`

const InfoText = styled.div`
  font-size: 14px;
  color: #475569;

  strong {
    color: #2563eb;
    font-weight: 800;
  }
`

const GridWrapper = styled.div`
  width: 100%;
  height: 680px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

  .ag-root-wrapper {
    border: none;
  }

  .ag-header {
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }

  .ag-header-cell-label {
    font-weight: 700;
    color: #334155;
  }

  .ag-row {
    font-size: 14px;
  }

  .ag-row-hover {
    background: #f8fafc !important;
  }

  .ag-cell {
    display: flex;
    align-items: center;
  }
`

const ActionBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 100%;
`

const BaseActionButton = styled.button`
  border: none;
  padding: 7px 13px;
  border-radius: 9px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const UpdateButton = styled(BaseActionButton)`
  background: #10b981;

  &:hover {
    background: #059669;
  }
`

const DeleteButton = styled(BaseActionButton)`
  background: #ef4444;

  &:hover {
    background: #dc2626;
  }
`

const MessageBox = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
`

const MessageTitle = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
`

const MessageText = styled.div`
  font-size: 14px;
  color: #64748b;
`