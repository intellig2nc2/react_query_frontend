import React from 'react'
import styled from 'styled-components'
import { useGetSales } from '../../../no3_store/hooks/sales/useSales'
import { AgGridReact } from 'ag-grid-react'

const SalesTable = () => {
  const rowData = useGetSales()

  const columnDefs = [
    { field: 'id', headerName: '주문번호', flex: 1 },
    { field: 'user_name', headerName: '회원명', flex: 1 },
    { field: 'product_name', headerName: '상품명', flex: 1 },
    { field: 'quantity', headerName: '수량', flex: 1 },
    { field: 'discount_rate', headerName: '할인율', flex: 1 },
    { field: 'total_price', headerName: '결제금액', flex: 1 },
    { field: 'created_at', headerName: '주문일자', flex: 1 }
  ]

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  }

  return (
    <Container>
      <HeaderArea>
        <Title>주문 관리</Title>
        <SubText>회원별 상품 주문 내역을 확인할 수 있습니다.</SubText>
      </HeaderArea>

      <GridBox className="ag-theme-alpine">
        <AgGridReact
          theme="legacy"
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={25}
          rowHeight={48}
          headerHeight={50}
        />
      </GridBox>
    </Container>
  )
}

export default SalesTable

const Container = styled.div`
  width: 100%;
  background: #f3f4f6;
`

const HeaderArea = styled.div`
  margin-bottom: 20px;
   border-radius: 0 0 16px 16px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: #111827;
`

const SubText = styled.p`
  margin: 8px 0 0;
  
  font-size: 14px;
  color: #6b7280;
`

const GridBox = styled.div`
  width: 100%;
  height: 700px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;

  .ag-root-wrapper {
    border: none;
    border-radius: 16px;
  }

  .ag-header {
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }

  .ag-header-cell-label {
    justify-content: center;
    font-weight: 700;
    color: #374151;
  }

  .ag-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #374151;
  }

  .ag-row {
    border-bottom: 1px solid #f1f5f9;
  }

  .ag-row-hover {
    background: #f9fafb;
  }

  .ag-paging-panel {
    border-top: 1px solid #e5e7eb;
    background: #ffffff;
    padding: 12px;
  }
`